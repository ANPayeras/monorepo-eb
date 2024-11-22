"use node";
import MercadoPagoConfig, {
  Payment,
  PreApproval,
  PreApprovalPlan,
} from "mercadopago";
import { action, internalAction } from "./_generated/server";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";
import { v } from "convex/values";
import * as crypto from "crypto";

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

export const mercadopago = new MercadoPagoConfig({
  accessToken:
    "APP_USR-3561778190366939-112011-7c0672e062f1b2af519620b697bbc0f1-2106748988", // Pordcutivas usuario de prueba vendedor
});

export const getPlans = action({
  args: {},
  handler: async () => {
    const preapproval = await new PreApprovalPlan(mercadopago).search();

    const arr: PreApprovalPlans[] = [];

    // console.log(preapproval.results);
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
  handler: async (ctx, args) => {
    // Creamos suscripcion con el card_token_id y el preapproval_plan_id
    const suscription = await new PreApproval(mercadopago).create({
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

export const validateRequestSuscription = internalAction({
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

    const secret =
      "bc3abda7e7c4bac303202b362f32d951dde1a9a7a99975044909e1b0053a6664";

    const manifest = `id:${body.data.id};request-id:${xRequestId};ts:${ts};`;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(manifest);

    const sha = hmac.digest("hex");

    return sha === hash;
  },
});

export const getSuscription = internalAction({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const preapproval = await new PreApproval(mercadopago).get({
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
    const payment = await new Payment(mercadopago).get({
      id: args.id,
    });
    return payment;
  },
});
