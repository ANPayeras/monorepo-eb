import { v } from "convex/values";
import { query } from "./_generated/server";

export const getTemplateView = query({
  args: {
    user: v.string(),
    test: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.user))
      .first();

    const template = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user?._id),
          q.field(args.test ? "test" : "active"),
          true
        )
      )
      .collect();

    return { template, user };
  },
});

export const getUser = query({
  args: {
    user: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.user))
      .collect();
  },
});
