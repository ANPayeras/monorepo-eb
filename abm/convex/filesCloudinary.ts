"use node";

import {
  CLOUDINARY_CLOUD,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} from "@/constants/envs";
import { action } from "./_generated/server";
import { v2 } from "cloudinary";

export const getSignature = action({
  args: {},
  handler: async () => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = v2.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      CLOUDINARY_SECRET as string
    );

    return {
      timestamp,
      signature,
      cloud: CLOUDINARY_CLOUD,
      key: CLOUDINARY_KEY,
    };
  },
});
