import type { HTMLAttributes, ReactNode } from "react";

type SurfaceVariant = "default" | "elevated" | "outline";

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: SurfaceVariant;
};

const variantClasses: Record<SurfaceVariant, string> = {
  default: "surface",
  elevated: "surface-elevated",
  outline: "surface-outline",
};

export function Surface({
  variant = "default",
  className = "",
  ...props
}: SurfaceProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props} />
  );
}
