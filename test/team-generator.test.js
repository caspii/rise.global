const { describe, it, before } = require('node:test');
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
        path.join(__dirname, '..', 'assets', 'js', 'team-generator.js'),
        'utf8'
    );

    const elements = {
        'names-input': { value: '' },
        'split-mode': { value: 'teams', addEventListener: () => {} },
        'split-value': { value: '2' },
        'split-value-label': { textContent: '' },
        'output-area': { style: {} },
        'reshuffle-btn': { style: {} },
        'teams-grid': { innerHTML: '' },
    };

    sandbox = {
        navigator: { clipboard: null },
        window: { location: { origin: 'https://rise.global', pathname: '/tools/random-team-generator/', hash: '' } },
        document: {
            getElementById: (id) => elements[id] || { value: '', style: {}, innerHTML: '', addEventListener: () => {} },
            createElement: (tag) => {
                const el = {
                    className: '', _textContent: '', innerHTML: '',
                    classList: { add: () => {}, remove: () => {} },
                    remove: () => {}, style: {},
                };
                Object.defineProperty(el, 'textContent', {
                    set: function(v) {
                        this._textContent = v;
                        this.innerHTML = v
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;');
                    },
                    get: function() { return this._textContent; },
                });
                return el;
            },
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

describe('Team Generator Logic', () => {
    it('generates correct number of teams', () => {
        sandbox._elements['names-input'].value = 'Alice\nBob\nCharlie\nDiana\nEve\nFrank';
        sandbox._elements['split-mode'].value = 'teams';
        sandbox._elements['split-value'].value = '3';
        sandbox.generateTeams();

        assert.strictEqual(sandbox.lastTeams.length, 3);
    });

    it('distributes all names across teams', () => {
        sandbox._elements['names-input'].value = 'A\nB\nC\nD\nE';
        sandbox._elements['split-mode'].value = 'teams';
        sandbox._elements['split-value'].value = '2';
        sandbox.generateTeams();

        const allNames = Array.from(sandbox.lastTeams).flatMap((t) => Array.from(t));
        assert.strictEqual(allNames.length, 5);
        assert.ok(allNames.includes('A'));
        assert.ok(allNames.includes('E'));
    });

    it('creates balanced teams (max 1 difference)', () => {
        sandbox._elements['names-input'].value = 'A\nB\nC\nD\nE\nF\nG';
        sandbox._elements['split-mode'].value = 'teams';
        sandbox._elements['split-value'].value = '3';
        sandbox.generateTeams();

        const sizes = Array.from(sandbox.lastTeams).map((t) => t.length);
        const min = Math.min(...sizes);
        const max = Math.max(...sizes);
        assert.ok(max - min <= 1, `Team sizes should differ by at most 1, got ${sizes}`);
    });

    it('handles split by team size', () => {
        sandbox._elements['names-input'].value = 'A\nB\nC\nD\nE\nF';
        sandbox._elements['split-mode'].value = 'size';
        sandbox._elements['split-value'].value = '2';
        sandbox.generateTeams();

        assert.strictEqual(sandbox.lastTeams.length, 3);
    });

    it('caps teams at number of names', () => {
        sandbox._elements['names-input'].value = 'A\nB';
        sandbox._elements['split-mode'].value = 'teams';
        sandbox._elements['split-value'].value = '10';
        sandbox.generateTeams();

        assert.strictEqual(sandbox.lastTeams.length, 2);
    });

    it('does not generate with fewer than 2 names', () => {
        // Generate valid teams first
        sandbox._elements['names-input'].value = 'X\nY';
        sandbox._elements['split-mode'].value = 'teams';
        sandbox._elements['split-value'].value = '2';
        sandbox.generateTeams();
        const prevLength = sandbox.lastTeams.length;

        // Try with 1 name - should not change lastTeams
        sandbox._elements['names-input'].value = 'Alice';
        sandbox.generateTeams();
        assert.strictEqual(sandbox.lastTeams.length, prevLength);
    });
});

describe('escapeHtml', () => {
    it('escapes HTML entities', () => {
        const result = sandbox.escapeHtml('<script>alert("xss")</script>');
        assert.ok(!result.includes('<script>'));
        assert.ok(result.includes('&lt;'));
    });
});
