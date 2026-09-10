import { Container } from "@/components/layout/container";
import { PageFrame } from "@/components/layout/page-frame";
import { AboutSection } from "@/components/sections/about-section";
import { JourneySection } from "@/components/sections/journey-section";

export default function AboutPage() {
  return (
    <PageFrame>
      <div className="border-b border-border/60 py-16 sm:py-24">
        <Container>
          <p className="text-tech text-primary">About / 01</p>
          <h1 className="mt-5 max-w-4xl text-h1">
            A broader technology foundation, built one direction change at a
            time.
          </h1>
        </Container>
      </div>
      <AboutSection />
      <JourneySection />
    </PageFrame>
  );
}
