"use client";

import { Mail, Linkedin, MapPin } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

const footerLink =
  "flex cursor-pointer items-center gap-3 rounded-md text-sm text-neural-fg-muted transition-colors duration-200 hover:text-neural-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg";

const footerAnchor =
  "block cursor-pointer rounded-md text-sm text-neural-fg-muted transition-colors duration-200 hover:text-neural-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg";

export default function Footer() {
  return (
    <footer id="contact" className="relative scroll-mt-28 border-t border-neural-border/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold text-gradient-cyan">{personalInfo.name}</h3>
            <p className="text-sm leading-relaxed text-neural-fg-muted">
              {personalInfo.summary.slice(0, 150)}...
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neural-fg-soft">
              Connect
            </h4>
            <div className="space-y-3">
              {personalInfo.email ? (
                <a href={`mailto:${personalInfo.email}`} className={footerLink}>
                  <Mail size={16} aria-hidden />
                  {personalInfo.email}
                </a>
              ) : null}
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  <Linkedin size={16} aria-hidden />
                  LinkedIn Profile
                </a>
              )}
              <span className="flex items-center gap-3 text-sm text-neural-fg-muted">
                <MapPin size={16} aria-hidden />
                {personalInfo.location}
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neural-fg-soft">
              Quick Links
            </h4>
            <div className="space-y-2">
              {["About", "Skills", "Experience", "Projects"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className={footerAnchor}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neural-border/20 pt-8 sm:flex-row">
          <p className="text-xs text-neural-fg-dim">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <a
            href="https://www.intelliforge.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-1.5 rounded-md text-xs text-neural-fg-dim transition-colors duration-200 hover:text-neural-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg"
          >
            Powered by <span className="font-semibold text-gradient-cyan">IntelliForge AI</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
