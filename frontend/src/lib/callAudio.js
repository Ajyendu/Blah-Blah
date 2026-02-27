/**
 * Call audio: unlock on user gesture, play remote stream.
 * Browsers require one user gesture to allow sound — we use the Call/Accept click
 * to unlock, then play when stream arrives. If that fails, one tap on the call UI starts sound.
 */

let outputEl = null;
let outputCtx = null;
let outputSource = null;

/**
 * Call at the very start of startCall/answerCall (same sync stack as button click).
 * Creates and unlocks the audio element and AudioContext (play silent buffer so context is "running").
 */
export function unlockForCall() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (Ctx && !outputCtx) {
    outputCtx = new Ctx();
  }
  if (outputCtx) {
    outputCtx.resume().catch(() => {});
    try {
      const buf = outputCtx.createBuffer(1, outputCtx.sampleRate * 0.05, outputCtx.sampleRate);
      const src = outputCtx.createBufferSource();
      src.buffer = buf;
      src.connect(outputCtx.destination);
      src.start(0);
    } catch (_) {}
  }

  if (!outputEl) {
    outputEl = document.createElement("audio");
    outputEl.setAttribute("playsinline", "true");
    outputEl.volume = 1;
    outputEl.muted = false;
    outputEl.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0.01;pointer-events:none;";
    document.body.appendChild(outputEl);
  }
  outputEl.play().catch(() => {});
}

/**
 * Play the remote stream. Call when stream is ready, or from a user tap.
 */
export function playRemoteStream(stream) {
  if (!stream || !stream.getAudioTracks || stream.getAudioTracks().length === 0) return;
  stream.getAudioTracks().forEach((t) => { t.enabled = true; });

  if (outputEl) {
    outputEl.srcObject = stream;
    outputEl.volume = 1;
    outputEl.muted = false;
    outputEl.play().catch(() => {});
  }

  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (Ctx && outputCtx) {
    if (outputSource) {
      try { outputSource.disconnect(); } catch (_) {}
      outputSource = null;
    }
    try {
      outputSource = outputCtx.createMediaStreamSource(stream);
      outputSource.connect(outputCtx.destination);
      outputCtx.resume().catch(() => {});
    } catch (_) {}
  }
}

export function stopRemoteAudio() {
  if (outputEl) {
    outputEl.srcObject = null;
  }
  if (outputSource && outputCtx) {
    try { outputSource.disconnect(); } catch (_) {}
    outputSource = null;
  }
  outputCtx = null;
}
