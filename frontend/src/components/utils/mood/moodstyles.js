const EMOTION_COLORS = {
  love: [330, 70, 75], // pink
  happy: [120, 70, 75], // green
  angry: [0, 75, 70], // red
  sad: [220, 40, 75], // blue
};

export function applyMood(mood, intensity) {
  const [h, s, l] = EMOTION_COLORS[mood] || COLORS.neutral;

  // scale brightness smoothly
  const lightness = l - intensity * 18;

  const value = `hsl(${h}, ${s}%, ${lightness}%)`;

  document.documentElement.style.setProperty("--chat-bg", value);
}
