import { useState } from "react";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const NewChatModal = ({ isOpen, onClose }) => {
  const [userCode, setUserCode] = useState("");
  const [message, setMessage] = useState("");

  const { sendMessageByCode, loading } = useChatStore();

  if (!isOpen) return null;

  const handleStart = async () => {
    if (!userCode.trim()) return;

    await sendMessageByCode({
      userCode: userCode.trim(),
      text: message.trim(),
    });

    setUserCode("");
    setMessage("");
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* Header */}
        <div style={header}>
          <h3 style={title}>New Chat</h3>
          <button onClick={onClose} style={closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* User code */}
        <input
          placeholder="Enter user code"
          onChange={(e) => setUserCode(e.target.value)}
          value={userCode}
          style={input}
        />

        {/* First message */}
        <textarea
          placeholder="Write a message (optional)"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          style={textarea}
        />

        {/* Action */}
        <button onClick={handleStart} style={startBtn} disabled={loading}>
          {loading ? "Starting..." : "Start Chat"}
        </button>
      </div>
    </div>
  );
};

export default NewChatModal;

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  width: "320px",
  background: "#111",
  borderRadius: "14px",
  padding: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  color: "#fff",
};

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
};

const title = {
  fontSize: "16px",
  fontWeight: "600",
};

const closeBtn = {
  background: "transparent",
  border: "none",
  color: "#aaa",
  cursor: "pointer",
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#000",
  color: "#fff",
  marginBottom: "10px",
};

const textarea = {
  width: "100%",
  minHeight: "70px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#000",
  color: "#fff",
  resize: "none",
  marginBottom: "14px",
};

const startBtn = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};
