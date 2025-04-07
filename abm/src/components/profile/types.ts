import { PreApprovalResponse } from "mercadopago/dist/clients/preApproval/commonTypes";
import { Doc, Id } from "../../../convex/_generated/dataModel";

export type SuscriptionPlansHeaderProps = {
  isAnual: boolean;
  setIsAnual: (data: boolean) => void;
  isFreeTrialActive?: boolean;
  activeSucription?: Doc<"suscriptions"> | null;
  suscription?: PreApprovalResponse;
};

export type SuscriptionPlansBodyProps = {
  plans: Doc<"plans">[];
  setSelectedPlan: (data: Doc<"plans">) => void;
  selectedPlan?: Doc<"plans">;
  isAnual: boolean;
  hasFreeTrial?: boolean;
};
