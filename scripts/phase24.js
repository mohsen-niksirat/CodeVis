// phase24.js — a11y: aria-labels for icon-only / ambiguous buttons.
// Idempotent: each patch is a one-time string replace, skipped when already applied.
const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(p, 'utf8');
let n = 0;

const patch = (name, oldS, newS) => {
  if (!html.includes(newS) && html.includes(oldS)) {
    html = html.replace(oldS, newS);
    n++;
    console.log(`[phase24-${n}] ${name}`);
  }
};

// Calendar prev/next — screen readers currently announce just "<" / ">".
patch('aria-label on calendar prev',
  '<button class="cal-nav" id="calPrev">&lt;</button>',
  '<button class="cal-nav" id="calPrev" aria-label="Previous month">&lt;</button>');
patch('aria-label on calendar next',
  '<button class="cal-nav" id="calNext">&gt;</button>',
  '<button class="cal-nav" id="calNext" aria-label="Next month">&gt;</button>');

// Modal close "✕" buttons — announce "Close dialog" instead of the glyph.
patch('aria-label on Big-O close',
  '<button class="secondary" onclick="closeBigOModal()" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button>',
  '<button class="secondary" onclick="closeBigOModal()" aria-label="Close dialog" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button>');
patch('aria-label on Battle close',
  '<button class="secondary" onclick="closeBattleModal()" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button>',
  '<button class="secondary" onclick="closeBattleModal()" aria-label="Close dialog" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button>');
patch('aria-label on Shortcuts close',
  '<button class="secondary" onclick="document.getElementById(\'shortcutsModal\').style.display=\'none\'" style="padding:4px 10px;cursor:pointer">✕</button>',
  '<button class="secondary" onclick="document.getElementById(\'shortcutsModal\').style.display=\'none\'" aria-label="Close dialog" style="padding:4px 10px;cursor:pointer">✕</button>');

// Speed presets — announce intent, not just the multiplier glyph.
patch('aria-label on 0.5x preset',
  '<button class="secondary preset" data-mult="2">0.5x</button>',
  '<button class="secondary preset" data-mult="2" aria-label="Half speed">0.5x</button>');
patch('aria-label on 1x preset',
  '<button class="secondary preset active" data-mult="1">1x</button>',
  '<button class="secondary preset active" data-mult="1" aria-label="Normal speed">1x</button>');
patch('aria-label on 2x preset',
  '<button class="secondary preset" data-mult="0.5">2x</button>',
  '<button class="secondary preset" data-mult="0.5" aria-label="Double speed">2x</button>');
patch('aria-label on 4x preset',
  '<button class="secondary preset" data-mult="0.25">4x</button>',
  '<button class="secondary preset" data-mult="0.25" aria-label="Quadruple speed">4x</button>');

// Drill modal close button.
patch('aria-label on Drill close',
  '<button class="secondary" onclick="closeDrillModal()" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button>',
  '<button class="secondary" onclick="closeDrillModal()" aria-label="Close dialog" style="padding:4px 10px;border-radius:6px;cursor:pointer">✕</button>');

fs.writeFileSync(p, html, 'utf8');
console.log(`--- Phase 24 OK: ${n} patch(es) ---`);
