"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, TrendingUp, TrendingDown } from "lucide-react";
import { experience } from "@/data/resume-data";

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative scroll-mt-28 py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-neural-green/50 to-transparent" />
            <span className="text-neural-green font-mono text-sm">03</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Career Timeline</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-neural-green/50 to-transparent" />
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neural-cyan via-neural-purple to-neural-green" />

          {experience.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={exp.period}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start gap-8 mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`hidden md:block w-1/2 ${isLeft ? "text-right pr-12" : "text-left pl-12"}`}
                >
                  <span className="text-xs font-mono text-neural-fg-dim">
                    EPOCH {exp.epoch} — {exp.phase}
                  </span>
                </div>

                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: exp.domainColor,
                      backgroundColor: `${exp.domainColor}40`,
                      boxShadow: `0 0 12px ${exp.domainColor}40`,
                    }}
                  />
                </div>

                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pl-12" : "md:pr-12"}`}
                >
                  <div className="glass-card p-6 hover:border-opacity-50 transition-all duration-300"
                    style={{ borderColor: `${exp.domainColor}20` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-mono mb-2"
                          style={{
                            backgroundColor: `${exp.domainColor}20`,
                            color: exp.domainColor,
                          }}
                        >
                          {exp.domain}
                        </span>
                        <h3 className="text-lg font-bold text-neural-fg">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-neural-fg-muted text-sm mt-1">
                          <Building2 size={14} />
                          <span>{exp.company}</span>
                        </div>
                        <span className="text-xs text-neural-fg-dim font-mono">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <p className="text-neural-fg-muted text-sm mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-sm text-neural-fg-soft flex items-start gap-2"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: exp.domainColor }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs rounded bg-neural-surface text-neural-fg-muted border border-neural-border/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1 text-neural-green">
                        <TrendingUp size={12} />
                        Accuracy: {exp.accuracy}%
                      </span>
                      <span className="flex items-center gap-1 text-neural-amber">
                        <TrendingDown size={12} />
                        Loss: {exp.loss}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
