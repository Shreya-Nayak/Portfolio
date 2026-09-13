"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GsapPageEffects() {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const progress = document.querySelector<HTMLElement>(
        "[data-scroll-progress]",
      );

      if (progress) {
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
        });
      }

      const sections = gsap.utils.toArray<HTMLElement>("[data-reveal-section]");
      if (reducedMotion) {
        gsap.set(sections, { clearProps: "all" });
        return;
      }

      sections.forEach((section) => {
        const items =
          section.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.fromTo(
          items.length ? items : section,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            stagger: items.length ? 0.08 : 0,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
