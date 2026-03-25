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

When generating images for blog posts or content:

### Visual Style

- Always use a bright, colorful cartoon illustration style
- Use clean lines and vibrant colors
- Set style to "vivid" for all image generations
- Maintain consistency across all images on the site

### Image Specifications

- Size: 1792x1024 (landscape format)
- Quality: HD
- Style: vivid
- Save all images to `/assets/images/` directory

### Content Guidelines

- Images should be relevant to the blog post topic
- Include diverse representation when showing people
- Use motivational and positive atmospheres
- Keep designs clean and professional despite cartoonish style
