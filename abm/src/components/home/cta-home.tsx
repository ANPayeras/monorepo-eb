import React, { ReactNode } from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function HoverBorderGradientButton({ children }: { children: ReactNode }) {
  return (
    <HoverBorderGradient
      containerClassName="rounded-full text-sm md:text-base"
      as="button"
      className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
    >
      {children}
    </HoverBorderGradient>
  );
}