import { Container } from "@/components/layout/container";
import { PageFrame } from "@/components/layout/page-frame";
import { ExperienceSection } from "@/components/sections/experience-section";

export default function ExperiencePage() {
  return (
    <PageFrame>
      <div className="border-b border-border/60 py-16 sm:py-24">
        <Container>
          <p className="text-tech text-primary">Experience / 02</p>
          <h1 className="mt-5 max-w-4xl text-h1">The people, systems, and environments that shaped the work.</h1>
        </Container>
      </div>
      <ExperienceSection />
    </PageFrame>
  );
}