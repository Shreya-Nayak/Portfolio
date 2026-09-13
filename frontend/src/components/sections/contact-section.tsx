import { Container } from "@/components/layout/container";
import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { Grid } from "@/components/layout/grid";
import { LinkButton } from "@/components/ui/link-button";
import { Reveal } from "@/components/motion/reveal";
import { Surface } from "@/components/ui/surface";
import { SectionHeader } from "./section-header";
import { socialLinks } from "@/lib/data";

export function ContactSection() {
  return (
    <section
      id="contact"
      data-reveal-section
      className="scroll-mt-28 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="space-y-12">
          <SectionHeader
            number="06"
            eyebrow="Connect"
            title="Continue the conversation"
            description="The public contact details are not in the knowledge base yet. The portfolio assistant is available for questions about the work that is documented here."
          />

          <Grid base={1} xl={2} gap="lg">
            <Reveal>
              <div data-reveal-item className="space-y-6">
                <p className="text-h3 text-foreground">
                  Ask about the systems, projects, education, and experience
                  behind the page.
                </p>
                <div className="flex flex-wrap gap-3">
                  <LinkButton href="/projects" variant="primary" size="lg">
                    Explore projects
                  </LinkButton>
                  <LinkButton href="/about" variant="outline" size="lg">
                    Read the story
                  </LinkButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Surface data-reveal-item className="p-6 sm:p-8">
                <div className="space-y-5">
                  <div>
                    <p className="text-tech text-primary">Contact methods</p>
                    <p className="mt-2 text-body-sm text-muted-foreground">
                      Contact details are not included in the current knowledge
                      base.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {socialLinks.map((link) => (
                      <div
                        key={link.label}
                        className="rounded-3xl border border-border bg-background/45 p-4"
                      >
                        <p className="text-tech">{link.label}</p>
                        <p className="mt-2 text-body-sm text-muted-foreground">
                          {link.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div id="assistant">
                    <AssistantPanel />
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
