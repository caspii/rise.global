# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll static website for **Rise** (rise.global), a pre-launch/waitlist site for a modern tournament bracket platform. The primary CTA is the waitlist at `/waitlist/`, with a secondary CTA pointing to the free bracket tool. Brand voice is energetic, not corporate: "Rise. Compete. Win."

## Development Commands

```bash
# Install dependencies
bundle install

# Run development server (accessible at http://localhost:4000)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

## Architecture

- Main configuration in `_config.yml`
- Homepage content in `index.html`
- Custom 404 page
- SEO optimization via jekyll-seo-tag and jekyll-sitemap plugins
- Analytics tracking (Fathom and Ahrefs)

### Design System

- Fonts: Outfit (headings) + Plus Jakarta Sans (body text)
- Palette: dark navy, lime, coral
- CSS variables defined in `assets/css/main.css`
- Fonts imported in `_layouts/default.html` and `_layouts/tool.html`

### Reusable Includes

- `waitlist-form.html` — waitlist signup form
- `coming-soon-badge.html` — "coming soon" badge component

### Documentation

These files are excluded from the Jekyll build:
- `POSITIONING.md` — brand positioning and messaging
- `MOCKUPS.md` — page mockup descriptions
- `IMAGE-PROMPTS.md` — image generation prompts

### Redirects

Old backlinked URLs that no longer exist are handled via redirect pages in `/redirects/`.

## Deployment

Deployment is automated via GitHub Actions:
- Push to `main` branch triggers automatic build and deployment
- Site is served via GitHub Pages at rise.global
- No manual deployment steps required

## Content Writing Guidelines

When creating blog posts or content for this site:

### Writing Style

- Prefer narrative, flowing prose over excessive enumerations
- Avoid enumeration-heavy content with long lists of bullet points or numbered items
- Use bullet points sparingly and only when they genuinely improve readability
- Transform lists into coherent paragraphs that connect ideas naturally
- Keep the text professional, readable, and engaging

### When Lists Are Acceptable

- Short, essential lists (3-4 items max) where enumeration adds clarity
- Technical specifications or requirements where precision matters
- Direct comparisons that benefit from parallel structure

### General Approach

- Write in a conversational yet professional tone
- Connect ideas with transitions rather than separating them into lists
- Group related concepts into flowing paragraphs
- Use subheadings to organize content instead of relying on numbered sections

## Image Generation Guidelines

There are two distinct image types used on Rise. Always identify which type an image is before generating it — they have completely different styles.

---

### Type 1: Schematic Images

Used for: brackets, tournament schedules, standings tables, leaderboards, gamification element diagrams, UI/data visualizations.

These use the **Rise brand style** — dark, bold, graphic illustration derived from the site's design system.

**Color palette (strict):**
- Background: deep navy `#0a0e1a` to `#141832` — always dark
- Primary accent: electric lime `#c8ff00` — for key data, lines, UI elements, highlights
- Secondary accent: hot coral `#ff4d6a` — sparingly, one element per image (e.g. the #1 rank, champion slot)
- Text/labels: white on dark
- Never use rainbow, pastel, or colors outside this palette

**Style rules:**
- Flat graphic / bold infographic illustration — clean geometric shapes, strong outlines
- No gradients, no textures, no drop shadows, no cartoon aesthetics
- Data/UI elements should look like real dark-mode interfaces
- Generous dark negative space — compositions breathe

**Mood:** Competitive, sharp, modern, confident. "Rise. Compete. Win."

**Prompt template:**
> "Flat graphic illustration on a deep navy dark background (#0a0e1a). [Description using electric lime (#c8ff00) for key elements and hot coral (#ff4d6a) for one accent]. No gradients, no cartoon style, no rainbow colors. Bold, minimal, dark mode sports graphic aesthetic. Wide landscape format."

**Examples:** bracket diagrams, round robin schedule grids, leaderboard UIs, gamification badge/XP layouts.

---

### Type 2: Scene / Use-Case Images

Used for: hero images showing real activities, people competing, product in action at an event, workplace environments.

These are **photorealistic** — they depict actual situations, not data or UI.

**Style rules:**
- Photorealistic photography aesthetic
- Natural lighting appropriate to the setting (outdoor daylight, indoor office light)
- Real people in authentic situations — diverse, candid, active
- High production quality: sharp focus, good composition, cinematic feel
- No brand color palette constraints — colors should be natural to the scene

**Mood:** Authentic, energetic, human. Show real competition and real stakes.

**Prompt template:**
> "Photorealistic [scene description]. [Lighting and environment details]. Authentic, candid atmosphere. High production quality, sharp focus. Wide landscape format."

**Examples:** cornhole tournament on a lawn, office team looking at a screen, athletes competing, event setup shots.

---

### Image Specifications

- Format: landscape (wide)
- Save all images to `/assets/images/` directory
- Use `.png` for schematic/diagram images, `.jpg` for scene/photorealistic images
