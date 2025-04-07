import { MP_ACCESS_TOKEN } from "@/constants/envs";
import MercadoPagoConfig from "mercadopago";

export const MercadoPagoClient = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN!,
});
