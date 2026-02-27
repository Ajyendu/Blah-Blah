// Silent audio so no 404 when /ringtone.mp3 is missing. Add ringtone.mp3 to public/ and use it below for real ring.
const SILENT_AUDIO =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
const ringtone = new Audio(SILENT_AUDIO);
ringtone.loop = true;

export { ringtone };
