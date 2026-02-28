import { create } from "zustand";

const DEFAULT_THEME = {
  pageBg: "#f4f4f5",
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
  bubbleOther: "#e5e7eb",
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
    set({ theme: { ...DEFAULT_THEME } });
  },
}));
