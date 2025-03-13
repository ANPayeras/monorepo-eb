import { Vexor } from "vexor";

const PUBLIC_VEXOR_PROJECT = "67d1d56e17b7eba7f36192c6";
const PUBLIC_VEXOR_PUBLISHABLE_KEY =
  "vx_prod_pk_06fc806f0ab1d6cf020d6881f637ee23_87b79365_4681_4329_b359_248a8f07a37a_0dca8d";
const VEXOR_SECRET_KEY =
  "vx_prod_sk_a40336ec0acd3937cb33a07f4bdc19c1_917901df_fc34_4f1c_87d2_4d47ec86d42d_c3bf21";

export const vexor = new Vexor({
  // publishableKey: process.env.PUBLIC_VEXOR_PUBLISHABLE_KEY,
  // projectId: process.env.PUBLIC_VEXOR_PROJECT,
  // secretKey: process.env.VEXOR_SECRET_KEY,
  publishableKey: PUBLIC_VEXOR_PUBLISHABLE_KEY,
  projectId: PUBLIC_VEXOR_PROJECT,
  secretKey: VEXOR_SECRET_KEY,
});

// export const vexor = Vexor.fromEnv()


