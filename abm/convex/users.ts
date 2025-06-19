import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
    username: v.string(),
    isPremiun: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      name: args.name,
      username: args.username,
      phone: "",
      isPremium: args.isPremiun,
    });
  },
});

export const deleteUser = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    await ctx.db.delete(user?._id!);
  },
});

export const updateInternalUser = internalMutation({
  args: {
    clerkId: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      username: args.username,
    });
  },
});

export const updateUser = mutation({
  args: {
    phone: v.optional(v.string()),
    isPremium: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      ...args,
    });
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const getCurrentUserByClerkId = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const updateUserWh = internalMutation({
  args: {
    isPremium: v.boolean(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      isPremium: args.isPremium,
    });
  },
});

export const checkIsUserPremium = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    return !!user?.isPremium;
  },
});

export const checkFreeTrial = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    let status = "";

    if (typeof user?.freeTrial === "undefined") status = "never";
    else {
      status = String(user.freeTrial.active);
    }

    return status;
  },
});

export const updateFreeTrial = mutation({
  args: {
    active: v.boolean(),
    endDate: v.string(),
    startDate: v.string(),
  },
  handler: async (ctx, args) => {
    const { active, endDate, startDate } = args;
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    const scheduleId: Id<"_scheduled_functions"> = await ctx.scheduler.runAt(
      new Date(endDate),
      internal.users.checkHasFreeTrial,
      {
        reference: user!._id,
        isPremium: false,
      }
    );

    return await ctx.db.patch(user?._id!, {
      isPremium: true,
      freeTrial: {
        active,
        endDate,
        startDate,
        scheduleId,
      },
    });
  },
});

export const checkHasFreeTrial = internalMutation({
  args: {
    reference: v.id("users"),
    isPremium: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.reference))
      .first();

    if (!!user?.freeTrial?.active) {
      if (user.freeTrial.scheduleId) {
        await ctx.scheduler.cancel(
          user.freeTrial.scheduleId as Id<"_scheduled_functions">
        );
      }
      await ctx.db.patch(user._id, {
        isPremium: args.isPremium,
        freeTrial: {
          active: false,
          endDate: user.freeTrial.endDate,
          startDate: user.freeTrial.startDate,
          scheduleId: "",
        },
      });
    }

    return user;
  },
});

// Borrar
export const createUsertest = internalMutation({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: "args.clerkId",
      email: "args.email",
      imageUrl: "args.imageUrl",
      name: "args.name",
      username: args.username,
      phone: "",
    });
  },
});
