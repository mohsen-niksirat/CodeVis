const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

let patches = 0;

// Feature 1: Reset Progress Button
if (!html.includes('id="resetBtn"')) {
  html = html.replace(
    '<button class="theme-btn" id="themeBtn" aria-label="Toggle theme"></button>',
    `<button class="theme-btn" id="resetBtn" aria-label="Reset Progress" title="Reset All Data" style="color:var(--red);border-color:var(--red);" onclick="if(confirm('Are you sure you want to reset all progress?')) { for(const k of Object.keys(localStorage)) if(k.startsWith('cv_')) localStorage.removeItem(k); location.reload(); }">&#x1F5D1;</button>
<button class="theme-btn" id="themeBtn" aria-label="Toggle theme"></button>`
  );
  patches++;
}

// Feature 2 & 3: Code Font Size and Collapse Code
if (!html.includes('changeFontSize')) {
  html = html.replace(
    '<div class="code-tabs" id="codeLangTabs"',
    `<div style="display:flex;gap:12px;align-items:center;">
<div style="display:flex;gap:4px;align-items:center;">
<button onclick="changeFontSize(-1)" class="code-tab" title="Decrease Font Size" aria-label="Decrease Font Size">A-</button>
<button onclick="changeFontSize(1)" class="code-tab" title="Increase Font Size" aria-label="Increase Font Size">A+</button>
<button onclick="toggleCodeCollapse()" class="code-tab" title="Toggle Code Visibility" id="codeToggleBtn" aria-label="Toggle Code">Hide</button>
</div>
<div class="code-tabs" id="codeLangTabs"`
  );
  // Close the new flex wrapper after codeLangTabs
  html = html.replace(
    '</button>\r\n</div>\r\n</div>',
    '</button>\r\n</div>\r\n</div>\r\n</div>'
  );
  // Also try replacing \n in case it uses LF
  html = html.replace(
    '</button>\n</div>\n</div>',
    '</button>\n</div>\n</div>\n</div>'
  );
  
  const jsLogic = `
let currentFontSize = 0.8;
function changeFontSize(delta) {
    currentFontSize = Math.max(0.5, Math.min(1.5, currentFontSize + delta * 0.1));
    const cb = document.getElementById('codeBlock');
    if (cb) cb.style.fontSize = currentFontSize.toFixed(1) + 'rem';
}
function toggleCodeCollapse() {
    const cb = document.getElementById('codeBlock');
    const tb = document.getElementById('codeToggleBtn');
    if (cb.style.display === 'none') {
        cb.style.display = 'block';
        tb.textContent = 'Hide'; 
    } else {
        cb.style.display = 'none';
        tb.textContent = 'Show';
    }
}
`;
  html = html.replace(
    '// Dynamic Variable Inspector',
    jsLogic + '\n// Dynamic Variable Inspector'
  );
  patches++;
}

// Feature 4: Concept Bookmarking (Favorites)
if (!html.includes('id="favFilter"')) {
  html = html.replace(
    '<select id="categoryFilter"',
    `<select id="favFilter" aria-label="Favorites filter" style="width:110px">
<option value="all">All</option>
<option value="fav">&#x2B50; Favorites</option>
</select>
<select id="categoryFilter"`
  );
  
  const favLogic = `
let favorites = new Set(JSON.parse(localStorage.getItem('cv_favorites') || '[]'));
function toggleFav(id, e) {
    e.stopPropagation();
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    localStorage.setItem('cv_favorites', JSON.stringify([...favorites]));
    filterAndLoad(); // Refresh gallery
}
`;
  html = html.replace(
    '// Dynamic Variable Inspector',
    favLogic + '\n// Dynamic Variable Inspector'
  );
  
  html = html.replace(
    'const seen=seenIds.has(c.id);',
    'const seen=seenIds.has(c.id); const isFav=favorites.has(c.id);'
  );
  html = html.replace(
    '`<div class="gallery-card ${seen?"seen":""}"',
    '`<div class="gallery-card ${seen?"seen":""}" style="position:relative;"'
  );
  html = html.replace(
    '${t(c.title)}</h3>`',
    `\${t(c.title)}</h3><div onclick="toggleFav('\\\${c.id}', event)" style="position:absolute;top:8px;right:8px;cursor:pointer;font-size:1.2rem;z-index:10;opacity:0.8">\${isFav?"\\u2B50":"\\u2606"}</div>\``
  );
  
  html = html.replace(
    'q=document.getElementById("search").value.toLowerCase();',
    'q=document.getElementById("search").value.toLowerCase(),fav=document.getElementById("favFilter").value;'
  );
  html = html.replace(
    'c.level===lvl)&&',
    'c.level===lvl)&&(fav==="all"||favorites.has(c.id))&&'
  );
  html = html.replace(
    'document.getElementById("categoryFilter").onchange=filterAndLoad;',
    'document.getElementById("favFilter").onchange=filterAndLoad;\ndocument.getElementById("categoryFilter").onchange=filterAndLoad;'
  );
  
  patches++;
}

// Feature 5: Study Timer (Pomodoro) Widget
if (!html.includes('pomodoroTimer')) {
  html = html.replace(
    '<div class="streak" id="streak" aria-label="Current streak"></div>',
    `<div class="streak" id="streak" aria-label="Current streak"></div>
<div id="pomodoroTimer" class="streak" style="cursor:pointer;display:flex;align-items:center;gap:4px;" title="Focus Timer" onclick="toggleTimer()">
<span id="timerDisplay">&#x23F1; 25:00</span>
</div>`
  );
  
  const timerLogic = `
let timerInt = null;
let timeLeft = 25 * 60;
let isWorking = true;

function toggleTimer() {
    if (timerInt) {
        clearInterval(timerInt);
        timerInt = null;
    } else {
        if (timeLeft === 0) timeLeft = isWorking ? 5 * 60 : 25 * 60;
        timerInt = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timerInt);
                timerInt = null;
                isWorking = !isWorking;
                if(typeof cvToast === 'function') cvToast(isWorking ? "Break over, back to work!" : "Time for a break!");
                if(typeof playSonification === 'function' && soundEnabled) playSonification(800, 0.1, 1000);
            }
            updateTimerDisplay();
        }, 1000);
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const d = document.getElementById('timerDisplay');
    if (!d) return;
    const m = Math.floor(Math.max(0, timeLeft) / 60).toString().padStart(2, '0');
    const s = (Math.max(0, timeLeft) % 60).toString().padStart(2, '0');
    d.innerHTML = (isWorking ? "&#x1F345; " : "&#x2615; ") + m + ":" + s;
    if (timerInt) d.style.color = "var(--accent)";
    else d.style.color = "";
}
`;
  html = html.replace(
    '// Dynamic Variable Inspector',
    timerLogic + '\n// Dynamic Variable Inspector'
  );
  patches++;
}


fs.writeFileSync(htmlPath, html, 'utf8');
console.log("--- Phase 21 OK: " + patches + " patch(es) ---");
