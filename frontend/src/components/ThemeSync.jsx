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

    // In bright mode (white page bg), main content area is always white
    const isBrightMode = theme.pageBg === "#ffffff" || theme.pageBg === "#f4f4f5";
    const appBg = isBrightMode ? "#ffffff" : (theme.appBg ?? "#ffffff");
    root.style.setProperty("--app-bg", appBg);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-dark", theme.accentDark || theme.accent);
    root.style.setProperty(
      "--dark-bg",
      theme.darkBg != null ? theme.darkBg : "#000000",
    );
    root.style.setProperty("--bubble-mine", theme.bubbleMine);
    root.style.setProperty("--bubble-other", theme.bubbleOther);
    root.style.setProperty("--text-primary", theme.textPrimary);
    root.style.setProperty("--text-secondary", theme.textSecondary);
    root.style.setProperty("--chat-bg", theme.chatBg);
    if (theme.chatBg === "#0f0f0f" || theme.chatBg === "#000000" || theme.chatBg === "#0a0a0a" || theme.pageBg === "#0f0f0f" || theme.pageBg === "#000000" || theme.pageBg === "#0a0a0a") {
      root.style.setProperty("--chat-mood-bg", theme.chatBg);
    }
    root.style.setProperty("--panel-bg", theme.panelBg ?? "#ffffff");
    root.style.setProperty("--page-bg", theme.pageBg);
    root.style.setProperty("--input-bg", theme.inputBg ?? "#f8f9fb");
    root.style.setProperty("--delete-btn-bg", theme.deleteBtnBg ?? "#dc2626");
    root.style.setProperty("--danger-zone-bg", theme.dangerZoneBg ?? "#fef2f2");
    root.style.setProperty("--chat-list-item-hover-bg", theme.chatListItemHoverBg ?? "#f1f5f9");
    root.style.setProperty("--chat-list-item-selected-bg", theme.chatListItemSelectedBg ?? "#fce7f3");
    root.style.setProperty("--chat-list-item-selected-border", theme.chatListItemSelectedBorder ?? "transparent");
    root.style.setProperty("--surface-border", theme.surfaceBorder ?? "#e2e8f0");
    const isDark =
      theme.chatBg === "#0f0f0f" ||
      theme.chatBg === "#000000" ||
      theme.chatBg === "#0a0a0a" ||
      theme.pageBg === "#0f0f0f" ||
      theme.pageBg === "#000000" ||
      theme.pageBg === "#0a0a0a";
    root.style.setProperty(
      "--content-border",
      isDark ? "transparent" : (theme.contentBorder ?? "#000000"),
    );
    root.style.setProperty("--surface-border-on-dark", theme.surfaceBorderOnDark ?? "transparent");
    root.style.setProperty("--panel-divider", theme.panelDivider ?? "#e2e8f0");
    root.style.setProperty("--note-mine-bg", theme.noteMineBg ?? "#ec4899");
    root.style.setProperty("--profile-card-border", theme.profileCardBorder ?? "#e2e8f0");
    root.style.setProperty("--profile-avatar-ring", theme.profileAvatarRing ?? "rgba(255,255,255,0.9)");
    root.style.setProperty("--profile-decorative-border", theme.profileDecorativeBorder ?? "#ffffff");
    /* Auth left panel (illustration area): white in bright mode, dark in dark mode */
    root.style.setProperty("--auth-illus-bg", theme.appBg ?? "#ffffff");
  }, [theme]);

  return null;
};

export default ThemeSync;
