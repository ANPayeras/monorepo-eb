import { PreApproval, Payment } from "mercadopago";
import { fetchAction } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { MercadoPagoClient } from "@/lib/mercadopago-instance";
import { Id } from "../../../../convex/_generated/dataModel";

export async function POST(request: Request) {
  const xSignature = request.headers.get("x-signature")!;
  const xRequestId = request.headers.get("x-request-id")!;

  const body: { data: { id: string }; type: string; action: string } =
    await request.json();

  const validation = await fetchAction(api.payment.validateRequestSuscription, {
    headers: { xSignature, xRequestId },
    body,
  });

  if (!validation) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { action, data, type } = body;
  console.log("1-body", body);

  // Pueden llegar sin external_reference_id, en ese caso deberiamos persisitir el payer_id y buscar por ese dato
  // En los casos que no llegue nada, armar un cron y validar las suscripciones activas con las suscripciones que tenga el plan,
  // para detectar aquellos usuarios que no estan activados
  if (type === "subscription_preapproval") {
    const preapproval = await new PreApproval(MercadoPagoClient).get({
      id: data.id,
    });

    switch (action) {
      case "created":
        // Creamos la suscripcion en la tabla
        // Cancelamos periodo de prueba si lo hay
        await fetchAction(api.payment.createSuscriptionDB, {
          subscriptionPreapprovalId: data.id,
          reference: preapproval.external_reference as Id<"users">,
        });
        break;
      case "updated":
        // Si status === 'canceled' cancelar suscripcion
        if (preapproval.status === "cancelled") {
          await fetchAction(api.payment.cancellSuscriptionDB, {
            subscriptionPreapprovalId: data.id,
          });
        }
        // Si status === 'paused' que hacemos?
        break;
      default:
        break;
    }
  }

  // if (type === "payment" && action === "payment.created") {
  //   // Al llegar el pago se le termina el perido de prueba
  //   // Habria que mandar la factura
  //   const payment = await new Payment(MercadoPagoClient).get({
  //     id: data.id,
  //   });

  //   // console.log("2-payment", payment);
  //   if (payment?.metadata?.preapproval_id) {
  //     const preapproval = await new PreApproval(MercadoPagoClient).get({
  //       id: payment.metadata.preapproval_id,
  //     });

  //     console.log("3-preapproval", preapproval);

  //     if (payment?.external_reference === preapproval?.external_reference) {
  //       // await fetchMutation(api.users.updateUser, { isPremium: true });
  //     }
  //   }
  // }

  return Response.json(null, { status: 200 });
}
