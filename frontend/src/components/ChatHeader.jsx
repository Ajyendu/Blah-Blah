import { useState } from "react";
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  StickyNote,
  Gamepad2,
  Trash2,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useAudioCall } from "../store/useAudioCall";
import { useNoteStore } from "../store/useNoteStore";
import { useGameStore } from "../store/useGameStore";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";
import "./mood.css";
import "./ChatHeader.css";

const ChatHeader = ({
  setCalling,
  setCallType,
  setCallActive,
  setActiveCallUserId,
  setActiveCallUserName,
  setActiveCallUserAvatar,
}) => {
  const { selectedUser, selectedChat, clearMessagesForCurrentChat, rejectedChatId } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const { startCall } = useAudioCall();
  const { isNotesOpen, setIsNotesOpen } = useNoteStore();
  const isTruthDareOpen = useGameStore((s) => s.isTruthDareOpen);
  const setTruthDareOpen = useGameStore((s) => s.setTruthDareOpen);
  const [showMore, setShowMore] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!selectedUser) return null;

  const isOnline = (onlineUsers || []).some(
    (uid) => String(uid) === String(selectedUser._id),
  );

  const showRejected = rejectedChatId && selectedChat && String(selectedChat._id) === String(rejectedChatId);
  const createdById = selectedChat?.createdBy?._id ?? selectedChat?.createdBy;
  const isRequestSent =
    selectedChat &&
    !selectedChat.acceptedBy &&
    authUser?._id &&
    String(createdById) === String(authUser._id);

  /** Chat not accepted yet — applies on both sender's and receiver's device */
  const isPendingChat = selectedChat && !selectedChat.acceptedBy;

  // When pending or rejected: show status only (never "Online"/"Offline"); only messaging allowed on both devices
  const subtitleText = showRejected
    ? "Request rejected"
    : isRequestSent
      ? "Request sent"
      : isPendingChat
        ? "Accept to chat"
        : isOnline
          ? "Online"
          : "Offline";
  const subtitleClass = showRejected
    ? "chat-header-ref__subtitle chat-header-ref__subtitle--rejected"
    : isRequestSent
      ? "chat-header-ref__subtitle chat-header-ref__subtitle--sent"
      : isPendingChat
        ? "chat-header-ref__subtitle chat-header-ref__subtitle--pending"
        : "chat-header-ref__subtitle";

  /** When pending or rejected: only messaging allowed; no other features; online not shown — on both devices */
  const featuresDisabled = isPendingChat || showRejected;

  const handleVideo = () => {
    startCall(selectedUser._id, "video");
    setCallType("video");
    setCalling(true);
    setActiveCallUserId(selectedUser._id);
    setActiveCallUserName(selectedUser.fullName);
    setActiveCallUserAvatar(selectedUser.profilePic);
  };

  const handleAudio = () => {
    startCall(selectedUser._id, "audio");
    setCallType("audio");
    setCalling(true);
    setActiveCallUserId(selectedUser._id);
    setActiveCallUserName(selectedUser.fullName);
    setActiveCallUserAvatar(selectedUser.profilePic);
  };

  return (
    <header className="chat-header-ref">
      <div className="chat-header-ref__left">
        <img
          src={selectedUser.profilePic || DEFAULT_AVATAR_URL}
          alt={selectedUser.fullName}
          className="chat-header-ref__avatar"
        />
        <div className="chat-header-ref__info">
          <h1 className="chat-header-ref__title">{selectedUser.fullName}</h1>
          <p className={subtitleClass}>{subtitleText}</p>
        </div>
      </div>

      <div className="chat-header-ref__actions">
        <button
          type="button"
          className={`chat-header-ref__icon ${featuresDisabled ? "chat-header-ref__icon--disabled" : ""}`}
          aria-label="Search"
          disabled={featuresDisabled}
          title={featuresDisabled ? "Available after chat is accepted" : "Search"}
        >
          <Search size={24} />
        </button>
        <button
          type="button"
          className={`chat-header-ref__icon ${featuresDisabled ? "chat-header-ref__icon--disabled" : ""}`}
          onClick={featuresDisabled ? undefined : handleAudio}
          aria-label="Voice call"
          disabled={featuresDisabled}
          title={featuresDisabled ? "Available after chat is accepted" : "Voice call"}
        >
          <Phone size={24} />
        </button>
        <button
          type="button"
          className={`chat-header-ref__icon ${featuresDisabled ? "chat-header-ref__icon--disabled" : ""}`}
          onClick={featuresDisabled ? undefined : handleVideo}
          aria-label="Video call"
          disabled={featuresDisabled}
          title={featuresDisabled ? "Available after chat is accepted" : "Video call"}
        >
          <Video size={24} />
        </button>
        <div className="chat-header-ref__more-wrap">
          {showMore && (
            <>
              <div
                className="chat-header-ref__backdrop"
                onClick={() => setShowMore(false)}
              />
              <div className="chat-header-ref__dropdown">
                <button
                  type="button"
                  className={`chat-header-ref__dropdown-btn ${isNotesOpen ? "chat-header-ref__dropdown-btn--active" : ""} ${featuresDisabled ? "chat-header-ref__dropdown-btn--disabled" : ""}`}
                  onClick={() => {
                    if (featuresDisabled) return;
                    setIsNotesOpen(!isNotesOpen);
                    setShowMore(false);
                  }}
                  disabled={featuresDisabled}
                  aria-label={isNotesOpen ? "Close notes" : "Notes"}
                  title={isNotesOpen ? "Close notes" : featuresDisabled ? "Available after chat is accepted" : "Notes"}
                >
                  <StickyNote size={24} />
                </button>
                <button
                  type="button"
                  className={`chat-header-ref__dropdown-btn ${isTruthDareOpen ? "chat-header-ref__dropdown-btn--active" : ""} ${featuresDisabled ? "chat-header-ref__dropdown-btn--disabled" : ""}`}
                  onClick={() => {
                    if (featuresDisabled) return;
                    setTruthDareOpen(!isTruthDareOpen);
                    setShowMore(false);
                  }}
                  disabled={featuresDisabled}
                  aria-label={isTruthDareOpen ? "Close games" : "Truth or Dare"}
                  title={isTruthDareOpen ? "Close games" : featuresDisabled ? "Available after chat is accepted" : "Truth or Dare"}
                >
                  <Gamepad2 size={24} />
                </button>
                <button
                  type="button"
                  className="chat-header-ref__dropdown-btn chat-header-ref__dropdown-btn--danger"
                  onClick={() => {
                    setShowMore(false);
                    setShowDeleteConfirm(true);
                  }}
                  aria-label="Delete conversation"
                  title="Delete conversation"
                >
                  <Trash2 size={24} className="chat-header-ref__dropdown-icon--danger" />
                </button>
                <button
                  type="button"
                  className="chat-header-ref__dropdown-btn chat-header-ref__dropdown-btn--more"
                  onClick={() => setShowMore(false)}
                  aria-label="Close menu"
                  title="Close"
                >
                  <MoreVertical size={24} />
                </button>
              </div>
            </>
          )}
          {!showMore && (
            <button
              type="button"
              className="chat-header-ref__icon"
              onClick={() => setShowMore(true)}
              aria-label="More"
              title="More"
            >
              <MoreVertical size={24} />
            </button>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="chat-header-ref__confirm-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div
            className="chat-header-ref__confirm-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="chat-header-ref__confirm-text">
              Permanently delete all messages in this conversation for your account only. The other person will still see them. You will not be able to see these messages again.
            </p>
            <div className="chat-header-ref__confirm-actions">
              <button
                type="button"
                className="chat-header-ref__confirm-btn chat-header-ref__confirm-btn--cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="chat-header-ref__confirm-btn chat-header-ref__confirm-btn--clear"
                onClick={() => {
                  clearMessagesForCurrentChat();
                  setShowDeleteConfirm(false);
                }}
              >
                Clear messages
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
