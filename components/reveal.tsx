"use client";

import { motion } from "motion/react";

/**
 * Section-level scroll reveal. Deliberately small — 20px and a fade, once per
 * element. Anything more emphatic starts competing with the seam, which is the
 * only thing on the page that's supposed to announce itself.
 *
 * MotionConfig sets reducedMotion="user", so this collapses to a plain fade for
 * anyone who asks for less movement.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
