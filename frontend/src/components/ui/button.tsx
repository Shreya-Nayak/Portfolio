import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border-transparent hover:bg-primary/90",
  secondary:
    "bg-secondary text-secondary-foreground border-border hover:bg-secondary/90",
  ghost:
    "bg-transparent text-foreground border-transparent hover:bg-white/5 hover:text-foreground",
  outline:
    "bg-transparent text-foreground border-border hover:border-primary/40 hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-11 w-11 p-0",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border font-medium transition duration-200 ease-out ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}

type IconButtonProps = Omit<ButtonProps, "size" | "children"> & {
  label: string;
  children: ReactNode;
};

export function IconButton({ label, children, ...props }: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      size="icon"
      variant="outline"
      title={label}
      {...props}
    >
      {children}
    </Button>
  );
}
