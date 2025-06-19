"use node";

import { Payment, PreApproval, PreApprovalPlan } from "mercadopago";
import { action, internalAction } from "./_generated/server";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";
import { v } from "convex/values";
import * as crypto from "crypto";
import { internal } from "./_generated/api";
import { MercadoPagoClient } from "@/lib/mercadopago-instance";
import { MP_WEBHOOK_SECRET } from "@/constants/envs";

export interface PreApprovalPlansItem extends PreApprovalPlanResponse {
  external_reference?: string;
  description?: string;
}

export type PreApprovalPlans = {
  type: string;
  discount?: number;
  plans: {
    anualPlan?: PreApprovalPlansItem;
    monthlyPlan?: PreApprovalPlansItem;
  };
};

export const getPlans = action({
  args: {},
  handler: async () => {
    const preapproval = await new PreApprovalPlan(MercadoPagoClient).search({
      options: { status: "active" },
    });

    const arr: PreApprovalPlans[] = [];

    console.log(preapproval.results);
    preapproval.results?.forEach((p: PreApprovalPlansItem) => {
      let obj: PreApprovalPlans = { type: "", plans: {} };
      if (p.external_reference?.includes("3")) {
        obj.type = "3 meses";
        obj.discount = 5;
        const exist = arr.findIndex((_p) => _p.type.includes("3"));
        const isUnique = p.external_reference.includes("unique");
        if (isUnique) {
          obj.plans.anualPlan = {
            ...p,
            description: `Se debitará un pago unico de ${p.auto_recurring?.transaction_amount} meses.`,
          };
        } else {
          obj.plans.monthlyPlan = {
            ...p,
            description: `Se debitarán ${p.auto_recurring?.transaction_amount} todos los meses, durante ${p.auto_recurring?.repetitions} meses.`,
          };
        }
        if (exist >= 0) {
          arr[exist] = {
            ...arr[exist],
            plans: {
              ...arr[exist].plans,
              ...obj.plans,
            },
          };
        } else {
          arr.push(obj);
        }
      }
      if (p.external_reference?.includes("6")) {
        obj.type = "6 meses";
        obj.discount = 10;
        const exist = arr.findIndex((_p) => _p.type.includes("6"));
        const isUnique = p.external_reference.includes("unique");
        if (isUnique) {
          obj.plans.anualPlan = {
            ...p,
            description: `Se debitará un pago unico de ${p.auto_recurring?.transaction_amount}.`,
          };
        } else {
          obj.plans.monthlyPlan = {
            ...p,
            description: `Se debitarán ${p.auto_recurring?.transaction_amount} todos los meses, durante ${p.auto_recurring?.repetitions} meses.`,
          };
        }
        if (exist >= 0) {
          arr[exist] = {
            ...arr[exist],
            plans: {
              ...arr[exist].plans,
              ...obj.plans,
            },
          };
        } else {
          arr.push(obj);
        }
      }
      if (p.external_reference?.includes("12")) {
        obj.type = "12 meses";
        obj.discount = 15;
        const exist = arr.findIndex((_p) => _p.type.includes("12"));
        const isUnique = p.external_reference.includes("unique");
        if (isUnique) {
          obj.plans.anualPlan = {
            ...p,
            description: `Se debitará un pago unico de ${p.auto_recurring?.transaction_amount}.`,
          };
        } else {
          obj.plans.monthlyPlan = {
            ...p,
            description: `Se debitarán ${p.auto_recurring?.transaction_amount} todos los meses, durante ${p.auto_recurring?.repetitions}.`,
          };
        }
        if (exist >= 0) {
          arr[exist] = {
            ...arr[exist],
            plans: {
              ...arr[exist].plans,
              ...obj.plans,
            },
          };
        } else {
          arr.push(obj);
        }
      }
    });

    return arr;
  },
});

export const createSuscription = action({
  args: {
    token: v.string(),
    preapproval_plan_id: v.string(),
    email: v.string(),
    userId: v.id("users"),
  },
  handler: async (_ctx, args) => {
    // Creamos suscripcion con el card_token_id y el preapproval_plan_id
    const suscription = await new PreApproval(MercadoPagoClient).create({
      body: {
        preapproval_plan_id: args.preapproval_plan_id,
        card_token_id: args.token,
        payer_email: args.email,
        status: "authorized",
        external_reference: args.userId,
      },
    });

    return suscription;
  },
});

export const validateRequestSuscription = action({
  args: {
    headers: v.object({ xSignature: v.string(), xRequestId: v.string() }),
    body: v.any(),
  },
  handler: async (_ctx, args) => {
    const {
      body,
      headers: { xRequestId, xSignature },
    } = args;

    const parts = xSignature?.split(",");

    let ts;
    let hash;

    parts?.forEach((part) => {
      const [key, value] = part.split("=");
      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === "ts") {
          ts = trimmedValue;
        } else if (trimmedKey === "v1") {
          hash = trimmedValue;
        }
      }
    });

    const manifest = `id:${body.data.id};request-id:${xRequestId};ts:${ts};`;

    const hmac = crypto.createHmac("sha256", MP_WEBHOOK_SECRET!);
    hmac.update(manifest);

    const sha = hmac.digest("hex");

    return sha === hash;
  },
});

// export const validateRequestSuscription = internalAction({
//   args: {
//     headers: v.object({ xSignature: v.string(), xRequestId: v.string() }),
//     body: v.any(),
//   },
//   handler: async (_ctx, args) => {
//     const {
//       body,
//       headers: { xRequestId, xSignature },
//     } = args;

//     const parts = xSignature?.split(",");

//     let ts;
//     let hash;

//     parts?.forEach((part) => {
//       const [key, value] = part.split("=");
//       if (key && value) {
//         const trimmedKey = key.trim();
//         const trimmedValue = value.trim();
//         if (trimmedKey === "ts") {
//           ts = trimmedValue;
//         } else if (trimmedKey === "v1") {
//           hash = trimmedValue;
//         }
//       }
//     });

//     const secret =
//       "bc3abda7e7c4bac303202b362f32d951dde1a9a7a99975044909e1b0053a6664";

//     const manifest = `id:${body.data.id};request-id:${xRequestId};ts:${ts};`;

//     const hmac = crypto.createHmac("sha256", secret);
//     hmac.update(manifest);

//     const sha = hmac.digest("hex");

//     return sha === hash;
//   },
// });

export const getSuscriptionMP = action({
  args: {
    id: v.string(),
  },
  handler: async (_ctx, args) => {
    const preapproval = await new PreApproval(MercadoPagoClient).get({
      id: args.id,
    });
    return preapproval;
  },
});

export const getPayment = internalAction({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const payment = await new Payment(MercadoPagoClient).get({
      id: args.id,
    });
    return payment;
  },
});

export const updatePlan = action({
  args: {
    id: v.string(),
    userId: v.id("users"),
  },
  handler: async (_ctx, args) => {
    const preApprovalPlan = await new PreApprovalPlan(MercadoPagoClient).get({
      preApprovalPlanId: args.id,
    });

    const backUrl = new URL(preApprovalPlan.back_url!);
    const backUrlParams = new URLSearchParams(backUrl.search);
    const ids = backUrlParams.getAll("ids");

    let newBackUrl = preApprovalPlan.back_url;
    if (!ids.length) {
      newBackUrl += `?ids=${args.userId}`;
    } else {
      const existId = ids.find((id) => id === args.userId);
      if (existId) return preApprovalPlan;
      newBackUrl += `&=${args.userId}`;
    }

    const preApprovalPlanUpdated = await new PreApprovalPlan(
      MercadoPagoClient
    ).update({
      id: args.id,
      updatePreApprovalPlanRequest: {
        back_url: newBackUrl,
      },
    });

    return preApprovalPlanUpdated;
  },
});

export const createSuscriptionDB = action({
  args: {
    subscriptionPreapprovalId: v.string(),
    reference: v.id("users"),
  },
  handler: async (ctx, args) => {
    const suscription = await new PreApproval(MercadoPagoClient).get({
      id: args.subscriptionPreapprovalId,
    });

    // Cancelamos periodo de prueba
    await ctx.runMutation(internal.users.checkHasFreeTrial, {
      reference: args.reference,
      isPremium: true,
    });

    // Guardamos la suscripcion en la tabla
    await ctx.runMutation(internal.suscriptions.insertSuscription, {
      suscription,
    });

    return suscription;
  },
});

export const updateSuscriptionDB = action({
  args: {
    subscriptionPreapprovalId: v.string(),
    data: v.optional(
      v.object({
        user: v.optional(v.id("users")),
        status: v.optional(v.string()),
        adminUrl: v.optional(v.string()),
        payerId: v.optional(v.number()),
        subscriptionPreapprovalPlanId: v.optional(v.string()),
        subscriptionPreapprovalId: v.optional(v.string()),
        subscriptionAuthorizedPaymentId: v.optional(v.string()),
        paymentId: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const suscription = await new PreApproval(MercadoPagoClient).get({
      id: args.subscriptionPreapprovalId,
    });

    // Modificamos la suscripcion en la tabla
    await ctx.runMutation(internal.suscriptions.updateSuscription, {
      suscription,
      data: args.data,
    });

    return suscription;
  },
});

export const cancellSuscriptionDB = action({
  args: {
    subscriptionPreapprovalId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.suscriptions.cancellSuscription, {
      subscriptionPreapprovalId: args.subscriptionPreapprovalId,
    });

    return "";
  },
});

// export const cronCheckSuscriptions = action({
//   handler: async (ctx) => {
//     const suscriptionsAnual = await new PreApproval(MercadoPagoClient).search({
//       options: {
//         preapproval_plan_id: "2c93808495ce12870195d2c73fda02d2",
//         limit: 100,
//       },
//     });

//     const suscriptionsMonthly = await new PreApproval(MercadoPagoClient).search(
//       {
//         options: {
//           preapproval_plan_id: "2c93808495b859210195d2c854a10ea1",
//           limit: 100,
//         },
//       }
//     );

//     const suscriptionsAnualDB = await ctx.runQuery(
//       api.suscriptions.getAllSuscriptionsByPlan,
//       {
//         planID: "2c93808495ce12870195d2c73fda02d2",
//       }
//     );
//     const suscriptionsMonthlyDB = await ctx.runQuery(
//       api.suscriptions.getAllSuscriptionsByPlan,
//       {
//         planID: "2c93808495b859210195d2c854a10ea1",
//       }
//     );

//     if (suscriptionsAnual.paging?.total !== suscriptionsAnualDB.length) {
//       console.log("las anuales no coinciden");
//       const { results } = suscriptionsAnual;
//       // 1- Chequeamos por Payer ID, en caso de que haya pagado con el mismo email
//       const promises = suscriptionsAnualDB.map((s) => {
//         const filter = results!.filter(
//           (w) => w.payer_id === s.payerId && !w.external_reference
//         );

//         if (filter[0]) {
//           const { status } = filter[0];
//           // Si esta authorized le habilitamos el premium
//           // Si esta cancelled le deshabilitamos el premium
//           // Retornar la promesa
//         }
//       });

//       // Si existen promises resolverlas

//       // Si no existe puede que haya pagado con otro email, habilitar de forma manual
//     }

//     // if (suscriptionsMonthly.paging?.total !== suscriptionsMonthlyDB.length) {
//     //   console.log("las mensuales no coinciden");
//     // }
//     // console.log("suscriptionsAnual", suscriptionsAnualDB);
//     // console.log("suscriptionsMonthly", suscriptionsMonthlyDB);

//     return "";
//   },
// });
