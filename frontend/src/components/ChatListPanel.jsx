import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useNoteStore } from "../store/useNoteStore";
import { useGameStore } from "../store/useGameStore";
import NewChatModal from "./NewChatModal";
import { useAuthStore } from "../store/useAuthStore";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";
import { formatRelativeTime } from "../lib/utils";
import "./ChatListPanel.css";

const ChatListPanel = () => {
  const { chats, getMyChats, selectedChat, setSelectedChat, unreadCountByChatId } = useChatStore();
  const setIsNotesOpen = useNoteStore((s) => s.setIsNotesOpen);
  const setTruthDareOpen = useGameStore((s) => s.setTruthDareOpen);
  const { onlineUsers, authUser } = useAuthStore();
  const [showNewChat, setShowNewChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (authUser?._id) getMyChats();
  }, [getMyChats, authUser?._id]);

  useEffect(() => {
    const onFocus = () => {
      if (authUser?._id) getMyChats();
    };
    window.addEventListener("focus", onFocus);
    const onVisibility = () => {
      if (document.visibilityState === "visible" && authUser?._id) getMyChats();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [getMyChats, authUser?._id]);

  const filteredChats =
    Array.isArray(chats) && searchQuery.trim()
      ? chats.filter((chat) => {
          const other = chat.participants?.find((u) => u._id !== authUser?._id);
          return other?.fullName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      : Array.isArray(chats)
        ? chats
        : [];

  return (
    <div className="chat-list-panel">
      <div className="chat-list-panel__search">
        <Search className="chat-list-panel__search-icon" size={18} />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="chat-list-panel__search-input"
        />
      </div>

      <div className="chat-list-panel__new-chat">
        <button
          onClick={() => setShowNewChat(true)}
          className="chat-list-panel__new-chat-btn"
        >
          + New Chat
        </button>
      </div>

      <div className="chat-list-panel__list">
        {filteredChats.map((chat) => {
          const otherUser = chat.participants?.find(
            (u) => u._id !== authUser?._id,
          );
          const isSelected = selectedChat?._id === chat._id;
          const updatedAt = chat.updatedAt || chat.lastMessage?.createdAt;
          const hasUnread =
            unreadCountByChatId && (unreadCountByChatId[chat._id] ?? 0) > 0;

          const createdById = chat.createdBy?._id ?? chat.createdBy;
          const isPending = !chat.acceptedBy;
          const iAmCreator =
            authUser?._id && String(createdById) === String(authUser._id);
          const rowStatus = isPending
            ? iAmCreator
              ? "Request sent"
              : "Accept to chat"
            : null;

          return (
            <button
              key={chat._id}
              onClick={() => {
                setIsNotesOpen(false);
                setTruthDareOpen(false);
                setSelectedChat(chat);
              }}
              className={`chat-list-panel__item ${isSelected ? "selected" : ""} ${hasUnread ? "chat-list-panel__item--unread" : ""}`}
            >
              <div className="chat-list-panel__avatar-wrap">
                <img
                  src={otherUser?.profilePic || DEFAULT_AVATAR_URL}
                  alt={otherUser?.fullName}
                  className="chat-list-panel__avatar"
                />
                {chat.acceptedBy &&
                  (onlineUsers || []).some(
                    (uid) => String(uid) === String(otherUser?._id),
                  ) && (
                  <span className="chat-list-panel__online" />
                )}
              </div>
              <div className="chat-list-panel__body">
                <div className="chat-list-panel__row">
                  <span className="chat-list-panel__name">
                    {otherUser?.fullName || "Unknown"}
                  </span>
                  {!rowStatus && updatedAt && (
                    <span className="chat-list-panel__time">
                      {formatRelativeTime(updatedAt)}
                    </span>
                  )}
                </div>
                {rowStatus ? (
                  <p
                    className={`chat-list-panel__status ${
                      iAmCreator
                        ? "chat-list-panel__status--sent"
                        : "chat-list-panel__status--accept"
                    }`}
                  >
                    {rowStatus}
                  </p>
                ) : chat.lastMessage ? (
                  <p className="chat-list-panel__preview">
                    {chat.lastMessage.image
                      ? "Photo"
                      : chat.lastMessage.fileName
                        ? chat.lastMessage.fileName
                        : chat.lastMessage.text || "Message"}
                  </p>
                ) : null}
              </div>
            </button>
          );
        })}
        {filteredChats.length === 0 && (
          <div className="chat-list-panel__empty">No conversations</div>
        )}
      </div>

      {showNewChat && (
        <NewChatModal
          isOpen={showNewChat}
          onClose={() => setShowNewChat(false)}
        />
      )}
    </div>
  );
};

export default ChatListPanel;
