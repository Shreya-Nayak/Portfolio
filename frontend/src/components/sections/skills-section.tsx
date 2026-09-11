import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { Surface } from "@/components/ui/surface";
import { SectionHeader } from "./section-header";
import { skillGroups } from "@/lib/data";

export function SkillsSection() {
  return (
    <section id="skills" data-reveal-section className="scroll-mt-28 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="space-y-12">
          <SectionHeader
            number="04"
            eyebrow="Technical world"
            title="A wide technical surface"
            description="Not a ranking system. These are the languages, frameworks, data tools, and infrastructure concepts that appear across my projects, education, and current learning."
          />

          <Grid base={1} xl={2} gap="lg">
            <Reveal>
              <Surface data-reveal-item className="relative overflow-hidden p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(244,162,97,0.16),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(244,162,97,0.08),transparent_24%)]" />
                <div className="relative space-y-6">
                  <div>
                    <p className="text-tech text-primary">Current direction</p>
                    <h3 className="mt-3 text-h3">
                      From application layers to the systems around them.
                    </h3>
                  </div>
                  <p className="max-w-xl text-body text-muted-foreground">
                    My strongest through-line is curiosity about how the parts
                    connect: APIs to data, models to retrieval, and cloud
                    concepts to reliable delivery.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {skillGroups.slice(0, 2).map((group) => (
                      <div
                        key={group.label}
                        className="rounded-3xl border border-border bg-background/45 p-4"
                      >
                        <p className="text-tech text-primary">{group.label}</p>
                        <p className="mt-2 text-body-sm text-muted-foreground">
                          {group.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Surface>
            </Reveal>

            <Reveal delay={0.08}>
              <div data-reveal-item className="grid gap-4 sm:grid-cols-2">
                {skillGroups.map((group, index) => (
                  <Surface
                    key={group.label}
                    variant={index % 2 === 0 ? "default" : "outline"}
                    className="p-5"
                  >
                    <div className="space-y-4">
                      <div>
                        <p className="text-tech text-primary">{group.label}</p>
                        <p className="mt-2 text-body-sm text-muted-foreground">
                          {group.summary}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border bg-white/5 px-3 py-1 text-tech text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Surface>
                ))}
              </div>
            </Reveal>
          </Grid>
        </div>
      </Container>
    </section>
  );
}
