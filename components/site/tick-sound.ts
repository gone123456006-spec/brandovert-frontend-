"use client";

const MIN_TICK_GAP_MS = 55;
const VOLUME = 0.25;
const UNLOCK_EVENTS = ["pointerdown", "pointerup", "mousedown", "touchend", "keydown", "click"] as const;

const PLAYED_KEY = "brandovert:count-sound-played";

let ctx: AudioContext | null = null;
let lastTick = 0;
let unlockListening = false;
let playedThisVisit = false;

// The sound plays once per visit; counters that run again afterwards are silent.
function alreadyPlayed() {
  if (playedThisVisit) return true;
  try {
    playedThisVisit = sessionStorage.getItem(PLAYED_KEY) === "1";
  } catch {}
  return playedThisVisit;
}

function markPlayed() {
  playedThisVisit = true;
  try {
    sessionStorage.setItem(PLAYED_KEY, "1");
  } catch {}
}

// The visitor may have tapped on another page before navigating here, which
// still counts as the gesture browsers require before audio may play.
function hasInteracted() {
  return typeof navigator !== "undefined" && navigator.userActivation?.hasBeenActive === true;
}

function ensureRunning() {
  if (!ctx) {
    if (!hasInteracted()) return false;
    ctx = new AudioContext();
  }
  if (ctx.state === "suspended" && hasInteracted()) void ctx.resume();
  return ctx.state === "running";
}

// Browsers only allow audio after a tap, click or key press, so the context is
// created on the first gesture and ticks before that are silently skipped.
export function listenForAudioUnlock() {
  if (unlockListening || typeof window === "undefined") return;
  unlockListening = true;
  ensureRunning();
  const unlock = () => {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    // iOS Safari only unlocks once a sound actually starts inside the gesture.
    const silent = ctx.createBufferSource();
    silent.buffer = ctx.createBuffer(1, 1, 22050);
    silent.connect(ctx.destination);
    silent.start();
    if (ctx.state === "running") {
      for (const type of UNLOCK_EVENTS) window.removeEventListener(type, unlock);
    }
  };
  for (const type of UNLOCK_EVENTS) window.addEventListener(type, unlock, { passive: true });
}

function blip(frequency: number, duration: number, volume: number, type: OscillatorType) {
  if (!ensureRunning() || !ctx) return false;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
  return true;
}

// Shared by every counter on the page, so simultaneous counters make one tick.
export function playTick() {
  if (alreadyPlayed()) return;
  const now = performance.now();
  if (now - lastTick < MIN_TICK_GAP_MS) return;
  lastTick = now;
  blip(900 + Math.random() * 120, 0.05, VOLUME, "triangle");
}

let lastDone = 0;
export function playDone() {
  if (alreadyPlayed()) return;
  const now = performance.now();
  if (now - lastDone < 500) return;
  lastDone = now;
  // Only a run the visitor actually heard counts; muted runs (before the first tap) don't.
  if (!blip(880, 0.4, VOLUME * 0.7, "sine")) return;
  markPlayed();
  setTimeout(() => blip(1320, 0.5, VOLUME * 0.55, "sine"), 90);
}
