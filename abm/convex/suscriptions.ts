import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const getActiveSuscription = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    const suscription = await ctx.db
      .query("suscriptions")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user?._id!),
          q.eq(q.field("status"), "active")
        )
      )
      .first();

    return suscription;
  },
});

export const getPendingSuscription = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    const suscription = await ctx.db
      .query("suscriptions")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user?._id!),
          q.eq(q.field("status"), "pending")
        )
      )
      .first();

    return suscription;
  },
});

export const insertSuscription = internalMutation({
  args: {
    suscription: v.any(),
  },
  handler: async (ctx, args) => {
    const {
      subscription_id,
      external_reference,
      payer_id,
      preapproval_plan_id,
    } = args.suscription;

    let userId = external_reference;

    if (!external_reference) {
      const sus = await ctx.db
        .query("suscriptions")
        .filter((q) => q.eq(q.field("payerId"), payer_id))
        .first();

      userId = sus?.user;
    }

    const suscription = await ctx.db.insert("suscriptions", {
      user: userId,
      status: "pending",
      adminUrl: `https://www.mercadopago.com.ar/subscriptions/details/${subscription_id}`,
      payerId: payer_id,
      subscriptionPreapprovalId: subscription_id,
      subscriptionPreapprovalPlanId: preapproval_plan_id,
    });

    await ctx.db.patch(external_reference as Id<"users">, {
      suscriptionId: suscription,
    });

    return suscription;
  },
});

export const updateSuscription = internalMutation({
  args: {
    suscription: v.any(),
    data: v.optional(
      v.object({
        user: v.optional(v.id("users")),
        status: v.optional(v.string()),
        adminUrl: v.optional(v.string()),
        payerId: v.optional(v.number()),
        subscriptionPreapprovalPlanId: v.optional(v.string()),
        subscriptionPreapprovalId: v.optional(v.string()),
        subscriptionAuthorizedPaymentId: v.optional(v.string()),
        paymentId: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { subscription_id, external_reference, payer_id } = args.suscription;

    let userId = external_reference;

    if (!external_reference) {
      const sus = await ctx.db
        .query("suscriptions")
        .filter((q) => q.eq(q.field("payerId"), payer_id))
        .first();

      userId = sus?.user;
    }

    const suscription = await ctx.db
      .query("suscriptions")
      .filter((q) =>
        q.eq(q.field("subscriptionPreapprovalId"), subscription_id)
      )
      .first();

    await ctx.db.patch(suscription?._id!, {
      ...args.data,
    });

    if (args.data?.status === "active") {
      await ctx.db.patch(userId as Id<"users">, {
        isPremium: true,
      });
    }

    return suscription;
  },
});

export const cancellSuscription = internalMutation({
  args: {
    subscriptionPreapprovalId: v.string(),
  },
  handler: async (ctx, args) => {
    const sus = await ctx.db
      .query("suscriptions")
      .filter((q) =>
        q.eq(
          q.field("subscriptionPreapprovalId"),
          args.subscriptionPreapprovalId
        )
      )
      .first();

    if (sus) {
      await ctx.db.patch(sus._id, {
        status: "cancelled",
      });

      const user = await ctx.db.get(sus.user);

      if (user) {
        await ctx.db.patch(user._id, {
          isPremium: false,
          suscriptionId: undefined,
        });

        await ctx.runMutation(internal.suscriptions.removePremiumFeatures, {
          userId: user._id,
        });
      }
    }
  },
});

export const getAllSuscriptionsByPlan = query({
  args: {
    planID: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("suscriptions")
      .filter((q) =>
        q.eq(q.field("subscriptionPreapprovalPlanId"), args.planID)
      )
      .collect();
  },
});

// Review this
export const removePremiumFeatures = internalMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // disabled active templates
    const activeTemplates = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(q.eq(q.field("user"), args.userId), q.field("active"), true)
      )
      .collect();

    if (activeTemplates.length) {
      for (const template of activeTemplates) {
        await ctx.db.patch(template._id, {
          active: false,
        });
      }
    }
  },
});
