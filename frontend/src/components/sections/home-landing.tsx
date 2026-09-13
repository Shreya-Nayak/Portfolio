import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { HeroSection } from "@/components/sections/hero-section";
import { experienceEntries, profile, projects, skillGroups } from "@/lib/data";

export function HomeLanding() {
  return (
    <>
      <HeroSection />

      <section
        data-reveal-section
        className="border-y border-border/60 bg-secondary py-12 sm:py-16"
      >
        <Container className="max-w-[100rem]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.5fr_0.75fr] lg:items-start">
            <div data-reveal-item>
              <p className="text-tech text-primary">The short version</p>
              <p className="mt-4 max-w-xs text-body-lg text-foreground/85">
                {profile.summary}
              </p>
            </div>
            <div
              data-reveal-item
              className="border-l border-primary/40 pl-6 sm:pl-8"
            >
              <p className="font-display text-3xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
                Software, systems, and the space between them.
              </p>
              <Link href="/about" className="hero-action focus-ring mt-8">
                Read the full story <span>↗</span>
              </Link>
            </div>
            <div
              data-reveal-item
              className="grid grid-cols-2 gap-5 border-t border-border/60 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
            >
              {profile.metadata.slice(0, 2).map((item) => (
                <div key={item.label}>
                  <p className="text-tech text-primary">{item.label}</p>
                  <p className="mt-2 text-sm leading-5 text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section data-reveal-section className="py-20 sm:py-28">
        <Container className="max-w-[100rem]">
          <div className="flex items-end justify-between gap-6 border-b border-border/60 pb-5">
            <div>
              <p className="text-tech text-primary">Selected work / 03</p>
              <h2 className="mt-3 text-h2">
                A few things I&apos;ve studied deeply.
              </h2>
            </div>
            <Link
              href="/projects"
              className="hero-action focus-ring hidden sm:inline-flex"
            >
              View all projects <span>↗</span>
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden border-b border-border/60 bg-border/60 lg:grid-cols-2">
            {projects.slice(0, 2).map((project, index) => (
              <Reveal key={project.number} delay={index * 0.08}>
                <Link
                  href="/projects"
                  className="group block min-h-72 bg-background p-6 transition-colors hover:bg-[#101112] sm:p-8 lg:min-h-96"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-tech text-primary">0{index + 1}</span>
                    <span className="text-tech text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <div className="mt-24 max-w-md">
                    <h3 className="font-display text-3xl leading-none tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-body-sm text-muted-foreground">
                      {project.summary}
                    </p>
                  </div>
                  <span className="mt-8 block text-tech text-muted-foreground transition-colors group-hover:text-primary">
                    Open study ↗
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        data-reveal-section
        className="border-y border-border/60 bg-secondary py-16 sm:py-20"
      >
        <Container className="max-w-[100rem]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-tech text-primary">Current stage / 04</p>
              <h2 className="mt-4 text-h2">
                Learning the systems around the work.
              </h2>
              <Link href="/experience" className="hero-action focus-ring mt-8">
                See experience <span>↗</span>
              </Link>
            </div>
            <div className="divide-y divide-border/60 border-y border-border/60">
              {experienceEntries.slice(0, 2).map((entry) => (
                <article
                  key={entry.organization}
                  className="grid gap-3 py-6 sm:grid-cols-[12rem_1fr]"
                >
                  <p className="text-tech text-primary">{entry.period}</p>
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.025em] text-foreground">
                      {entry.organization}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/75">
                      {entry.role}
                    </p>
                    <p className="mt-3 max-w-2xl text-body-sm text-muted-foreground">
                      {entry.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section data-reveal-section className="py-20 sm:py-28">
        <Container className="max-w-[100rem]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-tech text-primary">Technical focus / 05</p>
              <h2 className="mt-4 text-h2">
                The tools and concepts in motion.
              </h2>
              <Link href="/skills" className="hero-action focus-ring mt-8">
                Explore skills <span>↗</span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-5 border-t border-border/60 pt-6 sm:gap-x-12">
              {skillGroups.slice(0, 4).map((group) => (
                <div key={group.label}>
                  <p className="text-tech text-primary">{group.label}</p>
                  <p className="mt-2 max-w-[15rem] text-sm leading-6 text-muted-foreground">
                    {group.items.slice(0, 5).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 bg-primary px-5 py-12 text-primary-foreground sm:px-8 sm:py-16 lg:px-14">
        <Container className="max-w-[100rem]">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-tech text-primary-foreground/70">
                One more way in
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl leading-none tracking-[-0.04em] sm:text-6xl">
                Ask the portfolio about the work.
              </h2>
            </div>
            <Link
              href="/contact#assistant"
              className="hero-action focus-ring border-primary-foreground/50 text-primary-foreground hover:text-primary-foreground"
            >
              Talk to the portfolio <span>↗</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
