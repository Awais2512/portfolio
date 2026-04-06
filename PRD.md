# Product Requirements Document
## Muhammad Awais — AI Engineer Portfolio Website

| Field   | Value             |
|---------|-------------------|
| Version | 1.0               |
| Date    | April 6, 2026     |
| Author  | Muhammad Awais    |
| Status  | Draft             |

---

## 1. Executive Summary

This PRD defines the requirements for Muhammad Awais's personal portfolio website — a minimal, dark-themed, developer-focused site designed to showcase AI engineering expertise, production projects, and technical capabilities to prospective employers and freelance clients.

The portfolio will serve as the primary digital presence for job applications and client acquisition, featuring interactive project demos, a technical blog, and integrated contact/booking functionality.

---

## 2. Product Overview

### 2.1 Vision

A sleek, high-performance portfolio that positions Muhammad Awais as a production-grade AI engineer — not just another developer with a resume. Every element should communicate: "I build AI systems that ship and scale."

### 2.2 Target Audience

- **Recruiters & Hiring Managers:** CTOs and engineering leads evaluating AI engineering candidates for full-time roles.
- **Freelance Clients:** Founders and product managers seeking an AI engineer who can own the full pipeline from design to deployment.
- **Technical Peers:** Fellow engineers and AI practitioners discovering the site through blog content or GitHub.

### 2.3 Success Metrics

| Metric                        | Target                 | Measurement       |
|-------------------------------|------------------------|--------------------|
| Monthly unique visitors       | 500+ within 3 months   | Vercel Analytics   |
| Contact form submissions      | 10+ per month          | Resend dashboard   |
| Blog post frequency           | 2–4 posts/month        | Content calendar   |
| Lighthouse performance score  | 95+                    | Lighthouse CI      |
| Average time on site          | 2+ minutes             | Vercel Analytics   |

---

## 3. Technology Stack

The tech stack is selected to align with Muhammad's existing production experience while maximizing performance, developer experience, and zero-cost deployment.

| Layer           | Technology              | Rationale                                                                 |
|-----------------|-------------------------|---------------------------------------------------------------------------|
| Framework       | Next.js 14 (App Router) | SSG for speed, API routes for backend logic, already in Awais's stack     |
| Styling         | Tailwind CSS            | Utility-first, perfect for dark-theme developer aesthetics                |
| Animations      | Framer Motion           | Smooth section reveals, hover effects, typing animations                  |
| Blog Content    | MDX                     | Markdown with embedded React components for interactive code demos        |
| Email           | Resend                  | Free tier, developer-friendly API for contact form submissions            |
| Calendar        | Cal.com (embed)         | Open-source scheduling, embeddable widget, no backend needed              |
| Deployment      | Vercel                  | Zero-config for Next.js, free tier, analytics, preview deploys            |
| Analytics       | Vercel Analytics        | Privacy-friendly, built-in, no extra setup                                |
| Version Control | GitHub                  | Source control, CI/CD integration with Vercel                             |

---

## 4. Information Architecture & Sitemap

The site follows a single-page scrolling architecture with distinct sections, plus a separate route for individual blog posts. Navigation anchors enable smooth scrolling between sections.

### 4.1 Sitemap

| Route            | Section       | Purpose                                                              |
|------------------|---------------|----------------------------------------------------------------------|
| `/ #hero`        | Hero          | Name, title, tagline, CTA buttons (View Work / Contact Me)          |
| `/ #about`       | About         | Professional summary, key stats, profile photo                       |
| `/ #experience`  | Experience    | Work timeline with company, role, and key achievements               |
| `/ #projects`    | Projects      | Interactive project showcase with live demos, descriptions, tech tags|
| `/ #skills`      | Skills        | Categorized tech skills with visual indicators                       |
| `/ #blog`        | Blog Preview  | Latest 3 blog posts with read more links                            |
| `/ #contact`     | Contact       | Contact form + Cal.com calendar embed + social links                 |
| `/blog`          | Blog Index    | All blog posts with search/filter by tag                             |
| `/blog/[slug]`   | Blog Post     | Individual MDX-rendered blog post with TOC                           |

---

## 5. Page-by-Page Specifications

### 5.1 Hero Section

The hero is the first impression. It should communicate **who you are, what you do, and what you want** within 3 seconds.

- **Headline:** "Muhammad Awais" with a subtle typing animation effect
- **Subtitle:** "AI Engineer | Building Production-Grade AI Systems"
- **CTA Buttons:** "View My Work" (scroll to projects) and "Get In Touch" (scroll to contact)
- **Background:** Dark gradient (#1A1A2E to #16213E) with subtle animated particle/grid effect
- **Social Links:** GitHub, LinkedIn, Email icons in the hero area

### 5.2 About Section

- Professional summary adapted from resume (rewritten for first-person, conversational tone)
- Key impact metrics displayed as animated counters: "2.5+ Years Experience", "10+ APIs Integrated", "90% Automation Achieved", "6+ Production Projects"
- Brief paragraph on professional philosophy and approach

### 5.3 Experience Timeline

- Vertical timeline layout with company logos/icons on alternating sides
- Each entry shows: role title, company name, date range, 2–3 key bullet points
- Entries animate in on scroll (Framer Motion stagger effect)
- Two entries: MindRind (Sep 2024 – Present) and Sakonnet Systems (Nov 2023 – Jul 2024)

### 5.4 Projects Showcase

This is the most critical section — it's where the portfolio proves competence.

- **Layout:** Card grid (2 columns on desktop, 1 on mobile) with hover effects
- **Each Card Contains:** Project name, one-line description, tech stack tags, impact metric badge, "View Demo" and "View Code" buttons
- **Interactive Demos:** Embedded iframe or modal showcasing live project interactions where possible
- **Featured Projects:**
  - FinanceGPT — LLM Inference System for Financial Applications
  - RankForge — White-Label SEO & PPC Reporting SaaS Platform
  - Smart Reply Engine — AI-Powered Social Media Automation
  - AI Voice Appointment Setter — Voice-based scheduling agent
  - AI Appointment Booking Chatbot — RAG-powered booking system
  - Meeting-to-Tasks Automation — Transcript-to-Jira pipeline

### 5.5 Skills Section

- Categorized skill groups matching resume: AI & LLMs, Backend & APIs, Automation, Data & Infra, Frontend
- Each skill shown as a pill/badge with subtle hover glow effect
- Optional: animated skill constellation or network graph for visual impact

### 5.6 Blog Section

- **Homepage Preview:** Latest 3 posts displayed as cards with title, date, reading time, and tags
- **Blog Index (`/blog`):** Full post listing with tag-based filtering and search
- **Blog Post (`/blog/[slug]`):** MDX-rendered content with auto-generated table of contents, code syntax highlighting (Shiki), copy-to-clipboard on code blocks, reading progress bar

### 5.7 Contact Section

- **Contact Form:** Name, email, subject, message fields → submitted via Resend API route
- **Calendar Embed:** Cal.com widget for scheduling 30-min consultation calls
- **Social Links:** GitHub, LinkedIn, and email with copy-to-clipboard
- **Location Note:** "Based in Lahore, Pakistan — Available for remote work worldwide"

---

## 6. Design System

### 6.1 Color Palette

| Token              | Hex Value | Usage                                        |
|--------------------|-----------|----------------------------------------------|
| `--bg-primary`     | `#0A0A0F` | Main background                              |
| `--bg-secondary`   | `#1A1A2E` | Card backgrounds, sections                   |
| `--bg-tertiary`    | `#16213E` | Hover states, elevated elements              |
| `--accent-primary` | `#16C79A` | CTAs, highlights, active states (teal/green)  |
| `--accent-secondary`| `#0F3460`| Headings, secondary interactive elements     |
| `--text-primary`   | `#E4E4E7` | Primary body text                            |
| `--text-secondary` | `#A1A1AA` | Secondary/muted text                         |
| `--text-tertiary`  | `#71717A` | Captions, timestamps                         |

### 6.2 Typography

| Element          | Font           | Size      | Weight            |
|------------------|----------------|-----------|-------------------|
| Display / Name   | Inter          | 48–60px   | 800 (Extra Bold)  |
| H1 (Section)     | Inter          | 32–36px   | 700 (Bold)        |
| H2 (Subsection)  | Inter          | 24–28px   | 600 (Semi Bold)   |
| Body             | Inter          | 16–18px   | 400 (Regular)     |
| Code / Mono      | JetBrains Mono | 14–16px   | 400 (Regular)     |
| Caption          | Inter          | 12–14px   | 400 (Regular)     |

### 6.3 Spacing & Layout

- 8px base grid system
- Section padding: 80px–120px vertical, responsive
- Max content width: 1200px, centered
- Card border-radius: 12px with subtle border (`1px rgba(255,255,255,0.1)`)
- Consistent 24px gap between grid items

---

## 7. Responsive Design

| Breakpoint | Width        | Layout Changes                                                   |
|------------|--------------|------------------------------------------------------------------|
| Mobile     | < 640px      | Single column, hamburger nav, stacked cards, smaller type scale  |
| Tablet     | 640–1024px   | Two-column project grid, side navigation visible                 |
| Desktop    | > 1024px     | Full layout, timeline alternating, all animations active         |

---

## 8. SEO & Performance Requirements

### 8.1 SEO

- Dynamic meta tags per page/post (title, description, Open Graph, Twitter Card)
- Structured data (JSON-LD) for Person schema and BlogPosting schema
- Auto-generated `sitemap.xml` and `robots.txt` via Next.js
- Canonical URLs on all pages
- Alt text on all images

### 8.2 Performance Targets

- Lighthouse Score: 95+ across Performance, Accessibility, Best Practices, SEO
- First Contentful Paint (FCP): < 1.2s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total bundle size: < 200KB (gzipped, first load)
- All images served via `next/image` with WebP and lazy loading

---

## 9. Development Phases & Timeline

### Phase 1: Foundation (Week 1–2)

1. Initialize Next.js 14 project with TypeScript, Tailwind CSS, Framer Motion
2. Set up project structure, ESLint, Prettier, Husky pre-commit hooks
3. Implement dark theme design system (colors, typography, spacing tokens)
4. Build responsive navigation with smooth scroll anchors
5. Create Hero section with typing animation and particle background
6. Build About section with animated counters

### Phase 2: Core Sections (Week 3–4)

1. Build Experience timeline with scroll-triggered animations
2. Create Projects showcase with card grid, filtering, and hover effects
3. Build Skills section with categorized pill badges
4. Implement Contact form with Resend API route
5. Embed Cal.com scheduling widget

### Phase 3: Blog & Polish (Week 5–6)

1. Set up MDX pipeline with `next-mdx-remote`
2. Build blog index page with tag filtering
3. Create blog post template with TOC, syntax highlighting (Shiki), reading progress
4. Write 2–3 initial blog posts (e.g., "Building RAG Systems", "Multi-Agent Orchestration")
5. Add SEO (meta tags, JSON-LD, sitemap, robots.txt)

### Phase 4: Launch (Week 7)

1. Performance audit and optimization (Lighthouse, bundle analysis)
2. Cross-browser and responsive testing
3. Deploy to Vercel with custom domain
4. Set up Vercel Analytics
5. Submit sitemap to Google Search Console

---

## 10. Project Structure

```
awais-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── api/contact/route.ts
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   └── Navigation.tsx
├── content/blog/
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   └── skills.ts
├── lib/
│   ├── mdx.ts
│   └── utils.ts
├── public/
└── styles/globals.css
```

---

## 11. Key Dependencies

| Package              | Purpose                 | Version |
|----------------------|-------------------------|---------|
| `next`               | Core framework          | 14.x    |
| `tailwindcss`        | Utility-first CSS       | 3.x     |
| `framer-motion`      | Animations              | 11.x    |
| `next-mdx-remote`    | MDX processing          | 5.x     |
| `shiki`              | Syntax highlighting     | 1.x     |
| `resend`             | Email API               | 3.x     |
| `@cal.com/embed-react` | Calendar booking      | Latest  |
| `react-icons`        | Icon library            | 5.x     |
| `gray-matter`        | MDX frontmatter parsing | 4.x     |

---

## 12. Risks & Mitigations

| Risk                                  | Impact | Mitigation                                                          |
|---------------------------------------|--------|---------------------------------------------------------------------|
| Interactive demos increase load time  | High   | Lazy-load iframes, use loading skeletons, defer non-critical JS     |
| Contact form spam                     | Medium | Implement honeypot field + rate limiting on API route               |
| Blog content stagnation               | Medium | Maintain a content calendar, repurpose project learnings as posts   |
| Dark theme accessibility              | Medium | Ensure WCAG AA contrast ratios, test with axe-core                  |
| Cal.com embed breaking changes        | Low    | Pin version, provide fallback booking link                          |

---

## 13. Future Enhancements (V2)

These features are out of scope for the initial launch but should be considered for future iterations:

- AI-powered chatbot on the site (using Awais's own RAG system) that answers questions about his experience
- Dark/light theme toggle (though dark-first is the brand identity)
- Case study pages with detailed project breakdowns, architecture diagrams, and metrics
- Newsletter subscription with weekly AI engineering insights
- Internationalization (Urdu language support)
- Testimonials/recommendations section (once client reviews are collected)

---

## 14. Document Approval

| Role     | Signature      | Date           |
|----------|----------------|----------------|
| Author   | Muhammad Awais | April 6, 2026  |
| Reviewer |                |                |