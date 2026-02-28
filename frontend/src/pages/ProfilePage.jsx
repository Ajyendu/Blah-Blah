import { useState, useCallback, useRef, useEffect } from "react";
import { Pencil, Copy, Check, Share2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore.js";
import { DEFAULT_AVATAR_URL, getDefaultAvatarByGender } from "../lib/defaultAvatar.js";
import toast from "react-hot-toast";
import "./Homepage.css";
import "./ProfilePage.css";

const splitName = (fullName) => {
  if (!fullName || typeof fullName !== "string") return { first: "", last: "" };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return { first: parts[0] || "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
};

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const fileInputRef = useRef(null);
  const [editingName, setEditingName] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [genderValue, setGenderValue] = useState("male");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!editingName && authUser?.fullName != null) {
      const { first, last } = splitName(authUser.fullName);
      setFirstNameValue(first);
      setLastNameValue(last);
    }
  }, [authUser?.fullName, editingName]);

  useEffect(() => {
    if (authUser?.gender) setGenderValue(authUser.gender);
  }, [authUser?.gender]);

  const handleSaveName = useCallback(() => {
    setEditingName(false);
    const first = firstNameValue?.trim() ?? "";
    const last = lastNameValue?.trim() ?? "";
    const fullName = [first, last].filter(Boolean).join(" ").trim();
    const updates = {};
    if (fullName && fullName !== authUser?.fullName) updates.fullName = fullName;
    if (genderValue && genderValue !== authUser?.gender) updates.gender = genderValue;
    if (Object.keys(updates).length === 0) return;
    updateProfile(updates);
  }, [firstNameValue, lastNameValue, genderValue, authUser?.fullName, authUser?.gender, updateProfile]);

  const handleStartEditName = useCallback(() => {
    const { first, last } = splitName(authUser?.fullName ?? "");
    setFirstNameValue(first);
    setLastNameValue(last);
    setGenderValue(authUser?.gender || "male");
    setEditingName(true);
  }, [authUser?.fullName, authUser?.gender]);

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

  const handleCopyUserCode = useCallback(() => {
    const code = authUser?.userCode;
    if (!code) return;
    navigator.clipboard.writeText(code).then(
      () => {
        setCopied(true);
        toast.success("User ID copied");
        setTimeout(() => setCopied(false), 2000);
      },
      () => toast.error("Copy failed"),
    );
  }, [authUser?.userCode]);

  const getShareText = useCallback(() => {
    const code = authUser?.userCode;
    if (!code) return "";
    return `My Blah Blah User ID: ${code}\nAdd me on Blah Blah!`;
  }, [authUser?.userCode]);

  const handleShareUserCode = useCallback(async () => {
    const code = authUser?.userCode;
    if (!code) return;
    const text = getShareText();
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "My Blah Blah User ID",
          text,
        });
        toast.success("Share opened");
      } catch (err) {
        if (err?.name !== "AbortError") {
          toast.error("Share failed");
        }
      }
    } else {
      navigator.clipboard.writeText(text).then(
        () => toast.success("Copied – paste in WhatsApp, SMS, etc. to share"),
        () => toast.error("Copy failed"),
      );
    }
  }, [authUser?.userCode, getShareText]);

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

  const { first: firstName, last: lastName } = splitName(authUser.fullName);

  // Use profilePic if set; else fallback to gender-based default so boy/girl avatar shows
  const rawAvatar =
    authUser.profilePic && authUser.profilePic.trim()
      ? authUser.profilePic
      : getDefaultAvatarByGender(authUser.gender, authUser._id);
  // Use full URL for path-only avatars so they load reliably (e.g. /Boy1.jpeg)
  const displayAvatar =
    typeof rawAvatar === "string" && rawAvatar.startsWith("/")
      ? `${window.location.origin}${rawAvatar}`
      : rawAvatar;

  const genderLabel =
    authUser.gender === "male"
      ? "Male"
      : authUser.gender === "female"
        ? "Female"
        : "—";

  return (
    <div className="profile-page-shell app-shell h-screen w-screen flex">
      <div className="app-card flex flex-1 m-6 overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="app-content-wrap flex-1 flex min-w-0 flex-col profile-content-wrap">
          <div className="profile-content-wrap__spacer" aria-hidden />
          <div className="profile-page-backdrop">
            <div className="profile-page-backdrop__fill" aria-hidden />
            <div className="profile-page-inner">
            {/* Left: big photo */}
            <div className="profile-photo-panel">
              <div
                className="profile-photo-wrap"
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
                {isUpdatingProfile && (
                  <div className="profile-hero-avatar-overlay">
                    <span>Updating…</span>
                  </div>
                )}
                <img
                  src={displayAvatar}
                  alt="Profile"
                  className="profile-photo-img"
                />
              </div>
            </div>

            {/* Right: cards */}
            <div className="profile-cards-panel">
            {/* Personal Information */}
            <section className="profile-section-card">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Personal Information</h2>
                {editingName ? (
                  <button type="button" className="profile-edit-btn profile-save-btn" onClick={handleSaveName} disabled={isUpdatingProfile} aria-label="Save name">
                    <span>Save</span>
                  </button>
                ) : (
                  <button type="button" className="profile-edit-btn" onClick={handleStartEditName} aria-label="Edit name">
                    <Pencil size={16} />
                    <span>Edit</span>
                  </button>
                )}
              </div>
              <div className="profile-fields-grid">
                <div className="profile-field-item">
                  <label className="profile-field-label">First Name</label>
                  {editingName ? (
                    <input
                      type="text"
                      value={firstNameValue}
                      onChange={(e) => setFirstNameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") document.getElementById("profile-last-name-input")?.focus();
                        if (e.key === "Escape") setEditingName(false);
                      }}
                      disabled={isUpdatingProfile}
                      className="profile-field-input"
                      placeholder="First name"
                    />
                  ) : (
                    <div className="profile-field-value">{firstName || "—"}</div>
                  )}
                </div>
                <div className="profile-field-item">
                  <label className="profile-field-label">Last Name</label>
                  {editingName ? (
                    <input
                      id="profile-last-name-input"
                      type="text"
                      value={lastNameValue}
                      onChange={(e) => setLastNameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveName();
                        if (e.key === "Escape") setEditingName(false);
                      }}
                      disabled={isUpdatingProfile}
                      className="profile-field-input"
                      placeholder="Last name"
                    />
                  ) : (
                    <div className="profile-field-value">{lastName || "—"}</div>
                  )}
                </div>
                <div className="profile-field-item">
                  <label className="profile-field-label">Email Address</label>
                  <div className="profile-field-value profile-field-value--readonly">{authUser.email || "—"}</div>
                </div>
                <div className="profile-field-item">
                  <label className="profile-field-label">Gender</label>
                  {editingName ? (
                    <div className="profile-field-radios">
                      <label className="profile-field-radio-label">
                        <input
                          type="radio"
                          name="profile-gender"
                          value="male"
                          checked={genderValue === "male"}
                          onChange={(e) => setGenderValue(e.target.value)}
                          className="profile-field-radio"
                        />
                        <span>Male</span>
                      </label>
                      <label className="profile-field-radio-label">
                        <input
                          type="radio"
                          name="profile-gender"
                          value="female"
                          checked={genderValue === "female"}
                          onChange={(e) => setGenderValue(e.target.value)}
                          className="profile-field-radio"
                        />
                        <span>Female</span>
                      </label>
                    </div>
                  ) : (
                    <div className="profile-field-value">{genderLabel}</div>
                  )}
                </div>
              </div>
            </section>
            </div>
          </div>
          </div>
          <div className="profile-content-wrap__spacer" aria-hidden />
          {authUser?.userCode && (
            <div className="profile-user-id">
              <span className="profile-user-id__label">Your User ID</span>
              <div className="profile-user-id__row">
                <code className="profile-user-id__code">{authUser.userCode}</code>
                <button
                  type="button"
                  onClick={handleShareUserCode}
                  className="profile-user-id__share"
                  aria-label="Share User ID"
                  title="Share to WhatsApp, SMS, etc."
                >
                  <Share2 size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleCopyUserCode}
                  className="profile-user-id__copy"
                  aria-label="Copy User ID"
                  title="Copy"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
