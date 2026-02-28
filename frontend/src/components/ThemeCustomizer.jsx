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

const COLOR_ITEMS = [
  { key: "accent", label: "Accent" },
  { key: "appBg", label: "App bg" },
  { key: "panelBg", label: "Panel (header, input)" },
  { key: "darkBg", label: "Sidebar" },
  { key: "bubbleMine", label: "My bubble" },
  { key: "bubbleOther", label: "Other bubble" },
  { key: "textPrimary", label: "Text" },
  { key: "textSecondary", label: "Text secondary" },
];

const ThemeCustomizer = ({ variant = "sections", useDraft = false }) => {
  const theme = useThemeStore((s) => s.theme);
  const draftTheme = useThemeStore((s) => s.draftTheme);
  const setThemeValue = useThemeStore((s) => s.setThemeValue);
  const setDraftValue = useThemeStore((s) => s.setDraftValue);

  const source = useDraft ? (draftTheme ?? theme) : theme;
  const setValue = useDraft ? setDraftValue : setThemeValue;

  if (!source) return null;

  if (variant === "cards") {
    return (
      <div className="theme-cards-grid">
        {COLOR_ITEMS.map(({ key, label }) => {
          const value =
            key === "darkBg"
              ? source.darkBg != null
                ? source.darkBg
                : "#000000"
              : key === "panelBg"
                ? (source.panelBg ?? "#ffffff")
                : (source[key] ?? "");
          return (
            <label key={key} className="theme-color-card">
              <span
                className="theme-color-card__swatch"
                style={{ background: value }}
              />
              <input
                type="color"
                value={value}
                onChange={(e) => setValue(key, e.target.value)}
                className="theme-color-card__input"
                aria-label={label}
              />
              <span className="theme-color-card__label">{label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <div className="theme-customizer">
      <div className="theme-section">
        <h3 className="theme-section-title">Page elements & background</h3>
        <ColorPicker
          label="Page elements (accent)"
          description="Sidebar, buttons, links — the pink parts"
          value={source.accent}
          onChange={(v) => setValue("accent", v)}
        />
        <ColorPicker
          label="Background"
          description="Main app and page background"
          value={source.appBg}
          onChange={(v) => setValue("appBg", v)}
        />
        <ColorPicker
          label="Panel (header, input)"
          description="Header panel and text input panel"
          value={source.panelBg ?? "#ffffff"}
          onChange={(v) => setValue("panelBg", v)}
        />
        <ColorPicker
          label="Sidebar & card"
          description="Dark sidebar and app card border"
          value={source.darkBg != null ? source.darkBg : "#000000"}
          onChange={(v) => setValue("darkBg", v)}
        />
      </div>

      <div className="theme-section">
        <h3 className="theme-section-title">Chat</h3>
        <ColorPicker
          label="My bubble"
          value={source.bubbleMine}
          onChange={(v) => setValue("bubbleMine", v)}
        />
        <ColorPicker
          label="Other bubble"
          value={source.bubbleOther}
          onChange={(v) => setValue("bubbleOther", v)}
        />
      </div>

      <div className="theme-section">
        <h3 className="theme-section-title">Text</h3>
        <ColorPicker
          label="Primary text"
          value={source.textPrimary}
          onChange={(v) => setValue("textPrimary", v)}
        />
        <ColorPicker
          label="Secondary text"
          value={source.textSecondary}
          onChange={(v) => setValue("textSecondary", v)}
        />
      </div>
    </div>
  );
};

export default ThemeCustomizer;
