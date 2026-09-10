import type { ButtonHTMLAttributes, ReactNode } from "react";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  label?: string;
  selected?: boolean;
};

export function Chip({
  children,
  label,
  selected = false,
  className = "",
  type = "button",
  ...props
}: ChipProps) {
  const content = children ?? label;

  return (
    <button
      type={type}
      aria-pressed={selected}
      className={`focus-ring inline-flex items-center rounded-[var(--radius-pill)] border px-3 py-1.5 text-sm transition duration-200 ease-out ${
        selected
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border bg-white/5 text-muted-foreground hover:border-primary/30 hover:bg-white/5 hover:text-foreground"
      } ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
