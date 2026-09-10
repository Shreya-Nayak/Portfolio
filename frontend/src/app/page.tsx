import { SiteNavigation } from "@/components/navigation/site-navigation";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JourneySection } from "@/components/sections/journey-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="background-shell" />
      <SiteNavigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
