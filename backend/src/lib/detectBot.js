export const detectBotMention = (message) => {
  if (!message) return null;

  if (message.includes("@Buddy")) {
    return message.replace("@Buddy", "").trim();
  }

  return null;
};
