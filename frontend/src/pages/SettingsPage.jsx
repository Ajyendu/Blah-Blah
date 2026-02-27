import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import ThemeCustomizer from "../components/ThemeCustomizer";
import MainScreenPreview from "../components/MainScreenPreview";
import Sidebar from "../components/Sidebar";
import "./Homepage.css";
import "./SettingsPage.css";

const SettingsPage = () => {
  const navigate = useNavigate();
  const theme = useThemeStore((s) => s.theme);
  const initDraft = useThemeStore((s) => s.initDraft);
  const resetDraft = useThemeStore((s) => s.resetDraft);
  const saveDraft = useThemeStore((s) => s.saveDraft);
  const initDraftFromSaved = useThemeStore((s) => s.initDraftFromSaved);
  const draftTheme = useThemeStore((s) => s.draftTheme);
  const { deleteAccount } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    initDraft();
  }, [initDraft]);

  const displayTheme = draftTheme ?? theme;
  if (!displayTheme) return null;

  return (
    <div className="app-shell h-screen w-screen flex">
      <div className="app-card flex flex-1 m-6 overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="app-content-wrap flex-1 flex min-w-0 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 settings-page-scroll">
            <div className="settings-page-center">
              <div className="settings-appearance-block">
                <div className="settings-appearance-row">
                  <div className="settings-preview-block">
                    <MainScreenPreview theme={displayTheme} />
                  </div>
                  <div className="settings-colors-cards">
                    <div className="settings-theme-actions">
                      <button type="button" onClick={() => resetDraft()} className="settings-action-btn settings-action-btn--reset">
                        Reset to default
                      </button>
                      <button type="button" onClick={() => initDraftFromSaved()} className="settings-action-btn settings-action-btn--cancel">
                        Cancel
                      </button>
                      <button type="button" onClick={() => saveDraft()} className="settings-action-btn settings-action-btn--save">
                        Save changes
                      </button>
                    </div>
                    <ThemeCustomizer variant="cards" useDraft />
                  </div>
                </div>

                {/* DANGER ZONE – Delete account */}
                <div className="settings-danger-zone">
                <h3>Delete account</h3>
                <p>
                  Permanently delete your account and data. This cannot be
                  undone.
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
              This will permanently delete your account. Type{" "}
              <strong>DELETE</strong> to confirm.
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
