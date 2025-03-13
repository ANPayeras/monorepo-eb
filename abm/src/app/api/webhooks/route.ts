import MercadoPagoConfig, { PreApproval, Payment } from "mercadopago";
import { fetchQuery, fetchMutation, fetchAction } from "convex/nextjs";
import { api, internal } from "../../../../convex/_generated/api";

// export const mercadopago = new MercadoPagoConfig({
//   accessToken:
//     "APP_USR-3561778190366939-112011-7c0672e062f1b2af519620b697bbc0f1-2106748988",
// });

// export async function POST(request: Request) {
//   const body: { data: { id: string }; type: string; action: string } =
//     await request.json();

//   // const validation = await validateRequestSuscription(request);

//   // if (!validation) {
//   //   return new Response("Unauthorized", { status: 400 });
//   // }

//   console.log(body);

//   // if (body.type === "payment" && body.action === "payment.created") {
//   //   const payment = await new Payment(mercadopago).get({
//   //     id: body.data.id,
//   //   });

//   //   if (payment?.metadata?.preapproval_id) {
//   //     const preapproval = await new PreApproval(mercadopago).get({
//   //       id: payment.metadata.preapproval_id,
//   //     });

//   //     if (payment?.external_reference === preapproval?.external_reference) {
//   //       await fetchMutation(api.users.updateUser, { isPremium: true });
//   //     }
//   //   }
//   // }

//   if (body.type === "subscription_preapproval" && body.action === "updated") {
//     // Cancelaciones
//     const preapproval = await new PreApproval(mercadopago).get({
//       id: body.data.id,
//     });

//     if (preapproval.status === "cancelled") {
//       await fetchMutation(api.users.updateUser, { isPremium: false });
//     }
//   }

//   return new Response(null, { status: 200 });
// }

import { vexor } from "@/lib/vexor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = await vexor.webhook(req);

  //NOTE: You can add any logic you want here, for example, you can update your database with the subscription status, send a notification to the user, etc.
  // In our example, we will just log the response to the console for simplicity.
    console.log("Webhook received", response);

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
