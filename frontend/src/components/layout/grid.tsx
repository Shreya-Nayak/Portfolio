import type { HTMLAttributes, ReactNode } from "react";

type ColumnCount = 1 | 2 | 3 | 4;

type GridProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  base?: ColumnCount;
  md?: ColumnCount;
  lg?: ColumnCount;
  xl?: ColumnCount;
  gap?: "sm" | "md" | "lg" | "xl";
};

const gapClasses: Record<NonNullable<GridProps["gap"]>, string> = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const columnClasses: Record<ColumnCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const responsiveColumnClasses = (prefix: string, count?: ColumnCount) =>
  count ? `${prefix}:${columnClasses[count]}` : "";

export function Grid({
  base = 1,
  md,
  lg,
  xl,
  gap = "md",
  className = "",
  ...props
}: GridProps) {
  return (
    <div
      className={`grid ${columnClasses[base]} ${responsiveColumnClasses("md", md)} ${responsiveColumnClasses("lg", lg)} ${responsiveColumnClasses("xl", xl)} ${gapClasses[gap]} ${className}`}
      {...props}
    />
  );
}
