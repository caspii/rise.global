const { describe, it, before } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Helper: compare values across VM realms using JSON
function assertEq(actual, expected, msg) {
    assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected), msg);
}

// Load tools-common.js in a sandboxed context
let sandbox;

before(() => {
    const code = fs.readFileSync(
        path.join(__dirname, '..', 'assets', 'js', 'tools-common.js'),
        'utf8'
    );
    sandbox = {
        navigator: { clipboard: null },
        window: { location: { origin: 'https://rise.global', pathname: '/tools/test/', hash: '' } },
        document: {
            createElement: () => ({
                className: '',
                textContent: '',
                classList: { add: () => {}, remove: () => {} },
                remove: () => {},
                style: {},
                innerHTML: '',
            }),
            querySelector: () => null,
            body: { appendChild: () => {} },
            head: { appendChild: () => {} },
        },
        requestAnimationFrame: (fn) => fn(),
        setTimeout: (fn) => fn(),
        fathom: { trackEvent: () => {} },
        btoa: (s) => Buffer.from(s).toString('base64'),
        atob: (s) => Buffer.from(s, 'base64').toString(),
        encodeURIComponent,
        decodeURIComponent,
        unescape,
        escape,
        JSON,
        Math,
        console,
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
});

// ─── parseNames ───────────────────────────────────────────────

describe('parseNames', () => {
    it('splits names by newline', () => {
        assertEq(sandbox.parseNames('Alice\nBob\nCharlie'), ['Alice', 'Bob', 'Charlie']);
    });

    it('splits names by comma', () => {
        assertEq(sandbox.parseNames('Alice, Bob, Charlie'), ['Alice', 'Bob', 'Charlie']);
    });

    it('handles mixed separators', () => {
        assertEq(sandbox.parseNames('Alice, Bob\nCharlie'), ['Alice', 'Bob', 'Charlie']);
    });

    it('trims whitespace from names', () => {
        assertEq(sandbox.parseNames('  Alice  ,  Bob  '), ['Alice', 'Bob']);
    });

    it('filters out empty entries', () => {
        assertEq(sandbox.parseNames('Alice,,\n\nBob'), ['Alice', 'Bob']);
    });

    it('returns empty array for empty input', () => {
        assertEq(sandbox.parseNames(''), []);
        assertEq(sandbox.parseNames('   '), []);
        assertEq(sandbox.parseNames(null), []);
        assertEq(sandbox.parseNames(undefined), []);
    });

    it('handles single name', () => {
        assertEq(sandbox.parseNames('Alice'), ['Alice']);
    });
});

// ─── shuffleArray ─────────────────────────────────────────────

describe('shuffleArray', () => {
    it('returns an array with the same length', () => {
        const input = [1, 2, 3, 4, 5];
        const result = sandbox.shuffleArray(input);
        assert.strictEqual(result.length, input.length);
    });

    it('contains the same elements', () => {
        const input = ['a', 'b', 'c', 'd'];
        const result = Array.from(sandbox.shuffleArray(input)).sort();
        assertEq(result, ['a', 'b', 'c', 'd']);
    });

    it('does not modify the original array', () => {
        const input = [1, 2, 3];
        const original = [...input];
        sandbox.shuffleArray(input);
        assertEq(input, original);
    });

    it('handles empty array', () => {
        assertEq(sandbox.shuffleArray([]), []);
    });

    it('handles single element', () => {
        assertEq(sandbox.shuffleArray([42]), [42]);
    });

    it('produces different orderings over many runs', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const results = new Set();
        for (let i = 0; i < 50; i++) {
            results.add(Array.from(sandbox.shuffleArray(input)).join(','));
        }
        assert.ok(results.size > 1, 'shuffle should produce varied results');
    });
});

// ─── encodeStateToURL / decodeStateFromURL ────────────────────

describe('URL State Encoding', () => {
    it('encodes state to a URL with hash', () => {
        const state = { names: 'Alice\nBob', mode: 'teams' };
        const url = sandbox.encodeStateToURL(state);
        assert.ok(url.startsWith('https://rise.global/tools/test/#'));
        assert.ok(url.length > 'https://rise.global/tools/test/#'.length);
    });

    it('round-trips state through encode/decode', () => {
        const state = { names: 'Alice\nBob', count: 3 };
        const url = sandbox.encodeStateToURL(state);
        const hash = url.split('#')[1];
        sandbox.window.location.hash = '#' + hash;
        const decoded = sandbox.decodeStateFromURL();
        assertEq(decoded, state);
    });

    it('returns null for empty hash', () => {
        sandbox.window.location.hash = '';
        assert.strictEqual(sandbox.decodeStateFromURL(), null);
    });

    it('returns null for invalid hash', () => {
        sandbox.window.location.hash = '#not-valid-base64!!!';
        assert.strictEqual(sandbox.decodeStateFromURL(), null);
    });

    it('handles unicode characters', () => {
        const state = { name: 'Ren\u00e9e \u00d6stberg' };
        const url = sandbox.encodeStateToURL(state);
        const hash = url.split('#')[1];
        sandbox.window.location.hash = '#' + hash;
        const decoded = sandbox.decodeStateFromURL();
        assertEq(decoded, state);
    });
});

// ─── trackEvent ───────────────────────────────────────────────

describe('trackEvent', () => {
    it('calls fathom.trackEvent when fathom exists', () => {
        let trackedName = null;
        sandbox.fathom = { trackEvent: (name) => { trackedName = name; } };
        sandbox.trackEvent('Test Event');
        assert.strictEqual(trackedName, 'Test Event');
    });

    it('does not throw when fathom is undefined', () => {
        const savedFathom = sandbox.fathom;
        delete sandbox.fathom;
        assert.doesNotThrow(() => {
            vm.runInContext('trackEvent("Test")', sandbox);
        });
        sandbox.fathom = savedFathom;
    });
});
