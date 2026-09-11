import type { ReactNode } from "react";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { FooterSection } from "@/components/sections/footer-section";
import { GsapPageEffects } from "@/components/motion/gsap-page-effects";

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div data-scroll-progress className="scroll-progress" />
      <div aria-hidden="true" className="background-shell" />
      <SiteNavigation />
      <div className="relative z-10" data-page-content>{children}</div>
      <FooterSection />
      <GsapPageEffects />
    </main>
  );
}
