import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`focus-ring min-h-32 w-full rounded-[var(--radius-md)] border border-border bg-white/5 px-4 py-3 text-body text-foreground placeholder:text-muted-foreground ${className}`}
      {...props}
    />
  );
}
