import { RESEND_WEBHOOK_SECRET } from "@/constants/envs";
import { ResendClient } from "@/lib/resend-instance";
import { Webhook } from "svix";

export interface WebhookEvent {
  created_at: string;
  data: {
    created_at: string;
    email_id: string;
    from: string;
    subject: string;
    to: string[];
  };
  type: EmailType;
}

export type EmailType =
  | "email.sent"
  | "email.delivered"
  | "email.delivery_delayed"
  | "email.complained"
  | "email.bounced"
  | "email.opened"
  | "email.clicked";

export async function POST(req: Request) {
  const { headers } = req;

  try {
    const payloadString = await req.text();

    const svixHeaders = {
      "svix-id": headers.get("svix-id")!,
      "svix-timestamp": headers.get("svix-timestamp")!,
      "svix-signature": headers.get("svix-signature")!,
    };

    const wh = new Webhook(RESEND_WEBHOOK_SECRET!);
    const event = wh.verify(payloadString, svixHeaders) as WebhookEvent;

    switch (event.type) {
      case "email.bounced":
      case "email.complained":
        const audienceId = "e5686b37-0eb7-49e7-941d-b00358de0309";
        const contact = await ResendClient.contacts.get({
          email: event.data.to[0],
          audienceId,
        });

        if (contact.data) {
          await ResendClient.contacts.update({
            email: contact.data?.email,
            audienceId,
            unsubscribed: true,
          });
        }
        break;
    }

    return Response.json(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(null, { status: 400 });
  }
}
