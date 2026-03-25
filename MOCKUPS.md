# Rise — Product Mockup Image Library

All images are in `/assets/images/mockups/`. These are AI-generated UI mockups showing the Rise tournament bracket platform's current and upcoming features.

## Visual Consistency

All mockups share a consistent design language:
- Dark navy background (#0a0e1a) with lighter card surfaces
- Electric lime (#c8ff00) for winners, active states, CTAs
- Hot coral (#ff4d6a) for eliminations
- "RISE" logo in lime uppercase in top-left nav
- Clean geometric sans-serif typography
- Rounded corners on all cards and containers

## Step 1: Pure UI Mockups

These show the product interface in isolation — no environmental context.

### mockup-01-live-scoreboard.png
- **Feature:** Live Scoreboard Integration
- **Shows:** Split view — 8-team bracket on left with one match highlighted as LIVE, expanded scoreboard panel on right showing "Thunder Hawks vs Red Dragons" with score 24-19, game clock (Q3 — 04:32), +1/+2/+3 score buttons, LIVE badge in red
- **Use for:** Homepage "Coming Soon" cards, Features page, marketing explaining the unique bracket+scoreboard integration
- **Dimensions:** Landscape

### mockup-02-obs-overlay.png
- **Feature:** OBS Streaming Overlay
- **Shows:** Esports stream scene with a compact semi-transparent bracket overlay in the bottom-right corner. Stream UI elements visible (viewer count, chat, streamer webcam). Bracket shows winners in lime green.
- **Use for:** Homepage "Coming Soon" cards, Features page, esports-focused marketing, streamer landing pages
- **Dimensions:** Landscape

### mockup-03-double-elimination.png
- **Feature:** Double Elimination Bracket
- **Shows:** Full double elimination bracket for 8 teams — Winners Bracket on top, Losers Bracket below, connected by flow lines, Grand Final on the right. Mid-tournament state with scores and winners highlighted in lime.
- **Use for:** Homepage "Coming Soon" cards, Features page, `/double-elimination-bracket/` landing page, blog posts about tournament formats
- **Dimensions:** Landscape

### mockup-04-custom-themes.png
- **Feature:** Custom Themes
- **Shows:** 2x2 grid of the same bracket rendered in 4 different themes — Midnight (dark/lime), Arctic (white/blue), Ember (dark/orange-coral), Forest (dark green/emerald). "Choose Your Theme" header.
- **Use for:** Homepage "Coming Soon" cards, Features page, demonstrating customization capability
- **Dimensions:** Landscape

### mockup-05-tv-display.png
- **Feature:** TV Display Mode
- **Shows:** Full-screen kiosk bracket with no browser chrome. Large "SUMMER SLAM 2026" title, team names with circular logo avatars, round labels (QUARTERFINALS, SEMIFINALS, FINAL), one live match glowing. Small RISE logo in bottom-right. Designed for venue TVs.
- **Use for:** Homepage "Coming Soon" cards, Features page, in-person event marketing
- **Dimensions:** Landscape

### mockup-06-round-robin.png
- **Feature:** Round Robin Schedule
- **Shows:** Schedule view with 5 rounds of matches (3 per round) on the left — some with scores, others showing "Upcoming". Standings table on the right with W/L/Pts columns. Top team highlighted in lime. Schedule/Bracket tab switcher in nav.
- **Use for:** Homepage "Coming Soon" cards, Features page, `/round-robin-generator/` landing page, blog posts about round robin format
- **Dimensions:** Landscape

### mockup-07-group-to-knockout.png
- **Feature:** Group Stage to Knockout
- **Shows:** Two-phase tournament — Group A and Group B standings tables on the left with top 2 teams highlighted in lime as advancing. Arrow/flow connecting to a 4-team knockout bracket on the right. One semifinal complete.
- **Use for:** Features page, blog posts about tournament formats, World Cup-style tournament explainers
- **Dimensions:** Landscape

### mockup-08-team-logos.png
- **Feature:** Team Logos & Images
- **Shows:** 8-team bracket with colorful circular team logo emblems next to each team name (hawk, wolf, fox, dragon, phoenix, knight, raven, titan). Esports production-quality look. Winners highlighted with lime glow.
- **Use for:** Features page, esports marketing, showing professional bracket aesthetics
- **Dimensions:** Landscape

### mockup-09-registration.png
- **Feature:** Registration Page
- **Shows:** Tournament registration form — "SUMMER SLAM 2026" header, info cards (Date, Location, Entry Fee, Spots with 75% progress bar in lime), Team Name/Captain Email form fields, "Register Your Team" lime button, "Registered Teams" list with 6 teams and checkmarks.
- **Use for:** Features page, blog posts about running tournaments, showing full tournament lifecycle
- **Dimensions:** Landscape

### mockup-10-embeddable.png
- **Feature:** Embeddable Bracket Widget
- **Shows:** A light-themed community website ("Community Hub") with a dark Rise bracket widget embedded in the main content area. Strong contrast between the light host page and dark bracket embed. "Powered by Rise" badge. Sidebar with community links.
- **Use for:** Features page, marketing to website owners, showing embed capability in realistic context
- **Dimensions:** Landscape

### mockup-11-mobile-remote.png
- **Feature:** Mobile Remote Control
- **Shows:** iPhone frame with dark tournament control interface. Mini-bracket overview at top with current match highlighted. "SEMIFINAL — Thunder Hawks vs Iron Wolves" with large score display (12-9). Big +/- score buttons for each team. Full-width "DECLARE WINNER" lime button. "Connected to TV Display" status bar.
- **Use for:** Features page, in-person event marketing, showing connected TV+phone experience
- **Dimensions:** Portrait (phone frame)

## Step 2: Situational/Contextual Images

These show the product UI in real-world situations (to be generated).

### situational-01-bar-tv.png
- **Scene:** Sports bar with wall-mounted TV showing a tournament bracket. Patrons watching, warm bar lighting, exposed brick.
- **Use for:** Homepage hero background option, beer pong bracket page, social proof / lifestyle imagery

### situational-02-cornhole-phone.png
- **Scene:** Outdoor cornhole tournament. Hands holding phone with bracket controls, portable monitor in background showing full bracket. Sunny afternoon.
- **Use for:** Cornhole tournament bracket page, mobile remote control marketing, outdoor event imagery

### situational-03-streamer-desk.png
- **Scene:** Esports streamer at gaming desk with multiple monitors. Main monitor shows game, secondary shows Rise bracket interface. RGB lighting, headset, mic.
- **Use for:** OBS overlay marketing, esports bracket page, streaming guide blog posts

### situational-04-office-pingpong.png
- **Scene:** Office break room with ping-pong table. Laptop open on high table showing bracket. Two coworkers playing in background. Modern office, natural light.
- **Use for:** Homepage use cases section, office competition marketing, ping-pong bracket page

### situational-05-school-gym.png
- **Scene:** School gymnasium during sports day. Projector screen showing bracket in kiosk mode. Students gathered around, teacher with clipboard. Wooden floors, basketball hoops.
- **Use for:** Education/school use case marketing, TV display mode feature, school sports day content

### situational-06-hackathon.png
- **Scene:** Hackathon event space with long tables and laptops. Large monitor showing demo day pitch competition bracket. Developers in hoodies, post-it notes, energy drinks.
- **Use for:** Hackathon/event organizer marketing, homepage use cases, ScoreJudge cross-promotion

## Page → Image Mapping

Which mockups should appear on which pages:

### Homepage (index.html) — "What's Coming Next" section
- mockup-01-live-scoreboard.png → "Live Scoreboards" card
- mockup-02-obs-overlay.png → "Streaming Overlays" card
- mockup-04-custom-themes.png → "Custom Themes" card
- mockup-05-tv-display.png → "TV Display Mode" card

### Features page (features.html) — "Coming Soon" section
- mockup-03-double-elimination.png → Double Elimination
- mockup-06-round-robin.png → Round Robin
- mockup-04-custom-themes.png → Custom Themes
- mockup-01-live-scoreboard.png → Live Scoreboard Integration
- mockup-02-obs-overlay.png → OBS Streaming Overlays
- mockup-05-tv-display.png → TV Display Mode
- mockup-08-team-logos.png → Team Logos
- mockup-09-registration.png → Registration Pages
- mockup-10-embeddable.png → Embeddable Brackets
- mockup-07-group-to-knockout.png → Group Stage to Knockout
- mockup-11-mobile-remote.png → Mobile Remote Control

### Future landing pages
- `/double-elimination-bracket/` → mockup-03-double-elimination.png
- `/round-robin-generator/` → mockup-06-round-robin.png
- `/cornhole-tournament-bracket/` → situational cornhole image
- `/esports-tournament-bracket/` → mockup-08-team-logos.png or mockup-02-obs-overlay.png

### Blog posts
- Tournament format guides → mockup-03, mockup-06, mockup-07
- Streaming guide → mockup-02
- How to run a tournament → mockup-09, mockup-05
