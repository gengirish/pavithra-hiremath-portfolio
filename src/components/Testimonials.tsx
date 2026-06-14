"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/resume-data";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative scroll-mt-28 py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-neural-pink/50 to-transparent" />
            <span className="text-neural-pink font-mono text-sm">05</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Testimonials</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-neural-pink/50 to-transparent" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card p-6 relative"
            >
              <Quote
                size={32}
                className="text-neural-purple/20 absolute top-4 right-4"
              />
              <p className="text-neural-fg-soft text-sm leading-relaxed mb-6 italic">
                {testimonial.text}
              </p>
              <div className="border-t border-neural-border/20 pt-4">
                <p className="text-sm font-semibold text-neural-fg">
                  {testimonial.author}
                </p>
                <p className="text-xs text-neural-fg-dim">
                  {testimonial.relationship}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
