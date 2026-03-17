/* Shared utilities for rise.global tools */

function trackEvent(name) {
    if (typeof fathom !== 'undefined') {
        fathom.trackEvent(name);
    }
}

function parseNames(input) {
    if (!input || !input.trim()) return [];
    return input
        .split(/[\n,]+/)
        .map(function(n) { return n.trim(); })
        .filter(function(n) { return n.length > 0; });
}

function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a;
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            showToast('Copied to clipboard!');
        });
    } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Copied to clipboard!');
    }
}

function exportAsImage(element, filename) {
    trackEvent('Tool: Export Image');
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = function() {
        html2canvas(element, { backgroundColor: '#ffffff', scale: 2 }).then(function(canvas) {
            var link = document.createElement('a');
            link.download = filename || 'export.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('Image downloaded!');
        });
    };
    if (typeof html2canvas === 'undefined') {
        document.head.appendChild(script);
    } else {
        html2canvas(element, { backgroundColor: '#ffffff', scale: 2 }).then(function(canvas) {
            var link = document.createElement('a');
            link.download = filename || 'export.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('Image downloaded!');
        });
    }
}

function encodeStateToURL(state) {
    var json = JSON.stringify(state);
    var encoded = btoa(unescape(encodeURIComponent(json)));
    var url = window.location.origin + window.location.pathname + '#' + encoded;
    return url;
}

function decodeStateFromURL() {
    var hash = window.location.hash.substring(1);
    if (!hash) return null;
    try {
        var json = decodeURIComponent(escape(atob(hash)));
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}

function showToast(message) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
        toast.classList.add('show');
    });

    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 2500);
}
