# CLAUDE.md

This file gives Claude Code persistent context for the Mahbeer portfolio project. Read this at the start of every session.

---

## About me

- **Name:** Muhammad Mahbeer (display: small "Muhammad" above large bold "Mahbeer")
- **Role:** DevOps Engineer (~1 year experience)
- **Current company:** AlMuqeet Systems (Dec 2025 – Present) — CI/CD pipelines, Zabbix monitoring/observability
- **Previous:** iQuasar LLC intern (Aug – Dec 2025) — Jenkins, Kubernetes, Terraform, Ansible, Prometheus, Grafana, Loki
- **Location:** Srinagar, India
- **GitHub:** github.com/thebbear7
- **Domain:** mahbeer.in (to be purchased)

I do **not** know how to code. You (Claude Code) are doing the implementation. Explain things at a beginner-friendly level when I ask, and never assume I'll "fill in the blanks" — give me complete, working code and exact commands to run.

---

## Project goal

A **personal portfolio website** for me. Aesthetic priorities:

- **Super aesthetic and minimalist** — clean, modern, lots of whitespace
- **Non-scrollable landing page** — single viewport, no vertical scroll on the home page
- **Background animation:** half-visible planetary orbit at the bottom of the screen (about 50% of the orbit visible, the rest off-screen below). A small dot/planet traces the orbit. Subtle, slow, looping.
- Dark mode aesthetic preferred (dark bg, light text, one subtle accent color)

---

## Page structure

**Top navigation bar** with these sections:

1. **Experience** — work history
2. **Projects** — DevOps projects I've built
3. **Blogs** — written posts I'll add over time
4. **Contact** — ways to reach me

Because the landing page is non-scrollable, clicking a nav link should open a **modal, drawer, or slide-in panel** rather than scroll to a section or navigate away. The home page itself stays clean — just my name, role, and the orbit animation.

The **Blogs** section is the one that grows over time. New posts should be addable by dropping a new `.mdx` file into the content folder — no code changes needed.

---

## Tech stack (decided)

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (for the orbit dot animation along an SVG path)
- **Background:** SVG-based half-ellipse orbit (NOT three.js — keeping it lightweight and minimalist)
- **Blogs:** MDX files in `/content/blogs/`, rendered via `next-mdx-remote` or `contentlayer`
- **Build mode:** **Static export** (`output: 'export'` in `next.config.js`) so the site is pure HTML/CSS/JS — no Node runtime needed in production. This matters because the EC2 instance is small.

---

## Deployment architecture

```
User → mahbeer.in
        ↓
   Cloudflare (DNS + CDN + SSL + DDoS)
        ↓
   EC2 t2.micro (Ubuntu 24.04)
        ↓ port 80
   nginx (reverse proxy + static file serving)
        ↓
   Docker container
        └── nginx serving the static Next.js export
```

- **EC2 instance:** t2.micro (1 GB RAM, free tier)
- **Reverse proxy:** nginx on the host
- **Container:** Docker, runs nginx-alpine serving the built static files
- **DNS / SSL:** Cloudflare (free tier — proxied DNS, automatic SSL via Cloudflare's edge)
- **CI/CD (eventual):** GitHub Actions — on push to main, build the Docker image, push to a registry (Docker Hub or GHCR), then SSH to EC2 and pull + restart

### Important constraint

**Do not run `next build` on the EC2 t2.micro.** Next.js builds are memory-hungry and a 1 GB instance will OOM-kill the build. Always build the static export locally (or in CI), then ship the resulting `out/` directory inside a Docker image. The EC2 only runs nginx serving pre-built files.

---

## Repository structure (target)

```
mahbeer-portfolio/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx           # landing page (non-scrollable)
│   └── blogs/[slug]/      # dynamic blog routes from MDX
├── components/
│   ├── OrbitBackground.tsx    # the SVG orbit animation
│   ├── Nav.tsx                # top nav bar
│   ├── ExperienceModal.tsx
│   ├── ProjectsModal.tsx
│   ├── BlogsModal.tsx
│   └── ContactModal.tsx
├── content/
│   └── blogs/             # *.mdx files — adding a file adds a blog post
├── public/                # static assets (favicon, og-image)
├── lib/
│   └── blogs.ts          # helper to read MDX files
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml    # CI/CD pipeline (added later)
```

---

## Design preferences (carry over from previous portfolio iterations)

These are preferences I've established before — apply them unless I say otherwise:

- **No university listed anywhere**
- **No phone number listed anywhere**
- Hero shows "Muhammad" small above large bold "Mahbeer"
- Sentence case for everything (no Title Case, no ALL CAPS)
- Two font weights max (regular + medium/semibold) — don't use heavy 700/800 weights
- Generous whitespace, low information density on the landing page
- One accent color only — the rest is grayscale

---

## Conventions for Claude Code

When working on this project:

1. **Always show me exact terminal commands** with the directory I should run them in. I don't know to `cd` into a folder unless told.
2. **Explain what each file does** when creating it for the first time, in 1–2 lines.
3. **Don't introduce dependencies casually.** If you want to add a new npm package, tell me what it does and why before installing.
4. **Commit messages:** use conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).
5. **Don't run `next build` for production deploys** — see EC2 constraint above.
6. **Browser storage (localStorage/sessionStorage)** is fine here since this is deployed on real infra, not Claude artifacts.
7. **When adding a blog post,** the workflow is: create `content/blogs/<slug>.mdx`, push to git, redeploy. No other code changes should be needed.

---

## What's already done / what's next

**Status:** project not yet started. First step is scaffolding the Next.js + Tailwind project with the landing page and orbit animation.

**Roadmap:**

1. ☐ Scaffold Next.js 14 + TypeScript + Tailwind project
2. ☐ Build landing page (nav + hero + orbit animation)
3. ☐ Add modal/drawer system for nav links
4. ☐ Wire up MDX-based blog system
5. ☐ Fill in Experience and Projects content
6. ☐ Write Dockerfile + nginx config
7. ☐ Buy mahbeer.in domain
8. ☐ Provision EC2 t2.micro, install Docker + nginx
9. ☐ Set up Cloudflare DNS pointing to EC2
10. ☐ First manual deploy
11. ☐ GitHub Actions CI/CD pipeline

---

## Content I'll be adding (so you know what to leave placeholder space for)

- **Experience:** AlMuqeet Systems, iQuasar LLC
- **Projects:** at least three — likely EKS CI/CD pipeline, Kubernetes observability stack, CloudFront benchmark (carrying over from previous portfolio)
- **Skills:** CI/CD (Jenkins, GitHub Actions), IaC (Terraform, Ansible), containers (Docker, Kubernetes), monitoring (Zabbix, Prometheus, Grafana, Loki), cloud (AWS), scripting
- **Certifications:** AWS Cloud Practitioner, three Google/Coursera ML credentials
- **Blogs:** none yet, structure should support them

---

## Things to NOT do

- Don't add a CMS (no Sanity, Contentful, etc.) — MDX files in the repo are the source of truth
- Don't make the landing page scrollable
- Don't use heavy 3D libraries (three.js, react-three-fiber) for the orbit — SVG + Framer Motion only
- Don't add analytics, popups, cookie banners, or anything that clutters the minimalist aesthetic
- Don't list my phone number or university anywhere
