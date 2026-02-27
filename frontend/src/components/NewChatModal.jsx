import { useState } from "react";
import { X, User, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import "./NewChatModal.css";

const NewChatModal = ({ isOpen, onClose }) => {
  const [userCode, setUserCode] = useState("");
  const [message, setMessage] = useState("");

  const { sendMessageByCode, sendByCodeLoading } = useChatStore();

  if (!isOpen) return null;

  const handleStart = async (e) => {
    e?.preventDefault();
    if (!userCode.trim()) {
      toast.error("Enter a user ID");
      return;
    }

    try {
      const data = await sendMessageByCode({
        userCode: userCode.trim(),
        text: message.trim(),
      });
      setUserCode("");
      setMessage("");
      onClose();
      if (data?.chat && !data.chat.acceptedBy) {
        toast.success("Request sent");
      } else if (data?.chat) {
        toast.success("Chat opened");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start chat");
    }
  };

  return (
    <div className="new-chat-modal__overlay" onClick={onClose}>
      <div
        className="new-chat-modal__card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="new-chat-modal__header">
          <h2 className="new-chat-modal__title">New Chat</h2>
          <button
            type="button"
            onClick={onClose}
            className="new-chat-modal__close"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleStart} className="new-chat-modal__form">
          <div className="new-chat-modal__group">
            <label className="new-chat-modal__label" htmlFor="new-chat-user-id">
              User ID
            </label>
            <div className="new-chat-modal__input-wrap">
              <User className="new-chat-modal__icon" size={18} />
              <input
                id="new-chat-user-id"
                type="text"
                className="new-chat-modal__input"
                placeholder="Enter user ID"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="new-chat-modal__group">
            <label className="new-chat-modal__label" htmlFor="new-chat-message">
              Message
            </label>
            <div className="new-chat-modal__input-wrap">
              <MessageCircle className="new-chat-modal__icon" size={18} />
              <textarea
                id="new-chat-message"
                className="new-chat-modal__input new-chat-modal__textarea"
                placeholder="Your message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <button
            type="submit"
            className="new-chat-modal__submit"
            disabled={sendByCodeLoading}
          >
            {sendByCodeLoading ? "Starting..." : "Start Chat"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewChatModal;
