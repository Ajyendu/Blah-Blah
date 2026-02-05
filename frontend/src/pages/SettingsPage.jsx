import { Send } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import ThemeCustomizer from "../components/ThemeCustomizer";

const PREVIEW_MESSAGES = [
  { id: 1, text: "Hey! How's it going?", mine: false },
  {
    id: 2,
    text: "I'm doing great! Just working on some new features.",
    mine: true,
  },
];

const SettingsPage = () => {
  const theme = useThemeStore((s) => s.theme);

  if (!theme) return null;

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-8">
        {/* HEADER */}
        <div>
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="text-sm">Customize your chat colors</p>
        </div>

        {/* 🎨 COLOR PICKERS */}

        {/* 👀 PREVIEW */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Preview</h3>

          <div className="rounded-xl overflow-hidden shadow-lg border">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium"></div>
                <div>
                  <h3 className="font-medium text-sm">John Doe</h3>
                  <p className="text-xs">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 min-h-[220px] max-h-[220px] overflow-y-auto">
              {PREVIEW_MESSAGES.map((msg) => {
                const isMine = msg.mine;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[75%] rounded-2xl px-3 py-2 shadow-sm">
                      <p className="text-sm leading-snug">{msg.text}</p>
                      <p className="text-[10px] mt-1 text-right opacity-70">
                        12:00 PM
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 h-10 px-3 rounded-lg text-sm outline-none"
                  placeholder="Type a message..."
                  value="This is a preview"
                  readOnly
                />
                <button className="h-10 w-10 rounded-lg flex items-center justify-center">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
