"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const linkClass =
  "rounded-lg px-3 py-2 text-sm text-neural-fg-muted transition-colors duration-200 hover:bg-neural-surface/50 hover:text-neural-cyan cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg";

const ctaClass =
  "cursor-pointer rounded-lg border border-neural-cyan/20 bg-neural-cyan/10 px-4 py-2 text-sm text-neural-cyan transition-colors duration-200 hover:bg-neural-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg";

const ctaDesktopClass = `${ctaClass} ml-2`;

export default function Navbar() {
  const reducedMotionPref = useReducedMotion();
  const prefersReduced = reducedMotionPref === true;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={prefersReduced ? false : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: prefersReduced ? 0.15 : 0.45, ease: "easeOut" }}
      className={`fixed left-3 right-3 top-3 z-50 mx-auto w-[min(100%,80rem)] rounded-2xl transition-all duration-200 sm:left-4 sm:right-4 sm:top-4 ${
        scrolled
          ? "glass border border-neural-border/30 shadow-lg"
          : "border border-transparent bg-transparent"
      }`}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#"
            className="cursor-pointer rounded-lg text-lg font-bold text-gradient-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg"
          >
            {personalInfo.name.split(" ")[0]}
            <span className="font-normal text-neural-fg-muted">.profile</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href={
                personalInfo.email
                  ? `mailto:${personalInfo.email}`
                  : personalInfo.linkedin || "#contact"
              }
              target={personalInfo.email ? undefined : "_blank"}
              rel={personalInfo.email ? undefined : "noopener noreferrer"}
              className={ctaDesktopClass}
            >
              Get in Touch
            </a>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              className="cursor-pointer rounded-lg p-2 text-neural-fg-muted transition-colors duration-200 hover:text-neural-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg"
            >
              {mobileOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={prefersReduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReduced ? undefined : { opacity: 0, height: 0 }}
            className="glass border-t border-neural-border/30 md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block ${linkClass}`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={
                  personalInfo.email
                    ? `mailto:${personalInfo.email}`
                    : personalInfo.linkedin || "#contact"
                }
                target={personalInfo.email ? undefined : "_blank"}
                rel={personalInfo.email ? undefined : "noopener noreferrer"}
                onClick={() => setMobileOpen(false)}
                className={`${ctaClass} mt-2 block w-full text-center`}
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
