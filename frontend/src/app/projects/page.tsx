import { Container } from "@/components/layout/container";
import { PageFrame } from "@/components/layout/page-frame";
import { ProjectsSection } from "@/components/sections/projects-section";

export default function ProjectsPage() {
  return (
    <PageFrame>
      <div className="border-b border-border/60 py-16 sm:py-24">
        <Container>
          <p className="text-tech text-primary">Projects / 03</p>
          <h1 className="mt-5 max-w-4xl text-h1">
            Technical studies in concurrency, NLP, and financial regime shifts.
          </h1>
        </Container>
      </div>
      <ProjectsSection />
    </PageFrame>
  );
}
