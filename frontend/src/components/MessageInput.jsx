import { useEffect, useRef, useState } from "react";
import { Image, Send, X, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

/* ================= UTIL ================= */

export const formatDuration = (ms) => {
  let total = Math.max(0, Math.floor(ms / 1000));

  const days = Math.floor(total / 86400);
  total %= 86400;
  const hrs = Math.floor(total / 3600);
  total %= 3600;
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  const parts = [];
  if (days) parts.push(`${days} day`);
  if (hrs) parts.push(`${hrs} hr`);
  if (mins) parts.push(`${mins} min`);
  parts.push(`${secs} sec`);

  return parts.join(" ");
};

/* ================= COMPONENT ================= */

const MessageInput = () => {
  const { authUser } = useAuthStore();
  const { selectedChat, selectedUser, sendMessage, acceptChat, rejectChat } =
    useChatStore();

  const fileInputRef = useRef(null);
  const pickerRef = useRef(null);

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("datetime"); // duration | datetime

  // duration parts
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // datetime
  const [dateTime, setDateTime] = useState("");

  // preview only (NOT sent)
  const [previewMs, setPreviewMs] = useState(null);

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const close = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  /* ================= BLOCK ================= */

  const isBlocked =
    selectedChat &&
    selectedChat.createdBy !== authUser?._id &&
    !selectedChat.acceptedBy;

  /* ================= IMAGE ================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Invalid image");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  /* ================= APPLY TIMER ================= */

  const applyTimer = () => {
    let ms = null;

    if (mode === "duration") {
      ms = days * 86400000 + hours * 3600000 + minutes * 60000 + seconds * 1000;

      if (ms <= 0) {
        toast.error("Timer must be > 0");
        return;
      }
    }

    if (mode === "datetime") {
      const target = new Date(dateTime).getTime();
      if (!target || target <= Date.now()) {
        toast.error("Choose a future time");
        return;
      }
      ms = target - Date.now();
    }

    setPreviewMs(ms);
    setShowPicker(false);
  };

  /* ================= SEND ================= */

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    // 🔥 TIMER STARTS HERE
    const revealAt = previewMs ? Date.now() + previewMs : null;

    await sendMessage({
      receiverId: selectedUser._id,
      conversationId: selectedChat._id,
      text: text.trim(),
      image: imagePreview,
      revealAt,
      revealed: !revealAt,
    });

    // reset
    setText("");
    setImagePreview(null);
    setPreviewMs(null);
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setDateTime("");
  };

  /* ================= RENDER ================= */

  return (
    <div className="relative p-4 bg-white">
      {/* TIMER INFO */}
      {previewMs && (
        <div className="mb-2 text-xs text-gray-600">
          ⏰ Reveals in {formatDuration(previewMs)}
        </div>
      )}

      {/* IMAGE PREVIEW */}
      {imagePreview && (
        <div className="mb-3 relative w-20">
          <img src={imagePreview} className="rounded-lg" />
          <button
            onClick={() => setImagePreview(null)}
            className="absolute -top-1 -right-1 bg-white rounded-full"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* INPUT */}
      <form onSubmit={handleSend} className="flex gap-2 items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isBlocked}
          className="flex-1 input input-bordered"
          placeholder={isBlocked ? "Accept chat to reply" : "Type a message…"}
        />

        <button
          type="button"
          onClick={() => setShowPicker((v) => !v)}
          className="btn btn-circle"
        >
          <Clock size={18} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        <button
          type="button"
          className="btn btn-circle"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={18} />
        </button>

        <button type="submit" className="btn btn-circle">
          <Send size={18} />
        </button>
      </form>

      {/* TIMER PICKER */}
      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute bottom-16 left-2 bg-white shadow-xl rounded-lg p-3 z-50 w-80"
        >
          <div className="flex gap-2 mb-4">
            <button
              className={`btn btn-xs ${mode === "datetime" && "btn-active"}`}
              onClick={() => setMode("datetime")}
            >
              Date & Time
            </button>
            <button
              className={`btn btn-xs ${mode === "duration" && "btn-active"}`}
              onClick={() => setMode("duration")}
            >
              Duration
            </button>
          </div>

          {mode === "duration" && (
            <>
              <div className="grid grid-cols-3 gap-2">
                <p>Hour</p>
                <p>Minutes</p>
                <p>Seconds</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="Hrs"
                  value={hours}
                  onChange={(e) => setHours(+e.target.value)}
                  className="input input-sm"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={minutes}
                  onChange={(e) => setMinutes(+e.target.value)}
                  className="input input-sm"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Sec"
                  value={seconds}
                  onChange={(e) => setSeconds(+e.target.value)}
                  className="input input-sm"
                />
              </div>
            </>
          )}

          {mode === "datetime" && (
            <>
              <div className="grid grid-cols-1">
                <p>Date & Time</p>
              </div>
              <input
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="input input-sm w-full"
              />
            </>
          )}

          <button
            onClick={applyTimer}
            className="btn btn-sm btn-primary w-full mt-3"
          >
            Set Timer
          </button>
        </div>
      )}

      {/* ACCEPT / REJECT */}
      {isBlocked && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => acceptChat(selectedChat._id)}
            className="btn btn-success btn-sm"
          >
            Accept
          </button>
          <button
            onClick={() => rejectChat(selectedChat._id)}
            className="btn btn-error btn-sm"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
