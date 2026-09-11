import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { Surface } from "@/components/ui/surface";
import { SectionHeader } from "./section-header";
import { profile } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" data-reveal-section className="scroll-mt-28 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="space-y-12">
          <SectionHeader
            number="01"
            eyebrow="Identity"
            title="Who I am"
            description="I started in one engineering direction, moved into computer science, and kept widening the lens from software projects to the infrastructure and AI systems around them."
          />

          <Grid base={1} lg={2} gap="lg">
            <Reveal>
              <div data-reveal-item className="space-y-6">
                <p className="text-h3 text-foreground">
                  I am interested in what happens around the code: how systems
                  are deployed, connected, automated, secured, and made useful.
                </p>
                <p className="max-w-2xl text-body-lg text-muted-foreground">
                  That interest has taken me from a B.Tech in Computer Science
                  and Engineering at NIT Goa to GraphRAG and test automation at
                  Wipro, and now into an early-career technology role at
                  Accenture.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Surface data-reveal-item className="p-6 sm:p-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-tech text-primary">A few coordinates</p>
                    <h3 className="mt-3 text-h3">{profile.name}</h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {profile.identityTags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded-2xl border border-border bg-white/4 px-4 py-3"
                      >
                        <p className="text-sm text-foreground">{tag}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-4 border-t border-border/60 pt-4 sm:grid-cols-3">
                    <div>
                      <p className="text-tech">Focus</p>
                      <p className="mt-2 text-body-sm text-muted-foreground">
                        Infrastructure + cloud
                      </p>
                    </div>
                    <div>
                      <p className="text-tech">Lens</p>
                      <p className="mt-2 text-body-sm text-muted-foreground">
                        Automation + AI systems
                      </p>
                    </div>
                    <div>
                      <p className="text-tech">Status</p>
                      <p className="mt-2 text-body-sm text-muted-foreground">
                        NIT Goa · 9.13 CGPA
                      </p>
                    </div>
                  </div>
                </div>
              </Surface>
            </Reveal>
          </Grid>
        </div>
      </Container>
    </section>
  );
}
