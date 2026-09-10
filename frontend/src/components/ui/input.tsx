import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`focus-ring h-11 w-full rounded-[var(--radius-md)] border border-border bg-white/5 px-4 text-body text-foreground placeholder:text-muted-foreground ${className}`}
      {...props}
    />
  );
}
