import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "default" | "accent" | "success" | "warning";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  default: "border-border bg-white/5 text-muted-foreground",
  accent: "border-primary/30 bg-primary/10 text-primary",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
};

export function Badge({
  tone = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`text-tech inline-flex items-center rounded-[var(--radius-pill)] border px-3 py-1 ${toneClasses[tone]} ${className}`}
      {...props}
    />
  );
}
