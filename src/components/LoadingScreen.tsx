"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const bootLines = [
  "NEURAL_PORTFOLIO v2.4.0",
  "Initializing L&D + transformation graph...",
  "Loading 15+ years of learning & programme signals...",
  "CeG training node [PRIMARY] online",
  "Enterprise + social-impact subgraphs [LINKED]",
  "System ready. Welcome.",
];

export default function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setLines([...bootLines]);
      setProgress(100);
      const t = window.setTimeout(() => setVisible(false), 350);
      return () => window.clearTimeout(t);
    }

    const timers: number[] = [];
    bootLines.forEach((line, i) => {
      timers.push(
        window.setTimeout(() => {
          setLines((prev) => [...prev, line]);
          setProgress(((i + 1) / bootLines.length) * 100);
        }, i * 300)
      );
    });
    timers.push(
      window.setTimeout(() => setVisible(false), bootLines.length * 300 + 600)
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-neural-bg"
        >
          <div className="w-full max-w-lg px-6">
            <div className="mb-4 font-mono text-sm text-neural-cyan">BOOT_SEQUENCE</div>
            <div className="min-h-[180px] space-y-2 font-mono text-xs text-neural-fg-muted">
              {lines.map((line, i) => (
                <motion.div
                  key={`${line}-${i}`}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ease: "easeOut" }}
                  className="text-neural-green/90"
                >
                  <span className="mr-2 text-neural-cyan/60">{">"}</span>
                  {line}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 h-1 overflow-hidden rounded-full bg-neural-border/30">
              <motion.div
                className="h-full bg-gradient-to-r from-neural-cyan to-neural-green"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: reduceMotion ? 0.1 : 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
