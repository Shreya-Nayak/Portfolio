"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { projects } from "@/lib/data";

function ProjectPreview({
  number,
  title,
  category,
  index,
}: {
  number: string;
  title: string;
  category: string;
  index: number;
}) {
  const previewTints = [
    "from-primary/25 via-primary/10 to-transparent",
    "from-white/10 via-primary/10 to-transparent",
    "from-primary/18 via-transparent to-white/8",
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.015, rotate: index === 1 ? -1 : 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={`relative min-h-[22rem] overflow-hidden border border-border/60 bg-gradient-to-br ${previewTints[index % previewTints.length]} p-6 sm:p-8`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_18%),radial-gradient(circle_at_80%_80%,rgba(244,162,97,0.08),transparent_22%)]" />
      <div className="relative flex h-full min-h-[20rem] flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-tech text-primary">Project {number}</span>
          <span className="rounded-full border border-border/70 bg-background/45 px-3 py-1 text-tech text-muted-foreground">
            {category}
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="h-28 rounded-3xl border border-border/60 bg-white/5 p-3">
              <div className="h-full rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/18 to-transparent" />
            </div>
            <div className="h-28 rounded-3xl border border-border/60 bg-white/5 p-3">
              <div className="h-full rounded-2xl border border-border/40 bg-[radial-gradient(circle_at_center,rgba(244,162,97,0.12),transparent_60%)]" />
            </div>
            <div className="h-28 rounded-3xl border border-border/60 bg-white/5 p-3">
              <div className="flex h-full items-end justify-center rounded-2xl border border-primary/20 bg-gradient-to-t from-primary/15 to-transparent pb-3">
                <span className="text-tech text-primary">{number}</span>
              </div>
            </div>
          </div>
          <p className="max-w-xs text-body-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      data-reveal-section
      className="scroll-mt-28 overflow-hidden border-y border-border/60 bg-secondary py-20 sm:py-28 lg:py-36"
    >
      <Container className="max-w-[100rem]">
        <div className="space-y-14">
          <SectionHeader
            number="03"
            eyebrow="Projects"
            title="Selected systems and studies"
            description="Projects that move between concurrency, language models, and financial time-series research. Different problems, the same instinct: understand the system underneath."
          />

          <div data-reveal-item className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-end">
            <Reveal>
              <ProjectPreview
                number={activeProject.number}
                title={activeProject.title}
                category={activeProject.category}
                index={activeIndex}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-7">
                <div>
                  <p className="text-tech text-primary">
                    Project {activeProject.number} / {activeProject.category}
                  </p>
                  <motion.h3
                    key={activeProject.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 font-display text-4xl leading-none tracking-[-0.035em] text-foreground sm:text-5xl"
                  >
                    {activeProject.title}
                  </motion.h3>
                  <p className="mt-5 text-body-lg text-muted-foreground">
                    {activeProject.summary}
                  </p>
                </div>
                <div className="grid gap-4 border-y border-border/60 py-5 sm:grid-cols-2">
                  <div>
                    <p className="text-tech text-primary">Approach</p>
                    <p className="mt-2 text-body-sm text-muted-foreground">
                      {activeProject.solution}
                    </p>
                  </div>
                  <div>
                    <p className="text-tech text-primary">What it shows</p>
                    <p className="mt-2 text-body-sm text-muted-foreground">
                      {activeProject.outcome}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="border-b border-primary/40 pb-1 text-tech text-muted-foreground"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid border-t border-border/60 md:grid-cols-3">
            {projects.map((project, index) => (
              <button
                key={project.number}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`focus-ring project-selector border-b border-border/60 px-1 py-5 text-left md:border-r md:px-5 ${activeIndex === index ? "project-selector-active" : ""}`}
              >
                <span className="text-tech text-primary">0{index + 1}</span>
                <span className="mt-3 block font-display text-xl leading-tight text-foreground">
                  {project.title}
                </span>
                <span className="mt-3 block text-tech text-muted-foreground">
                  {project.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
