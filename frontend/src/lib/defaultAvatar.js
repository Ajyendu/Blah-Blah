const DEFAULT_AVATAR_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9" r="3.5"/><path d="M12 14c-3 0-5 2-5 4v1h10v-1c0-2-2-4-5-4z"/></svg>'
  );

export const DEFAULT_AVATAR_URL = DEFAULT_AVATAR_SVG;

// Random default avatars from public folder (used at signup by gender)
export const DEFAULT_AVATARS_BOY = ["/Boy1.jpeg", "/Boy2.jpeg", "/Boy3.jpeg", "/Boy4.jpeg"];
export const DEFAULT_AVATARS_GIRL = ["/Girl1.jpeg", "/Girl2.jpeg"];

export function getRandomAvatarByGender(gender) {
  if (gender === "male") {
    return DEFAULT_AVATARS_BOY[Math.floor(Math.random() * DEFAULT_AVATARS_BOY.length)];
  }
  if (gender === "female") {
    const list = DEFAULT_AVATARS_GIRL;
    return list[Math.floor(Math.random() * list.length)];
  }
  return DEFAULT_AVATAR_URL;
}

/** Stable default avatar by gender (first in list) for profile display when user has no profilePic */
export function getDefaultAvatarByGender(gender) {
  if (gender === "male") return DEFAULT_AVATARS_BOY[0];
  if (gender === "female") return DEFAULT_AVATARS_GIRL[0];
  return DEFAULT_AVATAR_URL;
}
