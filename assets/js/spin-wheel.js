/* Spin the Wheel */

var wheelColors = [
    '#667eea', '#e53e3e', '#38a169', '#d69e2e',
    '#805ad5', '#dd6b20', '#319795', '#d53f8c',
    '#2b6cb0', '#c53030', '#2f855a', '#b7791f',
    '#5a67d8', '#f56565', '#48bb78', '#ecc94b'
];

var canvas = document.getElementById('wheel-canvas');
var ctx = canvas.getContext('2d');
var options = [];
var angle = 0;
var spinning = false;
var spinVelocity = 0;
var spinHistory = [];

// Audio context for tick sound
var audioCtx = null;

function playTick() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 800;
        gain.gain.value = 0.05;
        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
    } catch (e) {}
}

function updateWheel() {
    var input = document.getElementById('options-input').value;
    options = parseNames(input);
    if (options.length === 0) {
        options = ['Option 1', 'Option 2'];
    }
    drawWheel();
}

function drawWheel() {
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var r = cx - 10;
    var sliceAngle = (2 * Math.PI) / options.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < options.length; i++) {
        var start = angle + i * sliceAngle;
        var end = start + sliceAngle;

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, end);
        ctx.closePath();
        ctx.fillStyle = wheelColors[i % wheelColors.length];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + sliceAngle / 2);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold ' + Math.min(16, Math.max(10, 200 / options.length)) + 'px DM Sans, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        var label = options[i].length > 18 ? options[i].substring(0, 16) + '...' : options[i];
        ctx.fillText(label, r - 15, 0);
        ctx.restore();
    }

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function spinWheel() {
    if (spinning) return;
    if (options.length < 2) {
        showToast('Please enter at least 2 options');
        return;
    }

    spinning = true;
    document.getElementById('spin-btn').disabled = true;
    document.getElementById('wheel-result').textContent = '';

    trackEvent('Spin Wheel: Spin');
    spinVelocity = 0.2 + Math.random() * 0.3;
    var lastSlice = -1;

    function animate() {
        angle += spinVelocity;
        spinVelocity *= 0.985;
        drawWheel();

        // Tick sound on slice change
        var sliceAngle = (2 * Math.PI) / options.length;
        var currentSlice = Math.floor(((2 * Math.PI - (angle % (2 * Math.PI))) % (2 * Math.PI)) / sliceAngle);
        if (currentSlice !== lastSlice) {
            playTick();
            lastSlice = currentSlice;
        }

        if (spinVelocity > 0.002) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            document.getElementById('spin-btn').disabled = false;
            announceResult();
        }
    }

    requestAnimationFrame(animate);
}

function announceResult() {
    var sliceAngle = (2 * Math.PI) / options.length;
    // Pointer is at top (270 degrees / -PI/2)
    var pointerAngle = (2 * Math.PI - (angle % (2 * Math.PI)) + Math.PI * 1.5) % (2 * Math.PI);
    var index = Math.floor(pointerAngle / sliceAngle) % options.length;
    var winner = options[index];

    document.getElementById('wheel-result').textContent = winner;

    spinHistory.unshift(winner);
    var historyEl = document.getElementById('spin-history');
    historyEl.style.display = 'block';
    var list = document.getElementById('history-list');
    var li = document.createElement('li');
    li.textContent = winner;
    list.insertBefore(li, list.firstChild);
}

function shareWheelLink() {
    var state = { options: document.getElementById('options-input').value };
    var url = encodeStateToURL(state);
    copyToClipboard(url);
    trackEvent('Spin Wheel: Share');
    showToast('Share link copied!');
}

// Init
(function() {
    var state = decodeStateFromURL();
    if (state && state.options) {
        document.getElementById('options-input').value = state.options;
    }
    updateWheel();
})();
