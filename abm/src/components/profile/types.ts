import { Id } from "../../../convex/_generated/dataModel";

export type SelectedPlan = {
  _id: Id<"plans">;
  type: string;
  premium: boolean;
  title: string;
  description?: string;
  features: string[];
  monthly?: {
    price: string;
    id: string;
  };
  anual?: {
    price: string;
    id: string;
  };
};
