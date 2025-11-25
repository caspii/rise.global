# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll static website that serves as a landing page for the discontinued rise.global service. The site informs visitors about the service shutdown and recommends Leaderboarded as an alternative.

Some links on the internet point to pages which no longer exist.

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

The site is a single-page Jekyll application with:
- Main configuration in `_config.yml`
- Homepage content in `index.html`
- Custom 404 page with 5-second delayed redirect
- SEO optimization via jekyll-seo-tag and jekyll-sitemap plugins
- Analytics tracking (Fathom and Ahrefs)
- UTM parameters on all outbound links to Leaderboarded

## Deployment

Deployment is automated via GitHub Actions:
- Push to `main` branch triggers automatic build and deployment
- Site is served via GitHub Pages at rise.global
- No manual deployment steps required

## Key Implementation Details

- All styling is in `assets/css/main.css`
- Fonts: Poppins (headings) and DM Sans (body text)
- Mobile-responsive design using CSS Grid
- No JavaScript framework - pure HTML/CSS
- Professional shutdown messaging without automatic redirects

## Content Writing Guidelines

When creating blog posts or content for this site:

**Writing Style:**
- Prefer narrative, flowing prose over excessive enumerations
- Avoid enumeration-heavy content with long lists of bullet points or numbered items
- Use bullet points sparingly and only when they genuinely improve readability
- Transform lists into coherent paragraphs that connect ideas naturally
- Keep the text professional, readable, and engaging

**When Lists Are Acceptable:**
- Short, essential lists (3-4 items max) where enumeration adds clarity
- Technical specifications or requirements where precision matters
- Direct comparisons that benefit from parallel structure

**General Approach:**
- Write in a conversational yet professional tone
- Connect ideas with transitions rather than separating them into lists
- Group related concepts into flowing paragraphs
- Use subheadings to organize content instead of relying on numbered sections

## Image Generation Guidelines

When generating images for blog posts or content:

**Visual Style:**
- Always use a bright, colorful cartoon illustration style
- Use clean lines and vibrant colors
- Set style to "vivid" for all image generations
- Maintain consistency across all images on the site

**Image Specifications:**
- Size: 1792x1024 (landscape format)
- Quality: HD
- Style: vivid
- Save all images to `/assets/images/` directory

**Content Guidelines:**
- Images should be relevant to the blog post topic
- Include diverse representation when showing people
- Use motivational and positive atmospheres
- Keep designs clean and professional despite cartoonish style