import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type LinkButtonSize = "sm" | "md" | "lg";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  children: ReactNode;
};

const variantClasses: Record<LinkButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border-transparent hover:bg-primary/90",
  secondary:
    "bg-secondary text-secondary-foreground border-border hover:bg-secondary/90",
  ghost:
    "bg-transparent text-foreground border-transparent hover:bg-white/5 hover:text-foreground",
  outline:
    "bg-transparent text-foreground border-border hover:border-primary/40 hover:bg-white/5",
};

const sizeClasses: Record<LinkButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border font-medium transition duration-200 ease-out ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
