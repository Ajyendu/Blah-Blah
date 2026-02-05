export default function generateUserCode() {
  // Example: CHAT-8F3K2Q
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
