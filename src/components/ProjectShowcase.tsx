"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, TrendingUp } from "lucide-react";
import { featuredProjects } from "@/data/resume-data";

export default function ProjectShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative scroll-mt-28 py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-neural-amber/50 to-transparent" />
            <span className="text-neural-amber font-mono text-sm">04</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Key Initiatives</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-neural-amber/50 to-transparent" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 group hover:border-opacity-50 transition-all duration-300"
              style={{ borderColor: `${project.domainColor}20` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-mono mb-2"
                    style={{
                      backgroundColor: `${project.domainColor}20`,
                      color: project.domainColor,
                    }}
                  >
                    {project.domain}
                  </span>
                  <h3 className="text-xl font-bold text-neural-fg">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neural-fg-dim">{project.client}</p>
                </div>
                <ExternalLink
                  size={18}
                  className="text-neural-fg-dim group-hover:text-neural-cyan transition-colors"
                />
              </div>

              <p className="text-neural-fg-muted text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex items-start gap-2 mb-4 p-3 rounded-lg bg-neural-surface/50">
                <TrendingUp size={16} className="text-neural-green mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neural-green">{project.impact}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs rounded border border-neural-border/30 text-neural-fg-muted bg-neural-bg/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
