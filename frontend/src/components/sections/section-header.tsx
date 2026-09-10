import type { ReactNode } from "react";
import { Divider } from "@/components/ui/divider";

type SectionHeaderProps = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: SectionHeaderProps) {
  const textAlign =
    align === "center" ? "text-center items-center" : "text-left";
  const dividerAlign = align === "center" ? "mx-auto" : "";

  return (
    <div className={`space-y-6 ${textAlign}`}>
      <div className="flex w-full items-center gap-4">
        <span className="text-tech text-muted-foreground">{number}</span>
        <Divider className={`flex-1 ${dividerAlign}`} />
        <span className="text-tech text-primary">{eyebrow}</span>
      </div>
      <div className="max-w-3xl space-y-4">
        <h2 className="text-h2 text-foreground">{title}</h2>
        <p className="text-body-lg text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
