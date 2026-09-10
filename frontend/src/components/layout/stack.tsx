import type { HTMLAttributes, ReactNode } from "react";

type Gap = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const gapClasses: Record<Gap, string> = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
};

type StackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  gap?: Gap;
};

export function Stack({ gap = "md", className = "", ...props }: StackProps) {
  return (
    <div
      className={`flex flex-col ${gapClasses[gap]} ${className}`}
      {...props}
    />
  );
}
