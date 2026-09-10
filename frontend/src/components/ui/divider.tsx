import type { HTMLAttributes } from "react";

type DividerProps = HTMLAttributes<HTMLHRElement>;

export function Divider({ className = "", ...props }: DividerProps) {
  return <hr className={`border-border/70 ${className}`} {...props} />;
}
