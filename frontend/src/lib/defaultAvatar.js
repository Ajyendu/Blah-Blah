const DEFAULT_AVATAR_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9" r="3.5"/><path d="M12 14c-3 0-5 2-5 4v1h10v-1c0-2-2-4-5-4z"/></svg>'
  );

export const DEFAULT_AVATAR_URL = DEFAULT_AVATAR_SVG;

// Random default avatars from public folder: 4 boys, 3 girls
export const DEFAULT_AVATARS_BOY = ["/Boy1.jpeg", "/Boy2.jpeg", "/Boy3.jpeg", "/Boy4.jpeg"];
export const DEFAULT_AVATARS_GIRL = ["/Girl1.jpeg", "/Girl2.jpeg", "/Girl3.jpeg"];

/** At signup: pick one randomly from 4 boys or 3 girls by gender */
export function getRandomAvatarByGender(gender) {
  if (gender === "male") {
    return DEFAULT_AVATARS_BOY[Math.floor(Math.random() * DEFAULT_AVATARS_BOY.length)];
  }
  if (gender === "female") {
    return DEFAULT_AVATARS_GIRL[Math.floor(Math.random() * DEFAULT_AVATARS_GIRL.length)];
  }
  return DEFAULT_AVATAR_URL;
}

/** Stable default avatar by gender for profile (same user always gets same one, variety across users) */
export function getDefaultAvatarByGender(gender, userId) {
  const list = gender === "male" ? DEFAULT_AVATARS_BOY : gender === "female" ? DEFAULT_AVATARS_GIRL : null;
  if (!list || list.length === 0) return DEFAULT_AVATAR_URL;
  if (!userId) return list[0];
  const str = String(userId);
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash) + str.charCodeAt(i);
  const index = Math.abs(hash) % list.length;
  return list[index];
}
