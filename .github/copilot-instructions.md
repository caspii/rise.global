# Rise Global Jekyll Site - GitHub Copilot Instructions

**ALWAYS** follow these instructions first and only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.

## Project Overview

Rise Global is a Jekyll static website that serves as a landing page for the discontinued rise.global service. The site informs visitors about the service shutdown on May 28th, 2025, and recommends Leaderboarded as an alternative solution.

## Repository Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts (default.html, post.html)
├── _includes/           # Reusable components (navigation.html, footer.html)
├── _posts/              # Blog posts (10 markdown files)
├── assets/
│   ├── css/main.css     # Main stylesheet (582 lines)
│   └── images/blog/     # Blog post images
├── index.html           # Homepage
├── blog.html            # Blog listing page
├── 404.html            # Custom 404 error page
├── robots.txt          # SEO robots file
├── Gemfile             # Ruby dependencies
└── .github/workflows/jekyll.yml  # GitHub Actions deployment
```

## Working Effectively

### Prerequisites and Setup

Install Ruby, Bundler, and dependencies:
```bash
# Ruby 3.2+ required (check with: ruby --version)
# Install bundler if not available
gem install bundler --user-install
export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"

# Configure bundle to install locally to avoid permission issues
bundle config set --local path vendor/bundle

# Install dependencies - NEVER CANCEL: Takes 2-3 minutes on first run
bundle install
```

**NEVER CANCEL** the `bundle install` command - it takes 15-20 seconds to complete on the first run with clean environment. Use a timeout of 3+ minutes to be safe.

### Building and Running

Build the site:
```bash
# Build for production - NEVER CANCEL: Takes <1 second, very fast
bundle exec jekyll build

# Validate site health - NEVER CANCEL: Takes <1 second
bundle exec jekyll doctor
```

Run development server:
```bash
# Start development server - accessible at http://localhost:4000
bundle exec jekyll serve --host 0.0.0.0 --port 4000

# Server starts in <1 second, auto-regenerates on file changes
# Press Ctrl+C to stop
```

## Validation Requirements

**ALWAYS** run these validation steps after making any changes:

### 1. Build Validation
```bash
# Clean build test
bundle exec jekyll clean
bundle exec jekyll build
bundle exec jekyll doctor
```

### 2. Development Server Test
```bash
# Start server and test accessibility
bundle exec jekyll serve --host 0.0.0.0 --port 4000 &
sleep 3
curl -s -w "Status: %{http_code}\n" http://localhost:4000/ | head -1
pkill -f jekyll
```

### 3. Comprehensive Functionality Test
```bash
# Test all critical endpoints (run while server is active)
echo "=== Testing Homepage ==="
curl -s -w "Status: %{http_code}, Size: %{size_download}\n" http://localhost:4000/ | tail -1

echo "=== Testing Blog ==="
curl -s -w "Status: %{http_code}, Size: %{size_download}\n" http://localhost:4000/blog/ | tail -1

echo "=== Testing Sample Post ==="
curl -s -w "Status: %{http_code}, Size: %{size_download}\n" http://localhost:4000/2025/09/15/how-to-run-hackathon-points-badges-leaderboards/ | tail -1

echo "=== Testing 404 Page ==="
curl -s -w "Status: %{http_code}, Size: %{size_download}\n" http://localhost:4000/nonexistent | tail -1

echo "=== Testing Sitemap ==="
curl -s -w "Status: %{http_code}, Size: %{size_download}\n" http://localhost:4000/sitemap.xml | tail -1

echo "=== Testing RSS Feed ==="
curl -s -w "Status: %{http_code}, Size: %{size_download}\n" http://localhost:4000/feed.xml | tail -1
```

Expected results:
- Homepage: Status 200, Size ~15,000 bytes
- Blog: Status 200, Size ~19,000 bytes
- Sample Post: Status 200, Size ~40,000 bytes
- 404 Page: Status 404, Size ~9,000 bytes
- Sitemap: Status 200, Size ~1,900 bytes
- RSS Feed: Status 200, Size ~250,000 bytes

### 4. Manual Functional Testing
**ALWAYS** manually validate these critical user scenarios after changes:

1. **Homepage Load Test**: Visit http://localhost:4000/ and verify:
   - Page loads completely without errors
   - Rise Global branding appears in title
   - Shutdown notice is visible
   - Links to Leaderboarded are present and functional
   - CSS styling renders correctly

2. **Blog Functionality Test**: Visit http://localhost:4000/blog/ and verify:
   - Blog listing displays all posts
   - Post excerpts and dates show correctly
   - Individual post links work

3. **Blog Post Test**: Visit any blog post URL (e.g., http://localhost:4000/2025/09/15/how-to-run-hackathon-points-badges-leaderboards/) and verify:
   - Post content renders with proper formatting
   - Navigation works
   - Footer displays

4. **SEO Features Test**:
   - Check http://localhost:4000/sitemap.xml returns valid XML
   - Check http://localhost:4000/feed.xml returns valid RSS feed
   - Check http://localhost:4000/nonexistent-page returns 404 with redirect message

## Common Operations

### Making Content Changes
- **Blog posts**: Edit files in `_posts/` using Jekyll front matter format
- **Homepage**: Edit `index.html`
- **Global styling**: Edit `assets/css/main.css`
- **Site configuration**: Edit `_config.yml`

### Adding New Blog Posts
```bash
# Create new post file with Jekyll naming convention
touch _posts/$(date +"%Y-%m-%d")-your-post-title.md

# Use this template:
---
layout: post
title: "Your Post Title"
date: 2025-XX-XX
excerpt: "Brief description"
---

Your content here...
```

### Testing GitHub Actions Workflow
The site auto-deploys via GitHub Actions when pushing to `main` branch. The workflow:
- Uses Ruby 3.1
- Runs `bundle install` with cache
- Builds with `bundle exec jekyll build`
- Deploys to GitHub Pages

## Critical Warnings

### Build Times and Timeouts
- **NEVER CANCEL** `bundle install`: Takes 15-20 seconds first run (clean environment), use 3+ minute timeout
- **NEVER CANCEL** `jekyll build`: Takes <1 second, very fast
- **NEVER CANCEL** `jekyll serve`: Starts in <1 second
- **NEVER CANCEL** `jekyll doctor`: Takes <1 second

### Path Configuration
Always set the Ruby path when using bundler:
```bash
export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
```

### Local Development Setup
Always configure bundle to install locally:
```bash
bundle config set --local path vendor/bundle
```

## No Testing Infrastructure
This repository has **NO** automated testing infrastructure:
- No test files or test directories
- No linting tools configured
- No CI testing beyond build validation
- Use manual validation scenarios listed above

## No Build Tools Beyond Jekyll
- No package.json or npm dependencies
- No custom build scripts
- No additional linting or validation tools
- Jekyll's built-in `doctor` command is the only validation tool

## Troubleshooting

### Bundle Install Permission Errors
If you see gem permission errors:
```bash
bundle config set --local path vendor/bundle
bundle install
```

### Jekyll Command Not Found
```bash
export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
```

### Build Failures
1. Check Ruby version: `ruby --version` (needs 3.2+)
2. Run Jekyll doctor: `bundle exec jekyll doctor`
3. Clean and rebuild: `bundle exec jekyll clean && bundle exec jekyll build`

## Key Files for Common Tasks

- **Site title/description**: `_config.yml`
- **Homepage content**: `index.html`
- **Navigation menu**: `_includes/navigation.html`
- **Footer content**: `_includes/footer.html`
- **Blog layout**: `_layouts/post.html`
- **Main styling**: `assets/css/main.css`
- **404 page**: `404.html`

## Deployment

Deployment is fully automated:
- Push to `main` branch triggers GitHub Actions
- Workflow builds and deploys to GitHub Pages automatically
- Site is live at https://rise.global
- No manual deployment steps required

## Important Notes

- This is a **static site** - no server-side processing
- All content is pre-built during Jekyll build process
- Site focuses on **professional shutdown messaging** and **Leaderboarded recommendations**
- **No automatic redirects** - visitors choose when to visit Leaderboarded
- All outbound links include UTM parameters for tracking