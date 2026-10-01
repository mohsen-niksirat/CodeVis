// Web Audio Melodic Tone & Chord Synthesizer
let soundEnabled = (typeof localStorage !== 'undefined' ? localStorage.getItem("cv_sound") : null) === "true";
let audioCtx = null;

function updateSoundBtn() {
  const btn = document.getElementById("soundBtn");
  if (btn) btn.textContent = soundEnabled ? "🔊" : "🔇";
}

function playTone(freq = 440, duration = 0.08, type = "sine") {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch(e) {}
}

function playChord(notes = [523.25, 659.25, 783.99]) {
  notes.forEach((freq, idx) => {
    setTimeout(() => playTone(freq, 0.15, "triangle"), idx * 100);
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { playTone, playChord, updateSoundBtn };
}
