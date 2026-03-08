import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { useIsMobile } from "../hooks/useMediaQuery";
import ThemeCustomizer from "../components/ThemeCustomizer";
import MainScreenPreview from "../components/MainScreenPreview";
import Sidebar from "../components/Sidebar";
import "./Homepage.css";
import "./SettingsPage.css";

const STRING_FULL = 200;
const STRING_DURATION_MS = 200;
const STRING_WIDTH = 140;

const SettingsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const theme = useThemeStore((s) => s.theme);
  const initDraft = useThemeStore((s) => s.initDraft);
  const resetDraft = useThemeStore((s) => s.resetDraft);
  const saveDraft = useThemeStore((s) => s.saveDraft);
  const initDraftFromSaved = useThemeStore((s) => s.initDraftFromSaved);
  const draftTheme = useThemeStore((s) => s.draftTheme);
  const applyPreset = useThemeStore((s) => s.applyPreset);
  const { deleteAccount } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [stringPhase, setStringPhase] = useState("50");
  const [stringNextRest, setStringNextRest] = useState(30);

  useEffect(() => {
    initDraft();
  }, [initDraft, theme]);

  useEffect(() => {
    if (stringPhase !== "80") return;
    const t = setTimeout(() => setStringPhase(String(stringNextRest)), STRING_DURATION_MS);
    return () => clearTimeout(t);
  }, [stringPhase, stringNextRest]);

  const prevStringPhaseRef = useRef(null);
  useEffect(() => {
    const prev = prevStringPhaseRef.current;
    prevStringPhaseRef.current = stringPhase;
    if (prev !== "80") return;
    if (stringPhase === "50") applyPreset("dark");
    if (stringPhase === "30") applyPreset("light");
  }, [stringPhase, applyPreset]);

  const stringHeights = { 80: 0.8 * STRING_FULL, 50: 0.5 * STRING_FULL, 30: 0.3 * STRING_FULL };
  const stringImgScale = { 80: "125%", 50: "200%", 30: "333%" };

  const displayTheme = draftTheme ?? theme;
  if (!displayTheme) return null;

  return (
    <div className="app-shell h-screen w-screen flex">
      <div className="app-card flex flex-1 m-6 overflow-hidden">
        <div className="app-card__sidebar flex-shrink-0">
          <Sidebar />
        </div>
        <div className={`app-content-wrap app-card__main flex-1 flex min-w-0 flex-col overflow-hidden ${isMobile ? "settings-main--has-string" : ""}`}>
          {isMobile && (
            <div
              className="settings-string-toggle"
              role="button"
              tabIndex={0}
              aria-label="Toggle dark or bright mode"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (stringPhase === "80") return;
                setStringNextRest(stringPhase === "50" ? 30 : 50);
                setStringPhase("80");
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter" || stringPhase === "80") return;
                e.preventDefault();
                setStringNextRest(stringPhase === "50" ? 30 : 50);
                setStringPhase("80");
              }}
              style={{
                height: `${stringHeights[stringPhase]}px`,
                width: `${STRING_WIDTH}px`,
                overflow: "hidden",
                cursor: "pointer",
                transition: `height ${STRING_DURATION_MS}ms ease`,
              }}
            >
              <img
                src="/string.png"
                alt=""
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: stringImgScale[stringPhase],
                  width: "auto",
                  maxWidth: "none",
                  objectFit: "cover",
                  objectPosition: "left bottom",
                  transition: `height ${STRING_DURATION_MS}ms ease`,
                }}
              />
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-6 settings-page-scroll">
            <div className="settings-page-center">
              <div className="settings-appearance-block">
                <div className="settings-appearance-row">
                  <div className="settings-preview-block">
                    <MainScreenPreview theme={displayTheme} isMobile={isMobile} />
                  </div>
                  <div className="settings-colors-cards">
                    <div className="settings-theme-actions">
                      <button type="button" onClick={() => resetDraft()} className="settings-action-btn settings-action-btn--reset">
                        Reset
                      </button>
                      <button type="button" onClick={() => initDraftFromSaved()} className="settings-action-btn settings-action-btn--cancel">
                        Cancel
                      </button>
                      <button type="button" onClick={() => saveDraft()} className="settings-action-btn settings-action-btn--save">
                        Save
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
