import { useThemeStore } from "../store/useThemeStore";
import { useEffect } from "react";

const ThemeSync = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    if (!theme) return;

    // Page background
    document.body.style.backgroundColor = theme.pageBg;

    // CSS variables for the whole app
    const root = document.documentElement;

    root.style.setProperty("--app-bg", theme.appBg);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--bubble-mine", theme.bubbleMine);
    root.style.setProperty("--bubble-other", theme.bubbleOther);
    root.style.setProperty("--text-primary", theme.textPrimary);
    root.style.setProperty("--text-secondary", theme.textSecondary);
  }, [theme]);

  return null;
};

export default ThemeSync;
