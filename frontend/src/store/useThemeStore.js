import { create } from "zustand";

const DEFAULT_THEME = {
  pageBg: "#f4f4f5",
  appBg: "#ffffff",
  primary: "#2563eb",
  secondary: "#e5e7eb",
  accent: "#ec4899",
  accentDark: "#be185d",

  textPrimary: "#111827",
  textSecondary: "#6b7280",

  chatBg: "#f4f4f5",
  bubbleMine: "#2563eb",
  bubbleOther: "#e5e7eb",
};

const STORAGE_KEY = "blah-blah-theme";

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

export const useThemeStore = create((set, get) => ({
  theme: loadTheme(),
  /** Draft theme while editing in Settings; applied on Save */
  draftTheme: null,

  initDraft: () => {
    const { theme } = get();
    set({ draftTheme: theme ? { ...theme } : null });
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
}));
