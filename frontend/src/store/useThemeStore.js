import { create } from "zustand";

const DEFAULT_THEME = {
  // website
  pageBg: "#f4f4f5",
  appBg: "#ffffff",
  primary: "#2563eb",
  secondary: "#e5e7eb",
  accent: "#22c55e",

  // text
  textPrimary: "#111827",
  textSecondary: "#6b7280",

  // chat
  chatBg: "#f4f4f5",
  bubbleMine: "#2563eb",
  bubbleOther: "#e5e7eb",
};

export const useThemeStore = create((set) => ({
  theme: DEFAULT_THEME,

  setThemeValue: (key, value) =>
    set((state) => ({
      theme: {
        ...state.theme,
        [key]: value,
      },
    })),
}));
