import { ConvexError } from "convex/values";
import { query } from "./_generated/server";

export const getPlansDB = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const plans = await ctx.db.query("plans").collect();

    return plans;
  },
});
