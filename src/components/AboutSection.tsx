"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Globe } from "lucide-react";
import { personalInfo, domains } from "@/data/resume-data";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative scroll-mt-28 py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-neural-cyan/50 to-transparent" />
            <span className="text-neural-cyan font-mono text-sm">01</span>
            <h2 className="text-3xl sm:text-4xl font-bold">About</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-neural-cyan/50 to-transparent" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 mt-12">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-neural-fg-soft text-lg leading-relaxed mb-6">
              {personalInfo.summary}
            </p>
            <p className="text-neural-fg-muted leading-relaxed mb-8">
              With a strong foundation in biotechnology and an MBA in Marketing from Osmania University,
              I bring a unique blend of scientific understanding and business acumen to the
              pharmaceutical and healthcare sales landscape. My career spans across
              FMCG, manufacturing, hospitality, and healthcare — each role strengthening my
              ability to drive revenue, build teams, and expand market presence.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="glass-card p-4">
                <Briefcase size={20} className="text-neural-cyan mb-2" />
                <h4 className="text-sm font-semibold text-neural-fg">Current Role</h4>
                <p className="text-xs text-neural-fg-muted mt-1">
                  Regional Sales & Marketing Head at Arsa Lifecare
                </p>
              </div>
              <div className="glass-card p-4">
                <GraduationCap size={20} className="text-neural-purple mb-2" />
                <h4 className="text-sm font-semibold text-neural-fg">Education</h4>
                <p className="text-xs text-neural-fg-muted mt-1">
                  MBA Marketing — Osmania University
                </p>
              </div>
              <div className="glass-card p-4">
                <Globe size={20} className="text-neural-green mb-2" />
                <h4 className="text-sm font-semibold text-neural-fg">Languages</h4>
                <p className="text-xs text-neural-fg-muted mt-1">
                  English, Hindi, Telugu
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-neural-fg-soft uppercase tracking-wider mb-4">
              Industry Domains
            </h3>
            <div className="space-y-3">
              {domains.map((domain, i) => (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-card p-4 flex items-center gap-3 hover:border-neural-cyan/30 transition-colors"
                >
                  <span className="text-2xl">{domain.icon}</span>
                  <span className="text-neural-fg-soft">{domain.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
