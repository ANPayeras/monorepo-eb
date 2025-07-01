import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCallback, useEffect, useState } from "react";

const limits = [
  {
    name: "templates",
    free: 3,
    premium: 10,
  },
  {
    name: "categories",
    free: 5,
    premium: 15,
  },
  {
    name: "items",
    free: 10,
    premium: 20,
  },
  {
    name: "widgets",
    free: 10,
    premium: 20,
  },
];

const useCheckPremium = (feature?: string, enabled: boolean = true) => {
  const isPremium = useQuery(
    api.users.checkIsUserPremium,
    enabled ? undefined : "skip"
  );
  const [limit, setLimit] = useState<number>(0);

  const checkFeatureLimit = (feature: string, quantity: number) => {
    const _feature = limits.find((l) => l.name === feature);
    if (_feature) {
      let reachedLimit;
      if (isPremium) {
        reachedLimit = quantity >= _feature.premium;
      } else {
        reachedLimit = quantity >= _feature.free;
      }
      return reachedLimit;
    } else return true;
  };

  const getFeatureLimits = useCallback(
    (feature: string) => {
      const _feature = limits.find((l) => l.name === feature);
      let limit;
      if (isPremium) limit = _feature?.premium;
      else limit = _feature?.free;

      return limit;
    },
    [isPremium]
  );

  useEffect(() => {
    if (feature) {
      const limit = getFeatureLimits(feature);
      if (limit) setLimit(limit);
    }
  }, [feature, isPremium, getFeatureLimits]);

  return {
    isloading: isPremium === undefined,
    isPremium,
    limit,
    checkFeatureLimit,
    getFeatureLimits,
  };
};

export default useCheckPremium;
