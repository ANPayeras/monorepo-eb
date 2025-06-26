import { RESEND_API_KEY } from "@/constants/envs";
import { action } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const sendEmail = action({
  args: {
    body: v.array(
      v.object({
        from: v.string(),
        to: v.string(),
        subject: v.string(),
        text: v.string(),
        html: v.string(),
        reply_to: v.string(),
      })
    ),
  },
  handler: async (_ctx, args) => {
    try {
      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args.body),
      });

      if (res.status !== 200) throw new ConvexError(await res.json());
    } catch (error) {
      console.log(error);
      throw new ConvexError(error as any);
    }
  },
});
