import { useThemeStore } from "../store/useThemeStore";

const ColorPicker = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-sm">{label}</span>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-10 h-10 rounded cursor-pointer"
    />
  </div>
);

const ThemeCustomizer = () => {
  const theme = useThemeStore((s) => s.theme);
  const setThemeValue = useThemeStore((s) => s.setThemeValue);

  if (!theme) return null;

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-xl">
        <h3 className="font-semibold mb-3">Website</h3>
        <ColorPicker
          label="Page Background"
          value={theme.pageBg}
          onChange={(v) => setThemeValue("pageBg", v)}
        />
        <ColorPicker
          label="App Background"
          value={theme.appBg}
          onChange={(v) => setThemeValue("appBg", v)}
        />
        <ColorPicker
          label="Primary"
          value={theme.primary}
          onChange={(v) => setThemeValue("primary", v)}
        />
        <ColorPicker
          label="Accent"
          value={theme.accent}
          onChange={(v) => setThemeValue("accent", v)}
        />
      </div>

      <div className="p-4 border rounded-xl">
        <h3 className="font-semibold mb-3">Chat</h3>
        <ColorPicker
          label="Chat Background"
          value={theme.chatBg}
          onChange={(v) => setThemeValue("chatBg", v)}
        />
        <ColorPicker
          label="My Bubble"
          value={theme.bubbleMine}
          onChange={(v) => setThemeValue("bubbleMine", v)}
        />
        <ColorPicker
          label="Other Bubble"
          value={theme.bubbleOther}
          onChange={(v) => setThemeValue("bubbleOther", v)}
        />
        <ColorPicker
          label="Text"
          value={theme.textPrimary}
          onChange={(v) => setThemeValue("textPrimary", v)}
        />
      </div>
    </div>
  );
};

export default ThemeCustomizer;
