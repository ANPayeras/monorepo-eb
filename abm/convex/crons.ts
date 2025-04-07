import { cronJobs } from "convex/server";
// import { internal } from "./_generated/api";

const crons = cronJobs();

// crons.interval(
//   "Update suscriptions",
//   { minutes: 1 },
//   internal.payment.cronCheckSuscriptions
// );

export default crons;
