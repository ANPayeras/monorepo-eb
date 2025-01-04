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
      // Select sessions an pagesviwes per session by desktop
      //       'SELECT distinct sessions.session_id, count() as s_count
      // FROM events
      // JOIN sessions ON sessions.session_id = events.$session_id
      // WHERE events.event = '$pageview'
      //   AND events.distinct_id = 'j57b89e98na61nm6jchkp1wct174kg83'
      //   AND events.properties.$device_type = 'Desktop'
      //   GROUP BY sessions.session_id'

      // Select sessions only by desktop
      //       SELECT distinct sessions.session_id
      // FROM events
      // JOIN sessions ON sessions.session_id = events.$session_id
      // WHERE events.event = '$pageview'
      //   AND events.distinct_id = 'j57b89e98na61nm6jchkp1wct174kg83'
      //   AND events.properties.$device_type = 'Desktop'
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // console.log('data', data)

    return data.results;
  },
});
