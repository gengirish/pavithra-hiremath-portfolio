# Pavithra H M — Digital Portfolio

Next.js portfolio (neural-themed UI) with resume data, OG image, and an optional AI chat.

**AI chat providers** (first match wins):

1. **NVIDIA NIM** — `NIM_API_KEY` or `NVIDIA_API_KEY` (`nvapi-...` from [build.nvidia.com](https://build.nvidia.com)). Optional: `NIM_MODEL` (default `meta/llama-3.3-70b-instruct`), `NIM_BASE_URL` (default `https://integrate.api.nvidia.com/v1`).
2. **OpenRouter** — `OPENROUTER_API_KEY`
3. **Groq** — `GROQ_API_KEY`

## Local development

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` for production (e.g. your Vercel URL).

## GitHub remote (new repository)

This folder was previously linked to another template repo. To publish **Pavithra’s** project as its own GitHub repository:

1. Authenticate the CLI (one-time): `gh auth login`
2. Create an empty repo on GitHub (replace `OWNER` and `REPO`):

   ```bash
   gh repo create OWNER/pavithra-hm-portfolio --public --description "Digital portfolio — Pavithra H M"
   ```

3. Point `origin` at the new repo and push:

   ```bash
   git remote set-url origin https://github.com/OWNER/pavithra-hm-portfolio.git
   git push -u origin main
   ```

   To keep the old remote as a backup instead of replacing it:

   ```bash
   git remote rename origin template-krishna-portfolio
   git remote add origin https://github.com/OWNER/pavithra-hm-portfolio.git
   git push -u origin main
   ```

## Site URL in code

Production site: **https://pavithra-hiremath-portfolio.vercel.app** — `src/app/layout.tsx` `metadataBase` / canonical should match that URL (or your custom domain if you add one).

## Profile sources

Resume content is aligned to **Pavithra H M** using the client PDF and the public LinkedIn profile. Where a CV and LinkedIn differ in role grouping or dates, the site follows the PDF timeline for enterprise roles and merges **ER HR Solutions** and headline-style positioning from LinkedIn.
