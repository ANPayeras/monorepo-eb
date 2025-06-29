"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `
              relative w-full h-full overflow-hidden
              [--aurora-gradient:repeating-linear-gradient(110deg,#ffffff_0%,#ffffff_1%,transparent_3%,#93c5fd_5%,#93c5fd_6%,_transparent_8%,var(--slate-700)_10%,var(--slate-900)_11%,transparent_13%)]
              bg-[image:var(--aurora-gradient)]
              bg-[length:200%_100%]
              animate-aurora
              blur-[10px] opacity-60 pointer-events-none
              `,
              showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_0%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};

