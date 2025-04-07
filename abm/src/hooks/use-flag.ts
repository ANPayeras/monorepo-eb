import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FlagsKeys } from "@/interfaces";

const useFlag = (key: FlagsKeys) => {
  const flags = useQuery(api.flags.getFlags);
  const flag = flags?.find((f) => f.key === key);
  return !!flag?.active;
};

export default useFlag;
