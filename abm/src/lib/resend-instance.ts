import { Resend } from "resend";
import { RESEND_API_KEY } from "@/constants/envs";

export const ResendClient = new Resend(RESEND_API_KEY);
