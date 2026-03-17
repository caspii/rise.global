/* Tournament Bracket Generator */

var bracketData = null;
var bracketZoom = 1;

var MATCH_W = 180;
var MATCH_H = 50;
var MATCH_GAP = 20;
var ROUND_GAP = 60;
var SLOT_H = MATCH_H / 2;

function generateBracket() {
    var input = document.getElementById('bracket-names-input').value;
    var names = parseNames(input);
    if (names.length < 2) {
        showToast('Please enter at least 2 participants');
        return;
    }
    if (names.length > 128) {
        showToast('Maximum 128 participants supported');
        return;
    }

    var order = document.getElementById('bracket-order').value;
    if (order === 'random') {
        names = shuffleArray(names);
    }

    // Calculate bracket size (next power of 2)
    var size = 1;
    while (size < names.length) size *= 2;

    // Fill with byes
    var slots = [];
    for (var i = 0; i < size; i++) {
        slots.push(i < names.length ? names[i] : null);
    }

    // Seed byes properly - place byes so top seeds get them
    if (size > names.length) {
        var seeded = [];
        for (var i = 0; i < size; i++) seeded.push(null);
        var positions = getSeedPositions(size);
        for (var i = 0; i < slots.length; i++) {
            seeded[positions[i]] = slots[i];
        }
        slots = seeded;
    }

    // Build rounds
    var rounds = [];
    var numRounds = Math.log2(size);

    // First round matches
    var firstRound = [];
    for (var i = 0; i < size; i += 2) {
        var match = {
            p1: slots[i],
            p2: slots[i + 1],
            winner: null,
            roundIdx: 0,
            matchIdx: i / 2
        };
        // Auto-advance byes
        if (match.p1 === null && match.p2 !== null) match.winner = match.p2;
        else if (match.p2 === null && match.p1 !== null) match.winner = match.p1;
        firstRound.push(match);
    }
    rounds.push(firstRound);

    // Subsequent rounds
    for (var r = 1; r < numRounds; r++) {
        var round = [];
        var prevRound = rounds[r - 1];
        for (var m = 0; m < prevRound.length; m += 2) {
            var match = {
                p1: prevRound[m].winner,
                p2: prevRound[m + 1].winner,
                winner: null,
                roundIdx: r,
                matchIdx: m / 2
            };
            round.push(match);
        }
        rounds.push(round);
    }

    bracketData = { rounds: rounds, names: names, order: order };
    trackEvent('Bracket: Generate');
    bracketZoom = 1;
    document.getElementById('zoom-level').textContent = '100%';
    renderBracket();
    document.getElementById('bracket-output').style.display = 'block';
}

function getSeedPositions(size) {
    if (size === 1) return [0];
    if (size === 2) return [0, 1];
    var positions = [0, 1];
    while (positions.length < size) {
        var next = [];
        var count = positions.length;
        for (var i = 0; i < positions.length; i++) {
            next.push(positions[i]);
            next.push(2 * count - 1 - positions[i]);
        }
        positions = next;
    }
    return positions;
}

function renderBracket() {
    if (!bracketData) return;
    var rounds = bracketData.rounds;
    var numRounds = rounds.length;
    var totalW = numRounds * (MATCH_W + ROUND_GAP) + 40;
    var firstRoundMatches = rounds[0].length;
    var totalH = firstRoundMatches * (MATCH_H + MATCH_GAP) + 40;

    var svgParts = [];
    svgParts.push('<svg class="bracket-svg" width="' + (totalW * bracketZoom) + '" height="' + (totalH * bracketZoom) + '" viewBox="0 0 ' + totalW + ' ' + totalH + '" xmlns="http://www.w3.org/2000/svg">');
    svgParts.push('<rect width="' + totalW + '" height="' + totalH + '" fill="white"/>');

    var matchPositions = [];

    for (var r = 0; r < numRounds; r++) {
        var round = rounds[r];
        matchPositions[r] = [];
        var x = 20 + r * (MATCH_W + ROUND_GAP);

        for (var m = 0; m < round.length; m++) {
            var y;
            if (r === 0) {
                y = 20 + m * (MATCH_H + MATCH_GAP);
            } else {
                // Center between the two feeder matches
                var prev1 = matchPositions[r - 1][m * 2];
                var prev2 = matchPositions[r - 1][m * 2 + 1];
                y = (prev1.y + prev2.y) / 2;
            }
            matchPositions[r].push({ x: x, y: y });

            var match = round[m];
            var isClickable1 = match.p1 !== null;
            var isClickable2 = match.p2 !== null;
            var winner1 = match.winner === match.p1 && match.p1 !== null;
            var winner2 = match.winner === match.p2 && match.p2 !== null;

            // Empty slot label: "BYE" in round 1, dash in later rounds
            var emptyLabel = r === 0 ? 'BYE' : '\u2014';

            // Draw match box
            // Top slot (p1)
            svgParts.push('<g class="match-slot' + (winner1 ? ' match-winner' : '') + '" onclick="selectWinner(' + r + ',' + m + ',1)" style="cursor:' + (isClickable1 ? 'pointer' : 'default') + '">');
            svgParts.push('<rect x="' + x + '" y="' + y + '" width="' + MATCH_W + '" height="' + SLOT_H + '" fill="' + (winner1 ? '#dbeafe' : '#f9fafb') + '" stroke="#d1d5db" stroke-width="1" rx="4"/>');
            svgParts.push('<text x="' + (x + 10) + '" y="' + (y + SLOT_H / 2 + 4) + '" font-size="12" fill="' + (match.p1 ? '#1f2937' : '#9ca3af') + '" font-weight="' + (winner1 ? '700' : '400') + '">' + escapeXml(match.p1 || emptyLabel) + '</text>');
            svgParts.push('</g>');

            // Bottom slot (p2)
            svgParts.push('<g class="match-slot' + (winner2 ? ' match-winner' : '') + '" onclick="selectWinner(' + r + ',' + m + ',2)" style="cursor:' + (isClickable2 ? 'pointer' : 'default') + '">');
            svgParts.push('<rect x="' + x + '" y="' + (y + SLOT_H) + '" width="' + MATCH_W + '" height="' + SLOT_H + '" fill="' + (winner2 ? '#dbeafe' : '#ffffff') + '" stroke="#d1d5db" stroke-width="1" rx="4"/>');
            svgParts.push('<text x="' + (x + 10) + '" y="' + (y + SLOT_H + SLOT_H / 2 + 4) + '" font-size="12" fill="' + (match.p2 ? '#1f2937' : '#9ca3af') + '" font-weight="' + (winner2 ? '700' : '400') + '">' + escapeXml(match.p2 || emptyLabel) + '</text>');
            svgParts.push('</g>');

            // Draw connector lines to next round
            if (r < numRounds - 1) {
                var midY = y + MATCH_H / 2;
                var lineX = x + MATCH_W;
                var nextX = x + MATCH_W + ROUND_GAP;
                svgParts.push('<line x1="' + lineX + '" y1="' + midY + '" x2="' + (lineX + ROUND_GAP / 2) + '" y2="' + midY + '" stroke="#d1d5db" stroke-width="1"/>');
            }
        }

        // Draw vertical connectors between match pairs
        if (r < numRounds - 1) {
            for (var m = 0; m < round.length; m += 2) {
                var pos1 = matchPositions[r][m];
                var pos2 = matchPositions[r][m + 1];
                var connX = pos1.x + MATCH_W + ROUND_GAP / 2;
                var mid1 = pos1.y + MATCH_H / 2;
                var mid2 = pos2.y + MATCH_H / 2;
                var midPoint = (mid1 + mid2) / 2;
                // Vertical line
                svgParts.push('<line x1="' + connX + '" y1="' + mid1 + '" x2="' + connX + '" y2="' + mid2 + '" stroke="#d1d5db" stroke-width="1"/>');
                // Horizontal to next match
                svgParts.push('<line x1="' + connX + '" y1="' + midPoint + '" x2="' + (connX + ROUND_GAP / 2) + '" y2="' + midPoint + '" stroke="#d1d5db" stroke-width="1"/>');
            }
        }

        // Round label
        var labelX = 20 + r * (MATCH_W + ROUND_GAP) + MATCH_W / 2;
        var roundName = r === numRounds - 1 ? 'Final' : r === numRounds - 2 ? 'Semifinal' : 'Round ' + (r + 1);
        svgParts.push('<text x="' + labelX + '" y="' + 14 + '" font-size="11" fill="#6b7280" text-anchor="middle" font-weight="600">' + roundName + '</text>');
    }

    svgParts.push('</svg>');

    document.getElementById('bracket-container').innerHTML = svgParts.join('');
}

function selectWinner(roundIdx, matchIdx, slot) {
    if (!bracketData) return;
    var match = bracketData.rounds[roundIdx][matchIdx];
    var selected = slot === 1 ? match.p1 : match.p2;
    if (!selected) return;

    // Clear downstream winners if changing a previous selection
    if (match.winner !== selected) {
        clearDownstream(roundIdx, matchIdx);
    }

    match.winner = selected;
    trackEvent('Bracket: Select Winner');

    // Advance to next round
    if (roundIdx < bracketData.rounds.length - 1) {
        var nextMatch = bracketData.rounds[roundIdx + 1][Math.floor(matchIdx / 2)];
        if (matchIdx % 2 === 0) {
            nextMatch.p1 = selected;
        } else {
            nextMatch.p2 = selected;
        }
    }

    renderBracket();
}

function clearDownstream(roundIdx, matchIdx) {
    if (roundIdx >= bracketData.rounds.length - 1) return;
    var nextMatchIdx = Math.floor(matchIdx / 2);
    var nextMatch = bracketData.rounds[roundIdx + 1][nextMatchIdx];
    if (matchIdx % 2 === 0) {
        nextMatch.p1 = null;
    } else {
        nextMatch.p2 = null;
    }
    nextMatch.winner = null;
    clearDownstream(roundIdx + 1, nextMatchIdx);
}

function resetBracket() {
    if (!bracketData) return;
    // Regenerate from original input
    var input = document.getElementById('bracket-names-input').value;
    generateBracket();
    showToast('Bracket reset');
}

function zoomBracket(dir) {
    bracketZoom = Math.max(0.5, Math.min(2, bracketZoom + dir * 0.25));
    document.getElementById('zoom-level').textContent = Math.round(bracketZoom * 100) + '%';
    renderBracket();
}

function exportBracketImage() {
    var container = document.getElementById('bracket-container');
    exportAsImage(container, 'tournament-bracket.png');
}

function printBracket() {
    trackEvent('Bracket: Print');
    window.print();
}

function shareBracketLink() {
    var state = {
        names: document.getElementById('bracket-names-input').value,
        order: document.getElementById('bracket-order').value
    };
    var url = encodeStateToURL(state);
    copyToClipboard(url);
    trackEvent('Bracket: Share');
    showToast('Share link copied!');
}

function escapeXml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Init from URL
(function() {
    var state = decodeStateFromURL();
    if (state && state.names) {
        document.getElementById('bracket-names-input').value = state.names;
        if (state.order) document.getElementById('bracket-order').value = state.order;
        generateBracket();
    }
})();
