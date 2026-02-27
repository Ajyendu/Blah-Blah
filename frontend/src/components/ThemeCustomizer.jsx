import { useThemeStore } from "../store/useThemeStore";

const ColorPicker = ({ label, value, onChange, description }) => (
  <div className="theme-picker-row">
    <div>
      <span className="theme-picker-label">{label}</span>
      {description && <p className="theme-picker-desc">{description}</p>}
    </div>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="theme-picker-input"
      aria-label={label}
    />
  </div>
);

const ThemeCustomizer = () => {
  const theme = useThemeStore((s) => s.theme);
  const setThemeValue = useThemeStore((s) => s.setThemeValue);

  if (!theme) return null;

  return (
    <div className="theme-customizer">
      <div className="theme-section">
        <h3 className="theme-section-title">Page elements & background</h3>
        <ColorPicker
          label="Page elements (accent)"
          description="Sidebar, buttons, links — the pink parts"
          value={theme.accent}
          onChange={(v) => setThemeValue("accent", v)}
        />
        <ColorPicker
          label="Darker accent (hover/active)"
          description="Used for active and hover states"
          value={theme.accentDark || theme.accent}
          onChange={(v) => setThemeValue("accentDark", v)}
        />
        <ColorPicker
          label="Background"
          description="Main app and page background"
          value={theme.appBg}
          onChange={(v) => setThemeValue("appBg", v)}
        />
        <ColorPicker
          label="Page background"
          description="Outer page area"
          value={theme.pageBg}
          onChange={(v) => setThemeValue("pageBg", v)}
        />
      </div>

      <div className="theme-section">
        <h3 className="theme-section-title">Chat</h3>
        <ColorPicker
          label="Chat background"
          value={theme.chatBg}
          onChange={(v) => setThemeValue("chatBg", v)}
        />
        <ColorPicker
          label="My bubble"
          value={theme.bubbleMine}
          onChange={(v) => setThemeValue("bubbleMine", v)}
        />
        <ColorPicker
          label="Other bubble"
          value={theme.bubbleOther}
          onChange={(v) => setThemeValue("bubbleOther", v)}
        />
      </div>
    </div>
  );
};

export default ThemeCustomizer;
