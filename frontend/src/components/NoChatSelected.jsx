import "./NoChatSelected.css";
import { useThemeStore } from "../store/useThemeStore";

const DARK_BG_VALUES = ["#0a0a0a", "#0f0f0f", "#000000"];

const NoChatSelected = () => {
  const theme = useThemeStore((s) => s.theme);
  const isDarkMode =
    theme &&
    (DARK_BG_VALUES.includes(theme.chatBg) || DARK_BG_VALUES.includes(theme.pageBg));

  return (
    <div
      className={`no-chat-ref${isDarkMode ? " no-chat-ref--dark" : ""}`}
      style={
        isDarkMode
          ? {
              backgroundColor: theme.chatBg || theme.pageBg || "#0a0a0a",
            }
          : undefined
      }
    >
      {!isDarkMode && (
        <img
          src="/wall.png"
          alt=""
          className="no-chat-ref__illus"
        />
      )}
    </div>
  );
};

export default NoChatSelected;
