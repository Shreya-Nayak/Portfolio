"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { motionDurations, motionEase } from "./presets";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {
          opacity: 0,
          y: reduceMotion ? 0 : 16,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: motionDurations.standard,
            ease: motionEase.standard,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
