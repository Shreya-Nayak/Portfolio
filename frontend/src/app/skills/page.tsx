import { Container } from "@/components/layout/container";
import { PageFrame } from "@/components/layout/page-frame";
import { SkillsSection } from "@/components/sections/skills-section";

export default function SkillsPage() {
  return (
    <PageFrame>
      <div className="border-b border-border/60 py-16 sm:py-24">
        <Container>
          <p className="text-tech text-primary">Skills / 05</p>
          <h1 className="mt-5 max-w-4xl text-h1">
            A wide technical surface, from application layers to infrastructure.
          </h1>
        </Container>
      </div>
      <SkillsSection />
    </PageFrame>
  );
}
