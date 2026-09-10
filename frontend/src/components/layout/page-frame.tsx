import type { ReactNode } from "react";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { FooterSection } from "@/components/sections/footer-section";

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="background-shell" />
      <SiteNavigation />
      <div className="relative z-10">{children}</div>
      <FooterSection />
    </main>
  );
}
