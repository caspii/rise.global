/* Random Team Generator */

var teamColors = [
    '#667eea', '#e53e3e', '#38a169', '#d69e2e',
    '#805ad5', '#dd6b20', '#319795', '#d53f8c',
    '#2b6cb0', '#c53030', '#2f855a', '#b7791f'
];

var lastTeams = [];

document.getElementById('split-mode').addEventListener('change', function() {
    var label = document.getElementById('split-value-label');
    label.textContent = this.value === 'teams' ? 'Number of teams:' : 'Team size:';
});

// Check for shared state on load
(function() {
    var state = decodeStateFromURL();
    if (state && state.names) {
        document.getElementById('names-input').value = state.names;
        if (state.mode) document.getElementById('split-mode').value = state.mode;
        if (state.value) document.getElementById('split-value').value = state.value;
        generateTeams();
    }
})();

function generateTeams() {
    var input = document.getElementById('names-input').value;
    var names = parseNames(input);

    if (names.length < 2) {
        showToast('Please enter at least 2 names');
        return;
    }

    var mode = document.getElementById('split-mode').value;
    var splitValue = parseInt(document.getElementById('split-value').value, 10);

    if (isNaN(splitValue) || splitValue < 1) {
        showToast('Please enter a valid number');
        return;
    }

    var numTeams;
    if (mode === 'teams') {
        numTeams = Math.min(splitValue, names.length);
    } else {
        numTeams = Math.ceil(names.length / splitValue);
    }

    if (numTeams < 1) numTeams = 1;

    var shuffled = shuffleArray(names);
    var teams = [];
    for (var i = 0; i < numTeams; i++) {
        teams.push([]);
    }
    for (var i = 0; i < shuffled.length; i++) {
        teams[i % numTeams].push(shuffled[i]);
    }

    lastTeams = teams;
    renderTeams(teams);
    trackEvent('Team Generator: Generate');

    document.getElementById('output-area').style.display = 'block';
    document.getElementById('reshuffle-btn').style.display = 'inline-flex';
}

function renderTeams(teams) {
    var grid = document.getElementById('teams-grid');
    var html = '';
    for (var i = 0; i < teams.length; i++) {
        var color = teamColors[i % teamColors.length];
        html += '<div class="team-card" style="background:' + color + '">';
        html += '<h3>Team ' + (i + 1) + ' (' + teams[i].length + ')</h3>';
        html += '<ul>';
        for (var j = 0; j < teams[i].length; j++) {
            html += '<li>' + escapeHtml(teams[i][j]) + '</li>';
        }
        html += '</ul></div>';
    }
    grid.innerHTML = html;
}

function copyResults() {
    if (!lastTeams.length) return;
    var text = '';
    for (var i = 0; i < lastTeams.length; i++) {
        text += 'Team ' + (i + 1) + ':\n';
        for (var j = 0; j < lastTeams[i].length; j++) {
            text += '  ' + lastTeams[i][j] + '\n';
        }
        text += '\n';
    }
    copyToClipboard(text.trim());
    trackEvent('Team Generator: Copy');
}

function shareLink() {
    var state = {
        names: document.getElementById('names-input').value,
        mode: document.getElementById('split-mode').value,
        value: document.getElementById('split-value').value
    };
    var url = encodeStateToURL(state);
    copyToClipboard(url);
    trackEvent('Team Generator: Share');
    showToast('Share link copied!');
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
