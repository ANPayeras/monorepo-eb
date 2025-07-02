import { v } from "convex/values";
import { query } from "./_generated/server";

export const getTemplateView = query({
  args: {
    user: v.string(),
    test: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userDecoded = decodeURIComponent(args.user);
    const username = userDecoded.split("@")[0];

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), username))
      .first();

    let template = [];

    if (args.test) {
      template = await ctx.db
        .query("templates")
        .filter((q) =>
          q.and(q.eq(q.field("user"), user?._id), q.field("test"), true)
        )
        .collect();
    } else {
      template = await ctx.db
        .query("templates")
        .filter((q) =>
          q.and(
            q.eq(q.field("user"), user?._id),
            q.eq(q.field("name"), userDecoded),
            q.eq(q.field("active"), true)
          )
        )
        .collect();
    }

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
