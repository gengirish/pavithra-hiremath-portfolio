"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data/resume-data";

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative scroll-mt-28 py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-neural-purple/50 to-transparent" />
            <span className="text-neural-purple font-mono text-sm">02</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Skills & Expertise</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-neural-purple/50 to-transparent" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass-card p-6 group hover:border-opacity-50 transition-all duration-300"
              style={{
                borderColor: `${category.color}20`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: category.color }}
                >
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.03 }}
                    className="px-3 py-1.5 text-xs rounded-full border transition-colors"
                    style={{
                      borderColor: `${category.color}30`,
                      color: `${category.color}cc`,
                      backgroundColor: `${category.color}10`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
