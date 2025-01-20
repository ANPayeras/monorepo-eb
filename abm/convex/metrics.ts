import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

export const getMetrics = action({
  args: {
    query: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const template = await ctx.runQuery(
      internal.templates.getActiveTemplateByClerkId,
      { clerkId: args.clerkId }
    );

    if (!template.length) {
      throw new ConvexError("Template not found");
    }

    const id = template[0]._id as string;

    const url = `https://us.posthog.com/api/projects/${process.env.POSTHOG_ID}/query/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.POSTHOG_API_KEY}`,
    };

    const payload = {
      query: {
        kind: "HogQLQuery",
        query: args.query.replace("templateID", id),
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data.results;
  },
});
