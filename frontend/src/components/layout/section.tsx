import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Section({ className = "", ...props }: SectionProps) {
  return <section className={className} {...props} />;
}
