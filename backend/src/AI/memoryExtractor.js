export const extractMemory = (message) => {
  const lower = message.toLowerCase();

  if (!lower.includes("remember")) return null;

  // simple extraction (mock mode friendly)
  const cleaned = message
    .replace(/@Buddy/i, "")
    .replace(/remember/i, "")
    .trim();

  if (!cleaned) return null;

  return cleaned;
};
