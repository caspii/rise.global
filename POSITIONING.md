# Rise — Positioning & Feature Guide

## Brand Identity

### Name

**Rise** (domain: rise.global)

### Tagline

**Rise. Compete. Win.**

### One-liner

The modern tournament bracket maker — free, fast, and built for live competition.

### Positioning Statement

Rise is the tournament bracket platform for anyone who runs competitions — from backyard cornhole to esports streams. Create beautiful brackets in seconds, share them live, and track scores in real-time. Free to start, powerful when you need it.

### Relationship to Other Products

Rise is a standalone brand with a subtle "Powered by KeepTheScore" attribution in the footer. It is not co-branded or visually tied to KeepTheScore, Leaderboarded, or ScoreJudge. The connection exists for trust and SEO link equity, not for cross-selling on the page itself.

---

## Target Audiences

Listed in priority order:

1. **Casual tournament organizers** — office ping-pong, beer pong, cornhole, family game nights. They need something fast, free, and shareable. They'll Google "bracket maker" and want to be done in 30 seconds.

2. **Sports coaches & rec leagues** — weekend tournaments, school sports days, club competitions. They need printable brackets, multiple formats, and something they can display on a screen at the venue.

3. **Esports streamers & organizers** — OBS bracket overlays, live bracket updates on stream. They care about visual quality, transparent backgrounds, and real-time updates their audience can follow.

4. **Event organizers** — hackathons, pitch competitions, talent shows, science fairs. They need registration, multiple judges, and professional-looking brackets for their sponsors and participants.

---

## Brand Voice

### Tone

Energetic but not corporate. Confident but not arrogant. Think "the cool tournament tool your friend told you about" — not "enterprise tournament management solution."

### Writing Guidelines

- Lead with what the user can do, not what the product is
- Use active voice and short sentences
- Avoid jargon: say "bracket" not "single-elimination tournament tree structure"
- Be specific: "Create a bracket in 30 seconds" beats "Quick and easy bracket creation"
- When describing upcoming features, be honest — say "coming soon" not "available"
- Never disparage competitors by name in product copy (comparison pages are fine)

### Words We Use

- **Bracket** (not "draw" or "tournament tree")
- **Participants** or **teams** (not "entrants" or "contestants")
- **Create** (not "generate" — except in SEO contexts where "generator" is the search term)
- **Share** (not "distribute" or "publish")
- **Free** (prominently — this is a key differentiator)

### Words We Avoid

- "Premium" or "membership" — use "Pro" for the paid tier
- "Enterprise" — we're not targeting enterprises yet
- "AI-powered" — the tool doesn't use AI
- "Revolutionary" or "game-changing" — let the product speak

---

## Visual Identity

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Electric lime | `#c8ff00` | CTAs, logo, active states, accents |
| Primary dark | Lime dark | `#a8d600` | Hover states on lime |
| Secondary | Hot coral | `#ff4d6a` | Links, hover borders, card accents |
| Accent | Electric blue | `#00d4ff` | Sparingly, for data/info highlights |
| Background dark | Deep navy | `#0a0e1a` | Nav, hero, footer, dark sections |
| Background darker | Darker navy | `#060812` | Subtle dark gradients |
| Background light | Light gray | `#f0f1f5` | Light section backgrounds |
| Text dark | Near black | `#0a0e1a` | Body text, headings |
| Text light | Medium gray | `#5a6178` | Secondary text, descriptions |
| Text muted | Light gray | `#8891a5` | Timestamps, fine print |
| Success | Green | `#00d68f` | Checkmarks, positive states |

### Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display | **Outfit** | 600, 700, 800, 900 | Headings, nav, CTAs, logo |
| Body | **Plus Jakarta Sans** | 400, 500, 600, 700 | Body text, descriptions, UI elements |

Outfit is geometric and bold with strong character at heavy weights. Plus Jakarta Sans is clean and highly readable. Together they create a modern, competitive feel without looking like every other SaaS site.

### Design Principles

- **Dark bookends** — navigation and footer are always dark navy, creating a strong frame around the content
- **Lime pops on dark** — the primary lime color is most impactful on dark backgrounds (hero CTAs, nav button)
- **Coral for warmth** — hot coral as the secondary color adds energy to hover states and links on light backgrounds
- **Cards with borders, not shadows** — 2px solid borders feel more structured and competitive than soft shadows
- **Pill-shaped CTAs** — all call-to-action buttons use `border-radius: 100px` for a distinctive, bold shape
- **Generous spacing** — sections breathe with 5rem+ padding; don't crowd elements

---

## Competitive Positioning

### The Market

The tournament bracket maker space has ~60,000+ monthly US searches. Key competitors:

| Competitor | Their strength | Their weakness | Our angle |
|-----------|---------------|---------------|-----------|
| **brackethq.com** (DR 47, 139K traffic) | #1 for "bracket maker", clean UX | No live scoring, no customization, bland | Better design, live features coming |
| **Challonge** (DR 78, 213K traffic) | Brand recognition, 5 formats, huge traffic | Outdated 2012 UX, spam-ridden, slow to innovate | Modern UX, clean platform, streaming |
| **LeagueLobster** (DR 71, 21K traffic) | Constraint-based scheduling, round robin | No live scoring, no embeds, no streaming | Live scoring, embeds, streaming |
| **Tournify** (DR 72, 6.5K traffic) | Sport-specific depth, event management | NSFW spam problem, restrictive free tier, Europe-only | Clean platform, generous free tier, global |
| **Common Ninja** (DR 50, 20K traffic) | Best embedding (15+ platforms) | Generic widget company, not tournament-focused | Dedicated tournament brand, live features |
| **ScoreLeader** (DR 30, 11K traffic) | Simple, works well | Single elimination only, limited features | More formats, better design |

### Our Differentiators

These are capabilities no competitor offers:

1. **Bracket + Scoreboard integration** — each match in a bracket becomes a live scoreboard. When the match ends, the winner auto-advances. No other tool connects brackets to live scoring.

2. **Streaming overlays** — transparent bracket overlays for OBS, vMix, XSplit. Stream Deck integration for one-button bracket updates. The esports streaming audience has no good bracket overlay tool.

3. **Modern design with themes** — 40+ visual themes from the KeepTheScore ecosystem. Custom colors, fonts, dark mode. Every competitor looks either dated (Challonge) or generic (BracketHQ).

### What We Don't Compete On (Yet)

- Full league/season management (LeagueLobster's strength)
- Constraint-based scheduling (venue conflicts, coach availability)
- Per-sport statistical tracking (Tournify's depth)
- Enterprise features (SSO, org management)

---

## Feature Specification

### Available Now (Free)

| Feature | Description |
|---------|-------------|
| Single elimination brackets | Standard knockout format, 2-128 participants |
| Random ordering | Shuffle participants randomly before bracket generation |
| Seeded ordering | Place participants in bracket order as entered |
| Click-to-advance | Click a participant's name to select the winner; they auto-advance to the next round |
| Automatic byes | Non-power-of-2 participant counts are handled with automatic byes for a balanced bracket |
| Export as PNG | Download the bracket as a high-quality PNG image |
| Print-optimized | Print-ready formatting for venue posting |
| Share link | Generate a shareable URL for the bracket |
| Zoom controls | Zoom in/out on large brackets for readability |
| No signup required | Everything works immediately in the browser, no account needed |
| No data collection | All processing happens client-side; nothing is sent to a server |
| Mobile responsive | Works on phones, tablets, and desktops |

### Coming Soon — Tier 1 (Next to Build)

These are the next features to implement. They should be previewed on the site with "Coming Soon" badges and mockups.

| Feature | Description | Why it matters |
|---------|-------------|----------------|
| Double elimination | Losers bracket with consolation rounds, winner must be beaten twice | Table stakes — Challonge, LeagueLobster, and Common Ninja all have this. Without it, serious tournament organizers won't consider us. |
| Round robin | Auto-generated round-robin schedules showing every team vs every other team | LeagueLobster owns this space (5,060 visits/mo to their round robin page). We need it for the SEO keyword cluster and to serve league organizers. |
| Custom themes | Colors, fonts, dark/light mode, background options | Visual differentiation from every competitor. Our design is already better — themes let users make it theirs. |
| Save & share | Persistent brackets with shareable URLs that survive browser refresh | Currently brackets are lost on page refresh. This is the #1 limitation. Requires backend integration (connect to KTS infrastructure). |
| Third-place match | Optional consolation final between the two semifinal losers | Common request for sports tournaments. Easy to implement once double elimination is done. |

### Coming Soon — Tier 2 (Roadmap)

These are further out. Show them on the features page but not as prominently.

| Feature | Description | Why it matters |
|---------|-------------|----------------|
| Live scoreboard integration | Each bracket match generates a live KeepTheScore scoreboard. When the match ends, the winner auto-advances. | **Unique — no competitor has this.** This is the core differentiator that justifies Rise as a separate product. |
| OBS/streaming overlay | Transparent bracket overlay as a browser source for OBS, vMix, XSplit. Auto-updates when matches complete. | **Unique — no competitor has this.** Targets the esports streaming audience that Challonge serves poorly. |
| TV display mode | Full-screen kiosk mode for venue screens and projectors. Auto-refresh, no visible controls. | Tournify has slideshow mode. Important for in-person events where a screen shows the bracket to the room. |
| Team logos & images | Upload logos or images for each participant/team that display in the bracket | Visual polish that makes brackets look professional. Important for sponsored events and esports. |
| Registration pages | Public sign-up page where participants can register for a tournament | Challonge has this. Enables self-serve tournament creation where organizers share a registration link. |
| Embeddable brackets | Embed a live bracket on any website via iframe or embed code. Pro feature. | Common Ninja's core strength. Important for tournament websites, school pages, and community sites. |
| Group stage to knockout | Combined format: pool play in groups, then top teams advance to an elimination bracket | Tournify and Challonge have this. Standard format for larger tournaments (World Cup, etc.). |
| Mobile remote control | Update bracket results from a phone while the bracket displays on a separate TV/screen | Existing KeepTheScore feature. Natural extension for in-person events. |

### Pricing (Planned)

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 forever | Single elimination, unlimited brackets, export/print/share, no signup |
| **Pro** | TBD (coming soon) | Everything free + double elimination, round robin, custom themes, live scoreboards, streaming overlays, embeddable brackets, save & share |

---

## SEO Strategy

### Domain

rise.global (DR 44). Strong backlink profile from Wikipedia, Google, Microsoft, Forbes. Backlinks from old Rise Global leaderboard platform — all redirected to preserve equity.

### Primary Keywords

| Keyword | Monthly Volume | KD | Target Page |
|---------|---------------|-----|-------------|
| bracket maker | 48,000 | 57 | Homepage `/` |
| tournament bracket generator | 12,000 | — | `/tools/tournament-bracket-generator/` |
| tournament bracket | 90,000 | 70 | Homepage `/` |
| bracket generator | 16,000 | — | Homepage `/` |
| bracket creator | 5,900 | — | Homepage `/` |
| make a bracket | 4,600 | — | Homepage `/` |
| free bracket maker | 5,300 | — | `/free-bracket-maker/` (to create) |
| double elimination bracket generator | 1,800 | — | `/double-elimination-bracket/` (to create) |
| round robin generator | 1,000 | — | `/round-robin-generator/` (to create) |

### N-Team Pages (LeagueLobster Pattern)

Create dedicated pages for specific team counts. Each page embeds the bracket tool pre-configured with that number of teams, plus educational content and FAQ.

| Page | Target Keyword | Volume |
|------|---------------|--------|
| `/4-team-bracket/` | 4 team bracket | 1,500 |
| `/8-team-bracket/` | 8 team bracket | 2,000 |
| `/16-team-bracket/` | 16 team bracket | 4,500 |
| `/32-team-bracket/` | 32 team bracket | 1,200 |
| `/64-team-bracket/` | 64 team bracket | 800 |
| `/6-team-round-robin/` | 6 teams round robin | 3,300 |
| `/8-team-round-robin/` | 8 team round robin | 700 |

### Sport-Specific Pages (KD 0, Uncontested)

| Page | Target Keyword | Volume | KD |
|------|---------------|--------|----|
| `/cornhole-tournament-bracket/` | cornhole bracket | 1,300 | 0 |
| `/beer-pong-bracket/` | beer pong bracket | 800 | — |
| `/ping-pong-tournament-bracket/` | ping pong tournament bracket | 400 | — |
| `/basketball-tournament-bracket/` | basketball tournament bracket | 500 | — |
| `/volleyball-tournament-bracket/` | volleyball tournament bracket | 300 | — |
| `/esports-tournament-bracket/` | esports tournament bracket | 200 | — |

### Content Pages (Blog)

| Topic | Target Keyword | Volume |
|-------|---------------|--------|
| How to Run a Double Elimination Tournament | double elimination tournament | 1,200 |
| Tournament Bracket Templates (Printable) | tournament bracket template | 4,800 |
| Round Robin vs Single Elimination: Which Format? | round robin vs single elimination | 200 |
| How to Seed a Tournament Bracket | tournament seeding | 500 |
| How to Run a Cornhole Tournament | how to run a cornhole tournament | 300 |
| Best Bracket Maker Tools Compared (2026) | best bracket maker | 400 |

---

## Success Metrics

| Metric | 3-month target | 6-month target |
|--------|---------------|----------------|
| Organic traffic | 500/mo | 3,000/mo |
| Keywords ranking | 50 | 200 |
| Keywords in top 3 | 10 | 40 |
| Waitlist signups | 200 | 1,000 |
| Bracket tool usage | 500/mo | 2,000/mo |

---

## Research Date

All competitor data, keyword volumes, and DR figures from Ahrefs, pulled March 2026.
