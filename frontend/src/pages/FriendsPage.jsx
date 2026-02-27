import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, ArrowDownAZ, UserMinus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";
import "../components/FriendsPanel.css";
import "./Homepage.css";

const FriendsPage = () => {
  const navigate = useNavigate();
  const { getMyChats, getMyFriends, friendsChats, setSelectedChat, ensureChatInList, removeFriend } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(null); // { chat, userName }
  const [sortBy, setSortBy] = useState("date"); // "date" | "alphabet"

  useEffect(() => {
    if (authUser?._id) {
      getMyChats();
      getMyFriends();
    }
  }, [authUser?._id, getMyChats, getMyFriends]);

  // Friends = other participants from accepted chats (from friends API — not filtered by message count)
  const friends = (friendsChats || []).reduce((acc, chat) => {
    if (!chat?.acceptedBy) return acc;
    const participants = Array.isArray(chat.participants) ? chat.participants : [];
    const other = participants.find(
      (p) => p && String(p._id ?? p) !== String(authUser?._id),
    );
    if (other && !acc.some((f) => String(f.user._id ?? f.user) === String(other._id ?? other))) {
      acc.push({ user: other, chat });
    }
    return acc;
  }, []);

  const filteredFriends = friends.filter(({ user: u }) => {
    if (!u) return false;
    const name = (u.fullName ?? u.username ?? "").toLowerCase();
    const q = searchQuery.trim().toLowerCase();
    return !q || name.includes(q);
  });

  const sortedFriends = useMemo(() => {
    const list = [...filteredFriends];
    if (sortBy === "alphabet") {
      list.sort((a, b) => {
        const nameA = (a.user?.fullName ?? a.user?.username ?? "").toLowerCase();
        const nameB = (b.user?.fullName ?? b.user?.username ?? "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else {
      list.sort((a, b) => {
        const dateA = a.chat?.updatedAt ? new Date(a.chat.updatedAt).getTime() : 0;
        const dateB = b.chat?.updatedAt ? new Date(b.chat.updatedAt).getTime() : 0;
        return dateB - dateA;
      });
    }
    return list;
  }, [filteredFriends, sortBy]);

  const handleFriendClick = (user, chat) => {
    if (!user || !authUser?._id) return;
    if (chat) {
      setSelectedChat(chat);
      ensureChatInList(chat);
    }
    navigate("/");
  };

  const handleRemoveFriend = (e, chat, userName) => {
    e.stopPropagation();
    if (!chat?._id) return;
    setConfirmRemove({ chat, userName: userName || "this friend" });
  };

  const handleConfirmRemove = async () => {
    if (!confirmRemove?.chat?._id) return;
    await removeFriend(confirmRemove.chat._id);
    getMyFriends();
    setConfirmRemove(null);
  };

  const handleCancelRemove = () => {
    setConfirmRemove(null);
  };

  if (!authUser) {
    return null;
  }

  return (
    <div className="app-shell h-screen w-screen flex">
      <div className="app-card flex flex-1 m-6 overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="app-content-wrap flex-1 flex min-w-0 flex-col">
          <div className="friends-panel">
            <h1 className="friends-panel__title">Friends</h1>
            <div className="friends-panel__search">
              <Search className="friends-panel__search-icon" size={18} />
              <input
                type="text"
                placeholder="Search friends"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="friends-panel__search-input"
              />
            </div>
            <div className="friends-panel__sort">
              <button
                type="button"
                onClick={() => setSortBy("date")}
                className={`friends-panel__sort-btn ${sortBy === "date" ? "friends-panel__sort-btn--active" : ""}`}
                title="Sort by date added"
                aria-pressed={sortBy === "date"}
              >
                <Calendar size={16} />
                <span>Date added</span>
              </button>
              <button
                type="button"
                onClick={() => setSortBy("alphabet")}
                className={`friends-panel__sort-btn ${sortBy === "alphabet" ? "friends-panel__sort-btn--active" : ""}`}
                title="Sort A–Z"
                aria-pressed={sortBy === "alphabet"}
              >
                <ArrowDownAZ size={16} />
                <span>A–Z</span>
              </button>
            </div>
            <div className="friends-panel__list">
              {sortedFriends.map(({ user, chat }) => {
                if (!user || !chat) return null;
                const isOnline = (onlineUsers || []).some(
                  (id) => String(id) === String(user._id ?? user),
                );
                const displayName = user.fullName ?? user.username ?? "Unknown";
                return (
                  <div
                    key={String(user._id ?? user)}
                    className="friends-panel__item-wrap"
                  >
                    <button
                      type="button"
                      onClick={() => handleFriendClick(user, chat)}
                      className="friends-panel__item"
                    >
                      <div className="friends-panel__avatar-wrap">
                        <img
                          src={user.profilePic || DEFAULT_AVATAR_URL}
                          alt={displayName}
                          className="friends-panel__avatar"
                        />
                        {isOnline && <span className="friends-panel__online" />}
                      </div>
                      <div className="friends-panel__body">
                        <span className="friends-panel__name">
                          {displayName}
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={(e) =>
                        handleRemoveFriend(e, chat, displayName)
                      }
                      className="friends-panel__remove"
                      title="Remove friend"
                      aria-label="Remove friend"
                    >
                      <UserMinus size={14} strokeWidth={2.25} />
                      <span>Remove</span>
                    </button>
                  </div>
                );
              })}
              {sortedFriends.length === 0 && (
                <div className="friends-panel__empty">
                  {friends.length === 0 ? "No friends yet" : "No matches"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {confirmRemove && (
        <div
          className="friends-confirm-overlay"
          onClick={handleCancelRemove}
          role="dialog"
          aria-modal="true"
          aria-labelledby="friends-confirm-title"
        >
          <div
            className="friends-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="friends-confirm-title" className="friends-confirm-title">
              Remove friend?
            </h2>
            <p className="friends-confirm-text">
              {confirmRemove.userName} will be removed from your friends. They
              will see Accept / Reject again if they open the chat.
            </p>
            <div className="friends-confirm-actions">
              <button
                type="button"
                onClick={handleCancelRemove}
                className="friends-confirm-cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRemove}
                className="friends-confirm-remove"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
