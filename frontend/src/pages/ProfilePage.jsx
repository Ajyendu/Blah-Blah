import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const theme = useThemeStore((s) => s.theme);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // 🔁 Fallback for HTTP / LAN / older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // avoid scroll jump
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed", err);
      toast.error("Failed to copy");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="rounded-xl p-6 space-y-8 shadow-lg">
          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p>Your profile information</p>
          </div>

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="bg-base-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Your Chat Code</p>

              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-lg tracking-wider">
                  {authUser.userCode}
                </span>

                <button
                  onClick={() => copyToClipboard(authUser.userCode)}
                  className="btn btn-xs btn-ghost"
                >
                  <Copy size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Share this code to let others message you
              </p>
            </div>

            <p className="text-sm">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            {/* FULL NAME */}
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>

              <p className="px-4 py-2.5 rounded-lg">{authUser?.fullName}</p>
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>

              <p className="px-4 py-2.5 rounded-lg">{authUser?.email}</p>
            </div>
          </div>

          {/* ACCOUNT INFO */}
          <div className="rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
