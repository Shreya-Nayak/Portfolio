import { Container } from "@/components/layout/container";
import { PageFrame } from "@/components/layout/page-frame";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function WorkPage() {
  return (
    <PageFrame>
      <div className="border-b border-border/60 py-16 sm:py-24">
        <Container>
          <p className="text-tech text-primary">Work / 02</p>
          <h1 className="mt-5 max-w-4xl text-h1">
            Experience across web systems, AI automation, and infrastructure
            learning.
          </h1>
        </Container>
      </div>
      <ExperienceSection />
      <SkillsSection />
    </PageFrame>
  );
}
