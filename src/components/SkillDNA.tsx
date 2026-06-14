"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { graphNodes, projectConnections, skillJourney } from "@/data/resume-data";

export default function SkillDNA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-neural-cyan/50 to-transparent" />
            <span className="text-neural-cyan font-mono text-sm">03.5</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Career Graph</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-neural-cyan/50 to-transparent" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-neural-fg mb-6">
              Career Network
            </h3>
            <div className="relative min-h-[300px]">
              <svg className="w-full h-[300px]" viewBox="0 0 500 300">
                {projectConnections.map((conn, idx) => {
                  const fromNode = graphNodes.findIndex((n) => n.id === conn.from);
                  const toNode = graphNodes.findIndex((n) => n.id === conn.to);
                  if (fromNode === -1 || toNode === -1) return null;

                  const positions = [
                    { x: 80, y: 240 },
                    { x: 170, y: 140 },
                    { x: 280, y: 200 },
                    { x: 350, y: 100 },
                    { x: 430, y: 160 },
                  ];

                  return (
                    <motion.line
                      key={idx}
                      x1={positions[fromNode]?.x}
                      y1={positions[fromNode]?.y}
                      x2={positions[toNode]?.x}
                      y2={positions[toNode]?.y}
                      stroke="rgba(6, 182, 212, 0.15)"
                      strokeWidth={conn.strength * 0.5}
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                    />
                  );
                })}

                {graphNodes.map((node, idx) => {
                  const positions = [
                    { x: 80, y: 240 },
                    { x: 170, y: 140 },
                    { x: 280, y: 200 },
                    { x: 350, y: 100 },
                    { x: 430, y: 160 },
                  ];
                  const pos = positions[idx];

                  return (
                    <motion.g
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + idx * 0.15 }}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={node.size * 8}
                        fill={`${node.color}30`}
                        stroke={node.color}
                        strokeWidth="1.5"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + node.size * 8 + 16}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="11"
                        fontFamily="monospace"
                      >
                        {node.id}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + node.size * 8 + 28}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {node.years}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-neural-fg mb-6">
              Skill Progression
            </h3>
            <div className="space-y-6">
              {skillJourney.map((skill, idx) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: skill.color }}>
                      {skill.skill}
                    </span>
                    <span className="text-xs text-neural-fg-dim font-mono">
                      {skill.milestones[skill.milestones.length - 1].level}%
                    </span>
                  </div>
                  <div className="h-2 bg-neural-surface rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? {
                              width: `${skill.milestones[skill.milestones.length - 1].level}%`,
                            }
                          : {}
                      }
                      transition={{ duration: 1, delay: 0.6 + idx * 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    {skill.milestones.map((ms) => (
                      <span key={ms.year} className="text-[10px] text-neural-fg-dim font-mono">
                        {ms.year}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
