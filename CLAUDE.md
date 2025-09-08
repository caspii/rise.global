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