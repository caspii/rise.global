const { describe, it, before, beforeEach } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function assertEq(actual, expected, msg) {
    assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected), msg);
}

let sandbox;

before(() => {
    const commonCode = fs.readFileSync(
        path.join(__dirname, '..', 'assets', 'js', 'tools-common.js'),
        'utf8'
    );
    const toolCode = fs.readFileSync(
        path.join(__dirname, '..', 'assets', 'js', 'bracket-generator.js'),
        'utf8'
    );

    const elements = {
        'bracket-names-input': { value: '' },
        'bracket-order': { value: 'seeded' },
        'bracket-output': { style: {} },
        'bracket-container': { innerHTML: '' },
        'zoom-level': { textContent: '100%' },
    };

    sandbox = {
        navigator: { clipboard: null },
        window: {
            location: { origin: 'https://rise.global', pathname: '/tools/tournament-bracket-generator/', hash: '' },
            print: () => {},
        },
        document: {
            getElementById: (id) => elements[id] || { value: '', style: {}, innerHTML: '', addEventListener: () => {} },
            createElement: (tag) => ({
                className: '', textContent: '', innerHTML: '',
                classList: { add: () => {}, remove: () => {} },
                remove: () => {}, style: {},
            }),
            querySelector: () => null,
            body: { appendChild: () => {} },
            head: { appendChild: () => {} },
        },
        requestAnimationFrame: (fn) => fn(),
        setTimeout: (fn, ms) => fn(),
        fathom: { trackEvent: () => {} },
        btoa: (s) => Buffer.from(s).toString('base64'),
        atob: (s) => Buffer.from(s, 'base64').toString(),
        encodeURIComponent, decodeURIComponent, unescape, escape,
        JSON, Math, console,
        _elements: elements,
    };

    vm.createContext(sandbox);
    vm.runInContext(commonCode, sandbox);
    vm.runInContext(toolCode, sandbox);
});

describe('Bracket Generator Logic', () => {
    it('generates bracket for power-of-2 participants', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC\nD';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        assert.ok(sandbox.bracketData);
        assert.strictEqual(sandbox.bracketData.rounds.length, 2);
        assert.strictEqual(sandbox.bracketData.rounds[0].length, 2);
        assert.strictEqual(sandbox.bracketData.rounds[1].length, 1);
    });

    it('generates bracket with byes for non-power-of-2', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        assert.ok(sandbox.bracketData);
        assert.strictEqual(sandbox.bracketData.rounds.length, 2);
        assert.strictEqual(sandbox.bracketData.rounds[0].length, 2);

        const firstRound = sandbox.bracketData.rounds[0];
        const hasBye = Array.from(firstRound).some((m) => m.p1 === null || m.p2 === null);
        assert.ok(hasBye, 'Should have at least one bye');

        const byeMatch = Array.from(firstRound).find((m) => m.p1 === null || m.p2 === null);
        assert.ok(byeMatch.winner !== null, 'Bye match should auto-advance winner');
    });

    it('auto-advances byes to second round', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        const secondRound = sandbox.bracketData.rounds[1][0];
        const hasAdvanced = secondRound.p1 !== null || secondRound.p2 !== null;
        assert.ok(hasAdvanced, 'Bye winner should advance to second round');
    });

    it('handles 2 participants', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        assert.strictEqual(sandbox.bracketData.rounds.length, 1);
        assert.strictEqual(sandbox.bracketData.rounds[0].length, 1);
        assert.strictEqual(sandbox.bracketData.rounds[0][0].p1, 'A');
        assert.strictEqual(sandbox.bracketData.rounds[0][0].p2, 'B');
    });

    it('rejects fewer than 2 participants', () => {
        sandbox.bracketData = null;
        sandbox._elements['bracket-names-input'].value = 'A';
        sandbox.generateBracket();
        assert.strictEqual(sandbox.bracketData, null);
    });

    it('renders SVG output', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC\nD';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        const svg = sandbox._elements['bracket-container'].innerHTML;
        assert.ok(svg.includes('<svg'), 'Should contain SVG element');
        assert.ok(svg.includes('</svg>'), 'Should close SVG element');
    });

    it('SVG contains round labels', () => {
        // Use 8 players so we get Round 1, Semifinal, Final
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC\nD\nE\nF\nG\nH';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        const svg = sandbox._elements['bracket-container'].innerHTML;
        assert.ok(svg.includes('Round 1'), 'Should show Round 1 label');
        assert.ok(svg.includes('Semifinal'), 'Should show Semifinal label');
        assert.ok(svg.includes('Final'), 'Should show Final label');
    });

    it('handles 8 participants with correct rounds', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC\nD\nE\nF\nG\nH';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        assert.strictEqual(sandbox.bracketData.rounds.length, 3);
        assert.strictEqual(sandbox.bracketData.rounds[0].length, 4);
        assert.strictEqual(sandbox.bracketData.rounds[1].length, 2);
        assert.strictEqual(sandbox.bracketData.rounds[2].length, 1);
    });
});

describe('Winner Selection', () => {
    beforeEach(() => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC\nD';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();
    });

    it('sets winner on a match', () => {
        sandbox.selectWinner(0, 0, 1);
        assert.strictEqual(sandbox.bracketData.rounds[0][0].winner, 'A');
    });

    it('advances winner to next round', () => {
        sandbox.selectWinner(0, 0, 1);
        const nextMatch = sandbox.bracketData.rounds[1][0];
        assert.strictEqual(nextMatch.p1, 'A');
    });

    it('clears downstream when changing winner', () => {
        sandbox.selectWinner(0, 0, 1); // A wins
        sandbox.selectWinner(0, 1, 1); // C wins
        sandbox.selectWinner(1, 0, 1); // A wins final

        // Now change match 0 winner to B
        sandbox.selectWinner(0, 0, 2); // B wins instead
        const finalMatch = sandbox.bracketData.rounds[1][0];
        assert.strictEqual(finalMatch.p1, 'B');
        assert.strictEqual(finalMatch.winner, null, 'Final winner should be cleared');
    });

    it('ignores click on null participant', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        const firstRound = Array.from(sandbox.bracketData.rounds[0]);
        const byeMatchIdx = firstRound.findIndex((m) => m.p1 === null || m.p2 === null);
        const byeMatch = firstRound[byeMatchIdx];
        const nullSlot = byeMatch.p1 === null ? 1 : 2;
        const prevWinner = byeMatch.winner;

        sandbox.selectWinner(0, byeMatchIdx, nullSlot);
        assert.strictEqual(byeMatch.winner, prevWinner, 'Should not change winner when clicking null');
    });
});

describe('Bracket Empty Slot Labels', () => {
    it('shows BYE in round 1 and dash in later rounds', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();

        const svg = sandbox._elements['bracket-container'].innerHTML;
        assert.ok(svg.includes('BYE'), 'Round 1 should show BYE');
        assert.ok(svg.includes('\u2014'), 'Later rounds should show dash for empty slots');
    });
});

describe('Zoom Controls', () => {
    it('increases zoom level', () => {
        sandbox._elements['bracket-names-input'].value = 'A\nB\nC\nD';
        sandbox._elements['bracket-order'].value = 'seeded';
        sandbox.generateBracket();
        sandbox.bracketZoom = 1;
        sandbox.zoomBracket(1);
        assert.strictEqual(sandbox.bracketZoom, 1.25);
    });

    it('decreases zoom level', () => {
        sandbox.bracketZoom = 1;
        sandbox.zoomBracket(-1);
        assert.strictEqual(sandbox.bracketZoom, 0.75);
    });

    it('clamps zoom at minimum 0.5', () => {
        sandbox.bracketZoom = 0.5;
        sandbox.zoomBracket(-1);
        assert.strictEqual(sandbox.bracketZoom, 0.5);
    });

    it('clamps zoom at maximum 2', () => {
        sandbox.bracketZoom = 2;
        sandbox.zoomBracket(1);
        assert.strictEqual(sandbox.bracketZoom, 2);
    });
});

describe('escapeXml', () => {
    it('escapes ampersand', () => {
        assert.strictEqual(sandbox.escapeXml('A & B'), 'A &amp; B');
    });

    it('escapes angle brackets', () => {
        assert.strictEqual(sandbox.escapeXml('<tag>'), '&lt;tag&gt;');
    });

    it('escapes quotes', () => {
        assert.strictEqual(sandbox.escapeXml('"quoted"'), '&quot;quoted&quot;');
    });

    it('returns empty string for null/undefined', () => {
        assert.strictEqual(sandbox.escapeXml(null), '');
        assert.strictEqual(sandbox.escapeXml(undefined), '');
    });
});

describe('getSeedPositions', () => {
    it('returns correct count for each size', () => {
        assert.strictEqual(sandbox.getSeedPositions(1).length, 1);
        assert.strictEqual(sandbox.getSeedPositions(2).length, 2);
        assert.strictEqual(sandbox.getSeedPositions(4).length, 4);
        assert.strictEqual(sandbox.getSeedPositions(8).length, 8);
    });

    it('contains all positions for size 4', () => {
        const positions = Array.from(sandbox.getSeedPositions(4)).sort((a, b) => a - b);
        assertEq(positions, [0, 1, 2, 3]);
    });

    it('contains all positions for size 8', () => {
        const positions = Array.from(sandbox.getSeedPositions(8)).sort((a, b) => a - b);
        assertEq(positions, [0, 1, 2, 3, 4, 5, 6, 7]);
    });
});
