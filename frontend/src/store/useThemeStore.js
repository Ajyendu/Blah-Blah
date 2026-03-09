import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

/** Bright/light mode: white backgrounds */
const DEFAULT_THEME = {
  pageBg: "#ffffff",
  appBg: "#ffffff",
  /** Conversation panel, header panel, and text input panel (one colour for all three) */
  panelBg: "#ffffff",
  primary: "#2563eb",
  secondary: "#e5e7eb",
  accent: "#ec4899",
  accentDark: "#be185d",
  /** Sidebar and app card border/background (black area) */
  darkBg: "#000000",

  textPrimary: "#111827",
  textSecondary: "#6b7280",

  chatBg: "#f4f4f5",
  bubbleMine: "#2563eb",
  bubbleOther: "#d1d5db",

  /** Search bars and message input background */
  inputBg: "#f8f9fb",
  /** Delete account button background */
  deleteBtnBg: "#dc2626",
  /** Delete account / danger zone panel background */
  dangerZoneBg: "#fef2f2",
  /** Chat list item hover background */
  chatListItemHoverBg: "#f1f5f9",
  /** Chat list selected item background */
  chatListItemSelectedBg: "#fce7f3",
  /** Chat list selected item border (transparent in light so no visible border) */
  chatListItemSelectedBorder: "transparent",
  /** Border for inputs, search bars, secondary buttons (white in dark mode) */
  surfaceBorder: "#e2e8f0",
  /** Main content card border (black in light, white in dark) */
  contentBorder: "#000000",
  /** Border for dark surfaces (e.g. delete button) – transparent in light, white in dark */
  surfaceBorderOnDark: "transparent",
  /** Divider between chat list and main content – transparent in dark to remove grey line */
  panelDivider: "#e2e8f0",
  /** Notes panel "mine" item background (accent in light, grey in dark) */
  noteMineBg: "#ec4899",
  /** Profile page: card border, avatar ring, top decorative band – transparent in dark to remove white borders */
  profileCardBorder: "#e2e8f0",
  profileAvatarRing: "rgba(255,255,255,0.9)",
  profileDecorativeBorder: "#ffffff",
};

/** Dark mode preset: multiple shades of grey/black for depth and reduced eye strain */
const DARK_THEME = {
  ...DEFAULT_THEME,
  /* Deepest background (page, chat area) */
  pageBg: "#0a0a0a",
  chatBg: "#0a0a0a",
  /* Sidebar / outer shell */
  darkBg: "#0d0d0d",
  /* Main content card – slightly lifted */
  appBg: "#111111",
  /* Panels, section cards */
  panelBg: "#141414",
  /* Inputs, search bars – elevated surface */
  inputBg: "#1a1a1a",
  /* Danger zone, modals */
  dangerZoneBg: "#141414",
  /* List hover */
  chatListItemHoverBg: "#1e1e1e",
  /* Selected item – more visible */
  chatListItemSelectedBg: "#262626",
  chatListItemSelectedBorder: "#404040",
  /* Softer borders (less glare than pure white) */
  surfaceBorder: "#404040",
  contentBorder: "transparent",
  surfaceBorderOnDark: "#525252",
  panelDivider: "transparent",
  // Notes from me should match my chat bubble colour even in dark mode
  noteMineBg: DEFAULT_THEME.noteMineBg,
  profileCardBorder: "transparent",
  profileAvatarRing: "transparent",
  profileDecorativeBorder: "transparent",
  /* Text – soft white and grey */
  textPrimary: "#e5e5e5",
  textSecondary: "#a1a1aa",
  /* Bubbles */
  bubbleMine: "#2563eb",
  bubbleOther: "#404040",
  deleteBtnBg: "#171717",
};

const STORAGE_KEY = "blah-blah-theme";
const BACKUP_KEY = "blah-blah-theme-before-reset";

const loadTheme = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_THEME, ...parsed };
    }
  } catch (_) {}
  return DEFAULT_THEME;
};

const loadBackup = () => {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (_) {}
  return null;
};

const persistThemeToServer = async (theme) => {
  try {
    await axiosInstance.put("/auth/update-profile", { theme });
  } catch (_) {
    // Ignore network errors; theme will still be applied locally
  }
};

export const useThemeStore = create((set, get) => ({
  theme: loadTheme(),
  /** Draft theme while editing in Settings; applied on Save */
  draftTheme: null,

  initDraft: () => {
    const { theme } = get();
    set({ draftTheme: theme ? { ...theme } : null });
  },

  /** Set draft to defaults; backs up current theme so undoReset() can restore */
  resetDraft: () => {
    const { theme } = get();
    try {
      if (theme) localStorage.setItem(BACKUP_KEY, JSON.stringify(theme));
    } catch (_) {}
    set({ draftTheme: { ...DEFAULT_THEME } });
  },

  setThemeValue: (key, value) =>
    set((state) => {
      const next = {
        ...state.theme,
        [key]: value,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (_) {}
      // Fire and forget: persist per-account theme on the backend
      persistThemeToServer(next);
      return { theme: next };
    }),

  setDraftValue: (key, value) =>
    set((state) => {
      if (!state.draftTheme) return state;
      const next = { ...state.draftTheme, [key]: value };
      return { draftTheme: next };
    }),

  /** Copy draft to theme and persist; applies to whole app */
  saveDraft: () => {
    const { draftTheme } = get();
    if (!draftTheme) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftTheme));
    } catch (_) {}
    set({ theme: draftTheme });
    persistThemeToServer(draftTheme);
  },

  /** Restore draft from last saved theme (e.g. undo reset without saving) */
  initDraftFromSaved: () => {
    const saved = loadTheme();
    set({ draftTheme: saved ? { ...saved } : null });
  },

  /** Restore theme from backup made before reset (undo accidental reset) */
  undoReset: () => {
    const backup = loadBackup();
    if (!backup) return false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(backup));
      localStorage.removeItem(BACKUP_KEY);
    } catch (_) {
      return false;
    }
    set({ theme: backup, draftTheme: { ...backup } });
    return true;
  },

  /** True if there is a backup to restore (after accidental reset) */
  hasResetBackup: () => !!loadBackup(),

  /** Reset theme to default and persist (applies immediately) */
  resetToDefault: () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_THEME));
    } catch (_) {}
    const next = { ...DEFAULT_THEME };
    set({ theme: next });
    persistThemeToServer(next);
  },

  /** Apply dark or light preset (used by string decoration: 50% = dark, 30% = light) */
  applyPreset: (preset) => {
    const theme = preset === "dark" ? { ...DARK_THEME } : { ...DEFAULT_THEME };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch (_) {}
    set({ theme });
    persistThemeToServer(theme);
  },

  /** Hydrate theme from account data on login/checkAuth; bright mode by default */
  hydrateFromAccountTheme: (serverTheme) => {
    const next = serverTheme
      ? { ...DEFAULT_THEME, ...serverTheme }
      : { ...DEFAULT_THEME };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (_) {}
    set({ theme: next });
  },
}));
