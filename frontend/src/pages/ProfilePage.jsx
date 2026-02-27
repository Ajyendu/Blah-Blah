import { useState, useCallback, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore.js";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";
import toast from "react-hot-toast";
import "./Homepage.css";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(authUser?.fullName ?? "");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!editingName && authUser?.fullName != null) {
      setNameValue(authUser.fullName);
    }
  }, [authUser?.fullName, editingName]);

  const handleSaveName = useCallback(() => {
    setEditingName(false);
    const trimmed = nameValue?.trim();
    if (!trimmed || trimmed === authUser?.fullName) return;
    updateProfile({ fullName: trimmed });
  }, [nameValue, authUser?.fullName, updateProfile]);

  const copyUserId = useCallback(() => {
    const id = authUser?.userCode ?? authUser?._id ?? "";
    if (!id) return;
    navigator.clipboard.writeText(String(id));
    toast.success("User ID copied to clipboard");
  }, [authUser?.userCode, authUser?._id]);

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handlePhotoChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please choose an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        if (typeof dataUrl === "string") {
          updateProfile({ profilePic: dataUrl });
        }
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [updateProfile],
  );

  if (!authUser) {
    return (
      <div className="profile-page-shell app-shell h-screen w-screen flex">
        <div className="app-card flex flex-1 m-6 overflow-hidden">
          <div className="flex-shrink-0">
            <Sidebar />
          </div>
          <div className="app-content-wrap flex-1 flex min-w-0 items-center justify-center">
            <p className="text-slate-500">Loading profile…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-shell app-shell h-screen w-screen flex">
      <div className="app-card flex flex-1 m-6 overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="app-content-wrap flex-1 flex min-w-0 profile-content-wrap">
          <div className="profile-card">
            <div className="profile-content">
              <div
                className="profile-avatar-frame"
                onClick={handleAvatarClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleAvatarClick();
                  }
                }}
                title="Change profile photo"
                aria-label="Change profile photo"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="profile-avatar-file-input"
                  aria-hidden
                />
                {isUpdatingProfile ? (
                  <div className="profile-avatar-overlay">
                    <span className="profile-avatar-overlay-text">Updating…</span>
                  </div>
                ) : (
                  <div className="profile-avatar-overlay profile-avatar-overlay-hint">
                    <span className="profile-avatar-overlay-text">Change photo</span>
                  </div>
                )}
                <img
                  src={authUser.profilePic || DEFAULT_AVATAR_URL}
                  alt="Profile"
                  className="profile-avatar-img"
                />
              </div>
              <div className="profile-details">
                <div className="profile-field profile-name-field">
                  <div className="profile-name-slot">
                    {editingName ? (
                      <input
                        type="text"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        onBlur={handleSaveName}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveName();
                          if (e.key === "Escape") {
                            setNameValue(authUser.fullName ?? "");
                            setEditingName(false);
                          }
                        }}
                        autoFocus
                        disabled={isUpdatingProfile}
                        className="profile-name-input"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingName(true)}
                        className="profile-name-display"
                        title="Click to edit"
                      >
                        {authUser.fullName || "No name"}
                        <span className="profile-name-hint">Edit</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="profile-field profile-email-field">
                  <div className="profile-email-block">
                    <span className="profile-email-label">Email</span>
                    <span className="profile-email">{authUser.email}</span>
                  </div>
                </div>
                <div className="profile-id-card">
                  <span className="profile-id-card-label">ID Card</span>
                  <div className="profile-id-card-row">
                    <code className="profile-id-value">
                      {authUser.userCode ?? authUser._id}
                    </code>
                    <button
                      type="button"
                      onClick={copyUserId}
                      className="profile-copy-btn"
                      title="Copy to clipboard"
                    >
                      <svg className="profile-copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
