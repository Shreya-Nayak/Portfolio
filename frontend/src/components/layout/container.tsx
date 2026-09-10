import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-width)] px-[var(--page-padding)] ${className}`}
      {...props}
    />
  );
}
