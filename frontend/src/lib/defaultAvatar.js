const DEFAULT_AVATAR_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9" r="3.5"/><path d="M12 14c-3 0-5 2-5 4v1h10v-1c0-2-2-4-5-4z"/></svg>'
  );

export const DEFAULT_AVATAR_URL = DEFAULT_AVATAR_SVG;

/** Animal profile photos (Unsplash) — keep in sync with backend `animalAvatars.js` */
export const ANIMAL_AVATAR_URLS = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc9627d?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1543548789-05f6d0ae145c?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=400&fit=crop&q=80",
];

/** New account: random animal avatar */
export function getRandomAnimalAvatar() {
  return ANIMAL_AVATAR_URLS[
    Math.floor(Math.random() * ANIMAL_AVATAR_URLS.length)
  ];
}

/** When user has no profilePic, pick a stable animal per user id (deterministic) */
export function getDefaultAnimalAvatar(userId) {
  if (!ANIMAL_AVATAR_URLS.length) return DEFAULT_AVATAR_URL;
  if (!userId) return ANIMAL_AVATAR_URLS[0];
  const str = String(userId);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
  }
  const index = Math.abs(hash) % ANIMAL_AVATAR_URLS.length;
  return ANIMAL_AVATAR_URLS[index];
}
