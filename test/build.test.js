const { describe, it, before } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const SITE_DIR = path.join(__dirname, '..', '_site');

// Build the site once before all tests
before(() => {
    execSync('bundle exec jekyll build', {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
    });
});

function readSiteFile(relativePath) {
    return fs.readFileSync(path.join(SITE_DIR, relativePath), 'utf8');
}

function siteFileExists(relativePath) {
    return fs.existsSync(path.join(SITE_DIR, relativePath));
}

// ─── Build & Page Generation ──────────────────────────────────

describe('Jekyll Build', () => {
    it('produces a _site directory', () => {
        assert.ok(fs.existsSync(SITE_DIR));
    });
});

describe('Page Generation', () => {
    const expectedPages = [
        'index.html',
        '404.html',
        'tools/index.html',
        'tools/random-team-generator/index.html',
        'tools/spin-the-wheel/index.html',
        'tools/tournament-bracket-generator/index.html',
        'sitemap.xml',
    ];

    for (const page of expectedPages) {
        it(`generates ${page}`, () => {
            assert.ok(siteFileExists(page), `${page} should exist in _site`);
        });
    }
});

describe('Static Assets', () => {
    const expectedAssets = [
        'assets/css/main.css',
        'assets/css/tools.css',
        'assets/js/tools-common.js',
        'assets/js/team-generator.js',
        'assets/js/spin-wheel.js',
        'assets/js/bracket-generator.js',
    ];

    for (const asset of expectedAssets) {
        it(`includes ${asset}`, () => {
            assert.ok(siteFileExists(asset), `${asset} should exist in _site`);
        });
    }
});

// ─── Homepage ─────────────────────────────────────────────────

describe('Homepage', () => {
    let html;
    before(() => { html = readSiteFile('index.html'); });

    it('has the correct title', () => {
        assert.ok(html.includes('Free Online Tools for Teams, Teachers'));
    });

    it('contains tools showcase section', () => {
        assert.ok(html.includes('tools-showcase'));
    });

    it('links to all three tools', () => {
        assert.ok(html.includes('/tools/random-team-generator/'));
        assert.ok(html.includes('/tools/spin-the-wheel/'));
        assert.ok(html.includes('/tools/tournament-bracket-generator/'));
    });

    it('has use cases section', () => {
        assert.ok(html.includes('use-cases'));
    });

    it('has FAQ section with JSON-LD schema', () => {
        assert.ok(html.includes('FAQPage'));
        assert.ok(html.includes('application/ld+json'));
    });

    it('has Fathom analytics script', () => {
        assert.ok(html.includes('cdn.usefathom.com'));
        assert.ok(html.includes('NBGFDAWZ'));
    });

    it('has Ahrefs analytics script', () => {
        assert.ok(html.includes('analytics.ahrefs.com'));
    });

    it('analytics scripts are inside body tag', () => {
        const bodyClose = html.indexOf('</body>');
        const fathomScript = html.indexOf('cdn.usefathom.com');
        assert.ok(fathomScript < bodyClose, 'Fathom script should be before </body>');
    });

    it('contains Leaderboarded reference with UTM params', () => {
        assert.ok(html.includes('leaderboarded.com'));
        assert.ok(html.includes('utm_source=rise.global'));
    });

    it('does not contain shutdown language', () => {
        assert.ok(!html.includes('discontinued'));
        assert.ok(!html.includes('shut down'));
    });
});

// ─── Navigation ───────────────────────────────────────────────

describe('Navigation', () => {
    let html;
    before(() => { html = readSiteFile('index.html'); });

    it('has Home link', () => {
        assert.ok(html.includes('href="/"'));
    });

    it('has Tools link', () => {
        assert.ok(html.includes('href="/tools/"'));
    });

    it('has Blog link', () => {
        assert.ok(html.includes('href="/blog"'));
    });

    it('has Leaderboarded link (text style, not button)', () => {
        assert.ok(html.includes('nav-link-cta'));
        // Should NOT have the old nav-cta button class
        assert.ok(!html.includes('class="nav-cta"'));
    });

    it('has mobile menu toggle', () => {
        assert.ok(html.includes('mobile-menu-toggle'));
    });
});

// ─── Footer ───────────────────────────────────────────────────

describe('Footer', () => {
    let html;
    before(() => { html = readSiteFile('index.html'); });

    it('lists free tools', () => {
        assert.ok(html.includes('Free Tools'));
        assert.ok(html.includes('/tools/random-team-generator/'));
        assert.ok(html.includes('/tools/spin-the-wheel/'));
        assert.ok(html.includes('/tools/tournament-bracket-generator/'));
    });

    it('has 2026 copyright', () => {
        assert.ok(html.includes('2026'));
    });

    it('links to other projects', () => {
        assert.ok(html.includes('costcam.app'));
        assert.ok(html.includes('zip1.io'));
    });
});

// ─── 404 Page ─────────────────────────────────────────────────

describe('404 Page', () => {
    let html;
    before(() => { html = readSiteFile('404.html'); });

    it('does not auto-redirect', () => {
        assert.ok(!html.includes('setTimeout'));
        assert.ok(!html.includes('window.location.href'));
    });

    it('links to homepage', () => {
        assert.ok(html.includes('href="/"'));
    });

    it('links to tools', () => {
        assert.ok(html.includes('/tools/'));
        assert.ok(html.includes('/tools/random-team-generator/'));
    });
});

// ─── Tools Listing Page ───────────────────────────────────────

describe('Tools Listing Page', () => {
    let html;
    before(() => { html = readSiteFile('tools/index.html'); });

    it('has H1 with Free Online Tools', () => {
        assert.ok(html.includes('<h1'));
        assert.ok(html.includes('Free Online Tools'));
    });

    it('has detail cards for each tool', () => {
        assert.ok(html.includes('Random Team Generator'));
        assert.ok(html.includes('Spin the Wheel'));
        assert.ok(html.includes('Tournament Bracket Generator'));
    });

    it('uses tool-detail-cta buttons (not hero-primary-cta)', () => {
        assert.ok(html.includes('tool-detail-cta'));
        assert.ok(!html.includes('hero-primary-cta'));
    });
});

// ─── Random Team Generator ────────────────────────────────────

describe('Random Team Generator Page', () => {
    let html;
    before(() => { html = readSiteFile('tools/random-team-generator/index.html'); });

    it('has correct H1', () => {
        assert.match(html, /<h1[^>]*>Random Team Generator/);
    });

    it('has meta description', () => {
        assert.ok(html.includes('<meta name="description"'));
    });

    it('includes tool input area with textarea', () => {
        assert.ok(html.includes('names-input'));
        assert.ok(html.includes('<textarea'));
    });

    it('includes split mode options', () => {
        assert.ok(html.includes('split-mode'));
        assert.ok(html.includes('Number of teams'));
        assert.ok(html.includes('Team size'));
    });

    it('includes generate button', () => {
        assert.ok(html.includes('generate-btn'));
        assert.ok(html.includes('generateTeams'));
    });

    it('includes action buttons (copy, export, share)', () => {
        assert.ok(html.includes('copyResults'));
        assert.ok(html.includes('exportAsImage'));
        assert.ok(html.includes('shareLink'));
    });

    it('has JSON-LD FAQ schema', () => {
        assert.ok(html.includes('FAQPage'));
        assert.ok(html.includes('application/ld+json'));
    });

    it('has SEO content section', () => {
        assert.ok(html.includes('tool-seo-content'));
        assert.ok(html.includes('How to Use the Random Team Generator'));
    });

    it('has Leaderboarded CTA', () => {
        assert.ok(html.includes('Need Full Leaderboard Management'));
    });

    it('has cross-links to other tools', () => {
        assert.ok(html.includes('/tools/spin-the-wheel/'));
        assert.ok(html.includes('/tools/tournament-bracket-generator/'));
        // Cross-links section should link to other tools but not show a card for itself
        const crossLinksSection = html.substring(html.indexOf('tool-cross-links'));
        assert.ok(crossLinksSection.includes('cross-link-card'));
        assert.ok(crossLinksSection.includes('Spin the Wheel'));
        assert.ok(crossLinksSection.includes('Tournament Bracket'));
    });

    it('loads tools-common.js and team-generator.js', () => {
        assert.ok(html.includes('tools-common.js'));
        assert.ok(html.includes('team-generator.js'));
    });

    it('loads tools.css', () => {
        assert.ok(html.includes('tools.css'));
    });
});

// ─── Spin the Wheel ───────────────────────────────────────────

describe('Spin the Wheel Page', () => {
    let html;
    before(() => { html = readSiteFile('tools/spin-the-wheel/index.html'); });

    it('has correct H1', () => {
        assert.match(html, /<h1[^>]*>Spin the Wheel/);
    });

    it('has canvas element for wheel', () => {
        assert.ok(html.includes('wheel-canvas'));
        assert.ok(html.includes('<canvas'));
    });

    it('has spin button', () => {
        assert.ok(html.includes('spin-btn'));
        assert.ok(html.includes('spinWheel'));
    });

    it('has options textarea with default values', () => {
        assert.ok(html.includes('options-input'));
        assert.ok(html.includes('Pizza'));
    });

    it('has spin history section', () => {
        assert.ok(html.includes('spin-history'));
        assert.ok(html.includes('history-list'));
    });

    it('has JSON-LD FAQ schema', () => {
        assert.ok(html.includes('FAQPage'));
    });

    it('has SEO content section', () => {
        assert.ok(html.includes('tool-seo-content'));
    });

    it('loads spin-wheel.js', () => {
        assert.ok(html.includes('spin-wheel.js'));
    });

    it('has cross-links (not to itself)', () => {
        assert.ok(html.includes('/tools/random-team-generator/'));
        assert.ok(html.includes('/tools/tournament-bracket-generator/'));
    });
});

// ─── Tournament Bracket Generator ─────────────────────────────

describe('Tournament Bracket Generator Page', () => {
    let html;
    before(() => { html = readSiteFile('tools/tournament-bracket-generator/index.html'); });

    it('has correct H1', () => {
        assert.match(html, /<h1[^>]*>Tournament Bracket Generator/);
    });

    it('has participants textarea', () => {
        assert.ok(html.includes('bracket-names-input'));
    });

    it('has order option (random/seeded)', () => {
        assert.ok(html.includes('bracket-order'));
        assert.ok(html.includes('Random'));
        assert.ok(html.includes('Seeded'));
    });

    it('has generate button', () => {
        assert.ok(html.includes('generateBracket'));
    });

    it('has bracket output container', () => {
        assert.ok(html.includes('bracket-container'));
    });

    it('has zoom controls', () => {
        assert.ok(html.includes('bracket-zoom-controls'));
        assert.ok(html.includes('zoomBracket'));
    });

    it('has export, print, share buttons', () => {
        assert.ok(html.includes('exportBracketImage'));
        assert.ok(html.includes('printBracket'));
        assert.ok(html.includes('shareBracketLink'));
    });

    it('has reset winners button', () => {
        assert.ok(html.includes('resetBracket'));
    });

    it('has JSON-LD FAQ schema', () => {
        assert.ok(html.includes('FAQPage'));
    });

    it('loads bracket-generator.js', () => {
        assert.ok(html.includes('bracket-generator.js'));
    });
});

// ─── CSS ──────────────────────────────────────────────────────

describe('CSS', () => {
    let mainCss, toolsCss;
    before(() => {
        mainCss = readSiteFile('assets/css/main.css');
        toolsCss = readSiteFile('assets/css/tools.css');
    });

    it('main.css has tool card styles', () => {
        assert.ok(mainCss.includes('.tool-card'));
        assert.ok(mainCss.includes('.tools-showcase'));
    });

    it('main.css has tool-detail-cta style', () => {
        assert.ok(mainCss.includes('.tool-detail-cta'));
    });

    it('main.css has blog preview styles', () => {
        assert.ok(mainCss.includes('.blog-preview'));
    });

    it('main.css has nav-link-cta style', () => {
        assert.ok(mainCss.includes('.nav-link-cta'));
    });

    it('main.css has mobile responsive rules', () => {
        assert.ok(mainCss.includes('@media'));
        assert.ok(mainCss.includes('768px'));
    });

    it('tools.css has tool layout styles', () => {
        assert.ok(toolsCss.includes('.tool-container'));
        assert.ok(toolsCss.includes('.tool-input-area'));
        assert.ok(toolsCss.includes('.tool-output-area'));
    });

    it('tools.css has wheel styles', () => {
        assert.ok(toolsCss.includes('.wheel-wrapper'));
        assert.ok(toolsCss.includes('.wheel-pointer'));
    });

    it('tools.css has bracket styles', () => {
        assert.ok(toolsCss.includes('.bracket-container'));
        assert.ok(toolsCss.includes('.bracket-svg'));
    });

    it('tools.css has team card styles', () => {
        assert.ok(toolsCss.includes('.team-card'));
        assert.ok(toolsCss.includes('.team-cards-grid'));
    });

    it('tools.css has toast styles', () => {
        assert.ok(toolsCss.includes('.toast'));
    });

    it('tools.css has print media query', () => {
        assert.ok(toolsCss.includes('@media print'));
    });

    it('tools.css has mobile responsive rules', () => {
        assert.ok(toolsCss.includes('768px'));
    });
});

// ─── Config ───────────────────────────────────────────────────

describe('Site Config', () => {
    let config;
    before(() => {
        config = fs.readFileSync(path.join(__dirname, '..', '_config.yml'), 'utf8');
    });

    it('has updated title', () => {
        assert.ok(config.includes('Free Online Tools'));
    });

    it('has updated description', () => {
        assert.ok(config.includes('teams, teachers, and event organizers'));
    });

    it('has tool-related keywords', () => {
        assert.ok(config.includes('random team generator'));
        assert.ok(config.includes('spin the wheel'));
        assert.ok(config.includes('tournament bracket generator'));
    });
});
