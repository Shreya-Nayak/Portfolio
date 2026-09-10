"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { profile } from "@/lib/data";

export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 18 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 24);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 24);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative min-h-[calc(100svh-5.5rem)] overflow-hidden border-b border-border/70 bg-[#080909]"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute -left-16 top-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(230,184,92,0.16),transparent_68%)] blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute right-[8%] top-[18%] h-[28rem] w-[28rem] rounded-full border border-primary/10"
      />
      <div
        aria-hidden="true"
        className="hero-grid absolute inset-0 opacity-50"
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5.5rem)] w-full max-w-[100rem] grid-cols-1 content-between gap-12 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.42fr)] lg:px-14 lg:py-16 xl:px-20">
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-tech text-primary"
          >
            {profile.heroLead} / 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-5 max-w-5xl font-display text-[clamp(4.2rem,11vw,10rem)] font-medium leading-[0.82] tracking-[-0.055em] text-foreground"
          >
            Shreya
            <br />
            <span className="text-primary">Nayak</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-2xl text-[clamp(1.15rem,2vw,1.65rem)] leading-[1.25] text-foreground/80"
          >
            {profile.headline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link href="/projects" className="hero-action focus-ring group">
              <span>Enter the work</span>
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </Link>
            <span className="text-tech text-muted-foreground">
              Currently beginning at Accenture
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col justify-end lg:pb-4">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border-l border-primary/50 pl-5 sm:pl-7"
          >
            <p className="text-tech text-primary">A wider lens</p>
            <p className="mt-4 max-w-sm text-body-lg text-foreground/75">
              From NIT Goa to Wipro&apos;s GraphRAG work, and now toward
              infrastructure, cloud, automation, and AI systems.
            </p>
          </motion.div>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border/70 pt-5">
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

        <div className="col-span-full flex items-end justify-between border-t border-border/70 pt-4 text-tech text-muted-foreground">
          <span>01 / 04</span>
          <span className="hidden sm:block">Move through the work ↓</span>
          <span>Computer Science Engineer</span>
        </div>
      </div>
    </div>
  );
}
