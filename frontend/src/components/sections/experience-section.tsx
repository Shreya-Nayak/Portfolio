import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { experienceEntries } from "@/lib/data";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      data-reveal-section
      className="scroll-mt-28 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="space-y-12">
          <SectionHeader
            number="02"
            eyebrow="Experience"
            title="Work that widened the lens"
            description="From mentoring web teams at NIT Goa to GraphRAG research at Wipro, each step added another layer to how I think about technology systems."
          />

          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/30 via-border to-transparent lg:left-[15.5rem]" />
            <div className="space-y-3">
              {experienceEntries.map((entry, index) => (
                <Reveal
                  key={`${entry.period}-${entry.role}`}
                  delay={index * 0.06}
                >
                  <article
                    data-reveal-item
                    className="grid gap-4 rounded-[1.5rem] border border-border/60 bg-white/3 p-5 sm:p-6 lg:grid-cols-[13rem_2rem_1fr] lg:items-start lg:p-7"
                  >
                    <div className="lg:pt-1">
                      <p className="text-tech text-primary">{entry.period}</p>
                    </div>

                    <div className="hidden lg:flex lg:justify-center">
                      <div className="mt-2 h-3 w-3 rounded-full border border-primary/40 bg-primary shadow-[0_0_0_6px_rgba(244,162,97,0.08)]" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-tech">{entry.organization}</p>
                          <h3 className="mt-2 text-h3">{entry.role}</h3>
                        </div>
                        <span className="rounded-full border border-border bg-white/5 px-3 py-1 text-tech text-muted-foreground">
                          Verified experience
                        </span>
                      </div>
                      <p className="max-w-3xl text-body text-muted-foreground">
                        {entry.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {entry.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-border bg-background/40 px-3 py-1 text-tech text-muted-foreground"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
