# Design system — Pavithra portfolio

Generated with [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (`search.py "portfolio professional executive L&D leadership dark mode" --design-system -p "Pavithra Portfolio"`), then **adapted** to the existing neural / light–dark theme (the skill’s light monochrome sample was not applied as a full rebrand).

## Applied principles

| Area | Decision |
|------|----------|
| **Pattern** | Portfolio grid + trust: hero, stats, credentials, projects, contact CTAs. |
| **Style** | Trust & authority: clear hierarchy, credentials-forward sections, minimal gimmick. |
| **Motion** | `prefers-reduced-motion`: shorter boot, static hero canvas, no decorative bounce, `scroll-behavior: auto`, chat scroll `auto` vs `smooth`. |
| **Colour** | Cyan → indigo gradients only on key UI (avoid generic magenta “AI rainbow” on chrome); data accents may still use pink where semantically tied to content. |
| **Typography** | **Space Grotesk** (`font-heading`) for the hero name; Inter remains body. |
| **Chrome** | Floating nav (`top-4` inset, rounded), skip link, visible `focus-visible` rings, `cursor-pointer` on controls, mobile **Get in Touch**. |
| **Chat** | Dialog semantics (`role="dialog"`, labelled controls, input label), no hover-scale FAB. **NIM default:** `nvidia/llama-3.3-nemotron-super-49b-v1.5` + `/no_think` — see `design-system/nim-model.md`. |

## Pre-delivery checklist (from skill)

- [x] SVG icons (Lucide), no emoji icons  
- [x] Clickable elements: pointer + hover/focus feedback  
- [x] Transitions ~150–300ms on interactive UI  
- [x] Focus rings for keyboard nav  
- [x] `prefers-reduced-motion` respected (hero, boot, canvas, chat scroll, gradient animation)  
- [x] Anchor targets use `scroll-mt-*` for floating nav  

## Commands for future tweaks

```bash
python "%USERPROFILE%\.cursor\skills\ui-ux-pro-max\scripts\search.py" "<query>" --design-system -p "Pavithra Portfolio" -f markdown
python "%USERPROFILE%\.cursor\skills\ui-ux-pro-max\scripts\search.py" "focus form" --domain ux -n 8
python "%USERPROFILE%\.cursor\skills\ui-ux-pro-max\scripts\search.py" "images layout" --stack nextjs
```
