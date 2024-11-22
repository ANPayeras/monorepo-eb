import type { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response("Invalid request", { status: 400 });
  }
  switch (event.type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
        imageUrl: event.data.image_url,
        name: event.data.first_name || "",
        username: event.data.username || `user${event.data.id}`,
        isPremiun: false,
      });
      break;
    case "user.updated":
      await ctx.runMutation(internal.users.updateInternalUser, {
        clerkId: event.data.id,
        username: event.data.username || "",
      });
      break;
    case "user.deleted":
      await ctx.runMutation(internal.users.deleteUser, {
        clerkId: event.data.id as string,
      });
      break;
  }
  return new Response(null, {
    status: 200,
  });
});

const handleSuscriptionWebhook = httpAction(async (ctx, request) => {
  const xSignature = request.headers.get("x-signature")!;
  const xRequestId = request.headers.get("x-request-id")!;
  const body: { data: { id: string }; type: string; action: string } =
    await request.json();
  const validation = await ctx.runAction(
    internal.payment.validateRequestSuscription,
    {
      headers: { xSignature, xRequestId },
      body,
    }
  );

  if (!validation) {
    return new Response("Unauthorized", { status: 400 });
  }

  await ctx.runMutation(internal.users.createUsertest, {
    username: JSON.stringify(body),
  });

  if (body.type === "payment" && body.action === "payment.created") {
    const payment = await ctx.runAction(internal.payment.getPayment, {
      id: body.data.id,
    });

    if (payment?.metadata?.preapproval_id) {
      const preapproval = await ctx.runAction(internal.payment.getSuscription, {
        id: payment.metadata.preapproval_id,
      });

      if (payment?.external_reference === preapproval?.external_reference) {
        await ctx.runMutation(internal.users.updateUserWh, {
          isPremium: false,
          userId: preapproval.external_reference!,
        });
      }
    }
  }

  if (body.type === "subscription_preapproval" && body.action === "updated") {
    // Cancelaciones
    const preapproval = await ctx.runAction(internal.payment.getSuscription, {
      id: body.data.id,
    });

    if (preapproval.status === "cancelled") {
      await ctx.runMutation(internal.users.updateUserWh, {
        isPremium: false,
        userId: preapproval.external_reference!,
      });
    }
  }

  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

http.route({
  path: "/suscription",
  method: "POST",
  handler: handleSuscriptionWebhook,
});

const validateRequest = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }
  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  const event = wh.verify(payloadString, svixHeaders);
  return event as unknown as WebhookEvent;
};

export default http;
