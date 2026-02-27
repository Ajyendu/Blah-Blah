import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import ThemeCustomizer from "../components/ThemeCustomizer";
import Sidebar from "../components/Sidebar";
import "./Homepage.css";
import "./SettingsPage.css";

const PREVIEW_MESSAGES = [
  { id: 1, text: "Hey! How's it going?", mine: false },
  {
    id: 2,
    text: "I'm doing great! Just working on some new features.",
    mine: true,
  },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const theme = useThemeStore((s) => s.theme);
  const { deleteAccount } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!theme) return null;

  return (
    <div className="app-shell h-screen w-screen flex">
      <div className="app-card flex flex-1 m-6 overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="app-content-wrap flex-1 flex min-w-0 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="container mx-auto max-w-5xl space-y-8">
              {/* HEADER */}
              <div>
                <h2 className="text-lg font-semibold">Appearance</h2>
                <p className="text-sm">Customize your chat colors</p>
              </div>

              {/* 🎨 COLOR PICKERS */}
              <ThemeCustomizer />

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

              {/* DANGER ZONE – Delete account */}
              <div className="settings-danger-zone">
                <h3>Delete account</h3>
                <p>
                  Permanently delete your account and data. This cannot be undone.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="settings-delete-btn"
                >
                  Delete my account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="settings-delete-overlay"
          onClick={() => !isDeleting && setShowDeleteModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-delete-title"
        >
          <div
            className="settings-delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="settings-delete-title">Delete account?</h2>
            <p className="settings-delete-warn">
              This will permanently delete your account. Type <strong>DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              className="settings-delete-input"
              placeholder="Type DELETE"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              disabled={isDeleting}
              autoFocus
            />
            <div className="settings-delete-actions">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="settings-delete-cancel"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (deleteConfirmText.trim() !== "DELETE") return;
                  setIsDeleting(true);
                  try {
                    await deleteAccount();
                    setShowDeleteModal(false);
                    setDeleteConfirmText("");
                    navigate("/login", { replace: true });
                  } catch (_) {}
                  setIsDeleting(false);
                }}
                className="settings-delete-confirm"
                disabled={deleteConfirmText.trim() !== "DELETE" || isDeleting}
              >
                {isDeleting ? "Deleting…" : "Delete account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
