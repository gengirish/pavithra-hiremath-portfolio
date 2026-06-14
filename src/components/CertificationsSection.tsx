"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";
import { certifications } from "@/data/resume-data";

export default function CertificationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (certifications.length === 0) return null;

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-neural-green/50 to-transparent" />
            <span className="text-neural-green font-mono text-sm">04.5</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Certifications</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-neural-green/50 to-transparent" />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-5 hover:border-neural-green/30 transition-colors"
            >
              <Award size={20} className="text-neural-green mb-3" />
              <h4 className="text-sm font-semibold text-neural-fg mb-1">
                {cert.title}
              </h4>
              <p className="text-xs text-neural-fg-dim mb-2">
                {cert.issuer} &middot; {cert.date}
              </p>
              <p className="text-xs text-neural-fg-muted leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
