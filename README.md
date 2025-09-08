# Rise Global - Landing Page

A Jekyll-based landing page for rise.global domain, informing visitors about the service discontinuation and recommending Leaderboarded as an alternative.

## Overview

This repository contains the source code for the Rise Global landing page, built with Jekyll and designed to be hosted on GitHub Pages.

## Features

- Clean, professional design with shutdown notice
- SEO-optimized content to maintain search rankings
- Mobile-responsive layout
- Automatic deployment via GitHub Actions
- No automatic redirects - visitors choose when to visit Leaderboarded

## Local Development

### Prerequisites

- Ruby (version 2.5 or higher)
- Bundler gem (`gem install bundler`)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/rise.global.git
   cd rise.global
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser to http://localhost:4000

## Deployment

The site is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

1. Push your changes to GitHub
2. Go to Settings → Pages in your repository
3. Select "GitHub Actions" as the source
4. The site will be available at `https://[your-username].github.io/rise.global/`

To use with the custom domain:
1. Add a `CNAME` file with `www.rise.global` as its content
2. Configure your domain's DNS settings to point to GitHub Pages

## Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts
├── _includes/           # Reusable components
├── assets/
│   └── css/
│       └── main.css     # Main stylesheet
├── index.html           # Homepage
├── 404.html            # 404 error page
├── robots.txt          # SEO robots file
└── Gemfile             # Ruby dependencies
```

## Technologies

- Jekyll 4.3
- GitHub Pages
- GitHub Actions for CI/CD
- Poppins & DM Sans fonts
- Responsive CSS Grid

## License

This project is proprietary and confidential.

## Contact

For questions about this repository, please contact the domain owner.
