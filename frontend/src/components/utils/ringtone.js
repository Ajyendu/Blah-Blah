// Use real ringtone from public/call.mp3 with a silent fallback.
const SILENT_AUDIO =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";

const ringtone = new Audio();
ringtone.src = "/call.mp3";
ringtone.loop = true;
ringtone.preload = "auto";

// If call.mp3 is missing or fails to load, fall back to silent audio
ringtone.addEventListener("error", () => {
  if (ringtone.src !== SILENT_AUDIO) {
    ringtone.src = SILENT_AUDIO;
    ringtone.loop = false;
  }
});

export { ringtone };
