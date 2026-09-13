import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { journeyMilestones } from "@/lib/data";

export function JourneySection() {
  return (
    <section
      id="journey"
      data-reveal-section
      className="scroll-mt-28 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="space-y-12">
          <SectionHeader
            number="05"
            eyebrow="Journey"
            title="A change of direction, kept in motion"
            description="The short version of a journey from Mechanical Engineering admission to a broader technology practice."
          />

          <div className="grid gap-4 lg:grid-cols-5">
            {journeyMilestones.map((milestone, index) => (
              <Reveal key={milestone.stage} delay={index * 0.06}>
                <article
                  data-reveal-item
                  className="relative flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-white/3 p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-tech text-primary">
                      {milestone.stage}
                    </span>
                    <span className="text-tech text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-h4 text-foreground">{milestone.title}</h3>
                  <p className="text-body-sm text-muted-foreground">
                    {milestone.summary}
                  </p>
                  {index < journeyMilestones.length - 1 ? (
                    <div className="mt-auto flex items-center gap-2 pt-2 text-tech text-primary">
                      <span className="h-px flex-1 bg-border/70" />
                      <span aria-hidden="true">→</span>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
