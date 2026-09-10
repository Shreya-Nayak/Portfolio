"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[28rem] lg:max-w-[32rem]">
      <div className="absolute inset-0 rounded-[2rem] border border-border/60 bg-white/3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl" />
      <div className="absolute inset-6 rounded-[1.6rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div className="relative aspect-square overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(230,184,92,0.12),transparent_38%),radial-gradient(circle_at_20%_20%,rgba(230,184,92,0.09),transparent_20%),radial-gradient(circle_at_80%_70%,rgba(230,184,92,0.06),transparent_22%)]" />

        <motion.svg
          aria-hidden="true"
          viewBox="0 0 420 420"
          className="relative h-full w-full"
          initial={false}
        >
          <defs>
            <linearGradient id="network-line" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(230,184,92,0.18)" />
              <stop offset="100%" stopColor="rgba(230,184,92,0.55)" />
            </linearGradient>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(230,184,92,0.95)" />
              <stop offset="100%" stopColor="rgba(230,184,92,0.1)" />
            </radialGradient>
          </defs>

          <g
            opacity="0.8"
            stroke="url(#network-line)"
            strokeWidth="1.2"
            fill="none"
          >
            <path d="M88 196 L166 154 L248 176 L318 140" />
            <path d="M88 196 L158 252 L244 246 L320 290" />
            <path d="M166 154 L210 216 L320 140" />
            <path d="M158 252 L210 216 L320 290" />
            <path d="M166 154 L158 252" />
            <path d="M248 176 L244 246" />
          </g>

          <motion.g
            animate={reduceMotion ? undefined : { y: [0, -5, 0], x: [0, 2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle
              cx="210"
              cy="216"
              r="24"
              fill="url(#node-glow)"
              opacity="0.35"
            />
            <circle cx="210" cy="216" r="12" fill="rgba(230,184,92,0.92)" />
          </motion.g>

          <motion.circle
            cx="88"
            cy="196"
            fill="rgba(230,184,92,0.7)"
            animate={reduceMotion ? undefined : { opacity: [0.5, 0.95, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="166"
            cy="154"
            fill="rgba(230,184,92,0.55)"
            animate={reduceMotion ? undefined : { opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="248"
            cy="176"
            fill="rgba(230,184,92,0.45)"
            animate={reduceMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="158"
            cy="252"
            fill="rgba(230,184,92,0.45)"
            animate={reduceMotion ? undefined : { opacity: [0.3, 0.75, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="320"
            cy="140"
            r="8"
            fill="rgba(230,184,92,0.55)"
            animate={reduceMotion ? undefined : { opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="320"
            cy="290"
            r="8"
            fill="rgba(230,184,92,0.45)"
            animate={reduceMotion ? undefined : { opacity: [0.3, 0.75, 0.3] }}
            transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>

        <div className="absolute inset-x-8 bottom-8 rounded-[1.25rem] border border-border/60 bg-background/60 p-4 backdrop-blur-xl">
          <p className="text-tech">Portfolio assistant</p>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Ask about the documented work, education, projects, and technical
            direction.
          </p>
        </div>
      </div>
    </div>
  );
}
