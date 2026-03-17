# Rise Global - Free Online Tools

A Jekyll-based site hosting free, client-side tools for teams, teachers, and event organizers. Built to leverage rise.global's existing domain authority.

## Overview

This repository contains the source code for rise.global, which provides free browser-based tools including a Random Team Generator, Spin the Wheel, and Tournament Bracket Generator.

## Features

- Three free client-side tools (no server required)
- SEO-optimized pages with JSON-LD FAQ schema
- Mobile-responsive layout
- Automatic deployment via GitHub Actions
- Fathom and Ahrefs analytics with event tracking

## Local Development

### Prerequisites

- Ruby (version 2.5 or higher)
- Bundler gem (`gem install bundler`)
- Node.js (for running tests)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/caspii/rise.global.git
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

## Testing

The test suite uses Node.js's built-in test runner (no additional dependencies needed). Tests cover the Jekyll build output, HTML structure, CSS, and JavaScript tool logic.

```bash
# Run all tests
node --test test/*.test.js
```

### Test files

- `test/build.test.js` — Builds the Jekyll site and verifies all pages, assets, navigation, footer, 404, SEO elements, and analytics are correctly generated
- `test/tools-common.test.js` — Unit tests for shared JS utilities (parseNames, shuffleArray, URL state encoding, trackEvent)
- `test/team-generator.test.js` — Unit tests for random team generator logic (team distribution, balancing, edge cases, HTML escaping)
- `test/bracket-generator.test.js` — Unit tests for tournament bracket generator (bracket structure, byes, winner selection, downstream clearing, zoom, SVG rendering)

## Deployment

The site is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

## Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts (default, post, tool)
├── _includes/           # Reusable components (nav, footer)
├── assets/
│   ├── css/
│   │   ├── main.css     # Main stylesheet
│   │   └── tools.css    # Tool page styles
│   └── js/
│       ├── tools-common.js      # Shared JS utilities
│       ├── team-generator.js    # Random team generator
│       ├── spin-wheel.js        # Spin the wheel
│       └── bracket-generator.js # Tournament bracket generator
├── tools/
│   ├── index.html                       # Tools listing page
│   ├── random-team-generator/index.html
│   ├── spin-the-wheel/index.html
│   └── tournament-bracket-generator/index.html
├── test/                # Test suite
├── index.html           # Homepage
├── 404.html             # 404 error page
└── Gemfile              # Ruby dependencies
```

## Technologies

- Jekyll 4.3
- GitHub Pages
- GitHub Actions for CI/CD
- Poppins & DM Sans fonts
- Responsive CSS Grid
- Vanilla JavaScript (no frameworks)

## License

This project is proprietary and confidential.

## Contact

For questions about this repository, please contact the domain owner.
