/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as crons from "../crons.js";
import type * as emails from "../emails.js";
import type * as files from "../files.js";
import type * as flags from "../flags.js";
import type * as http from "../http.js";
import type * as metrics from "../metrics.js";
import type * as payment from "../payment.js";
import type * as plans from "../plans.js";
import type * as suscriptions from "../suscriptions.js";
import type * as templates from "../templates.js";
import type * as users from "../users.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  crons: typeof crons;
  emails: typeof emails;
  files: typeof files;
  flags: typeof flags;
  http: typeof http;
  metrics: typeof metrics;
  payment: typeof payment;
  plans: typeof plans;
  suscriptions: typeof suscriptions;
  templates: typeof templates;
  users: typeof users;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
