/** Stable list (Unsplash) — same order as frontend `defaultAvatar.js` for consistency */
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

export function getRandomAnimalAvatarUrl() {
  const i = Math.floor(Math.random() * ANIMAL_AVATAR_URLS.length);
  return ANIMAL_AVATAR_URLS[i];
}
