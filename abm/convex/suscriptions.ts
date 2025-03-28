import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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
      status: "active",
      adminUrl: `https://www.mercadopago.com.ar/subscriptions/details/${subscription_id}`,
      payerId: payer_id,
      subscriptionPreapprovalId: subscription_id,
      subscriptionPreapprovalPlanId: preapproval_plan_id,
    });

    await ctx.db.patch(external_reference as Id<"users">, {
      isPremium: true,
      suscriptionId: suscription,
    });

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

    await ctx.db.patch(sus?._id!, {
      status: "cancelled",
    });

    await ctx.db.patch(sus?.user!, {
      isPremium: false,
      suscriptionId: undefined,
    });

    return "";
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
