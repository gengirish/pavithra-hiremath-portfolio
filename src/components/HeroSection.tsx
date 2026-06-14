"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Mail, Linkedin, ArrowDown } from "lucide-react";
import NeuralNetworkCanvas from "./NeuralNetworkCanvas";
import { personalInfo, stats } from "@/data/resume-data";

const roles = [
  "Master Trainer · CeG",
  "L&D & Transformation Leader",
  "Business Development · HR",
  "Program & Incubation Manager",
  "Public-Sector Digital Enablement",
];

export default function HeroSection() {
  const reducedMotionPref = useReducedMotion();
  const prefersReduced = reducedMotionPref === true;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  /* Reduced motion: rotate full lines on an interval (no typewriter, no infinite micro-animations). */
  useEffect(() => {
    if (!prefersReduced) return;
    setDisplayText(roles[roleIndex] ?? "");
  }, [prefersReduced, roleIndex]);

  useEffect(() => {
    if (!prefersReduced) return;
    const id = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;

    const currentRole = roles[roleIndex] ?? "";
    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            window.setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 30 : 80
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, prefersReduced]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 sm:pt-28">
      <NeuralNetworkCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-neural-bg via-transparent to-neural-bg" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0.2 : 0.8, ease: "easeOut" }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 text-sm text-neural-fg-muted">
            <span className="h-2 w-2 rounded-full bg-neural-green motion-safe:animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-neural-fg sm:text-5xl lg:text-7xl mb-4">
            {personalInfo.name}
          </h1>

          <div className="mb-6 flex h-12 items-center justify-center sm:h-14">
            <span className="font-mono text-xl text-neural-cyan sm:text-2xl lg:text-3xl">
              {displayText}
              {!prefersReduced ? (
                <span className="motion-safe:animate-pulse">|</span>
              ) : null}
            </span>
          </div>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-neural-fg-muted sm:text-lg">
            {personalInfo.tagline}
          </p>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 text-sm text-neural-fg-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-neural-cyan" aria-hidden />
              {personalInfo.location}
            </span>
            {personalInfo.email ? (
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-neural-cyan" aria-hidden />
                {personalInfo.email}
              </span>
            ) : null}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-1.5 rounded-md transition-colors duration-200 hover:text-neural-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg"
              >
                <Linkedin size={14} aria-hidden />
                LinkedIn
              </a>
            )}
          </div>

          <div className="mx-auto mb-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReduced ? 0 : 0.5 + i * 0.1,
                  ease: "easeOut",
                }}
                className="glass-card p-4 transition-shadow duration-200 motion-safe:hover:shadow-lg"
              >
                <div className="text-2xl font-bold text-neural-cyan sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-neural-fg-dim">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#about"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReduced ? 0 : 1.2 }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md text-neural-fg-dim transition-colors duration-200 hover:text-neural-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg"
          >
            <ArrowDown size={16} aria-hidden className="motion-reduce:opacity-80" />
            Scroll to explore
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
