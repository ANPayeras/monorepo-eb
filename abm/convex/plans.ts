import { query } from "./_generated/server";

export const getPlansDB = query({
  handler: async (ctx) => {
    const plans = await ctx.db.query("plans").collect();

    return plans;
  },
});
