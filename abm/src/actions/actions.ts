"use server";

import { revalidatePath } from "next/cache";

export const revalidatePathAction = async (
  url: string,
  type?: "layout" | "page"
) => {
  revalidatePath(url, type);
};
