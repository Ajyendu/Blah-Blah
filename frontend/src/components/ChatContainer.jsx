import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState, useLayoutEffect, Fragment } from "react";
import ImagePreviewModal from "./ImagePreviewModal";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { useMoodBackground } from "./utils/mood/useMoodBackground";
import "./mood.css";
import MessageItem from "./MessageItem";
import NoChatSelected from "./NoChatSelected";
import { formatRevealLabel } from "./MessageItem";
import { useNoteStore } from "../store/useNoteStore";
import { useGameStore } from "../store/useGameStore";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";
import { Trash2, StickyNote } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";
import "./ChatContainer.css";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function formatDateDivider(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ChatContainer = ({
  setCallType,
  setCallActive,
  setActiveCallUserId,
  setActiveCallUserName,
  setActiveCallUserAvatar,
  setCalling,
  startCall,
}) => {
  const {
    isScreenSharing,
    messages,
    getMessagesByConversation,
    loadMoreOlderMessages,
    isMessagesLoading,
    isMessagesLoadingMore,
    hasMoreOlderMessages,
    selectedUser,
    selectedChat,
    markMessageRevealed,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
    subscribeToChatEvents,
    unsubscribeFromChatEvents,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const theme = useThemeStore((s) => s.theme);
  const toggleNote = useNoteStore((s) => s.toggleNote);
  const searchNote = useNoteStore((s) => s.searchNote);
  const noteIds = useNoteStore((s) => s.noteIds);
  const isDrawingOpen = useNoteStore((s) => s.isDrawingOpen);
  const setIsDrawingOpen = useNoteStore((s) => s.setIsDrawingOpen);
  const setIsNotesOpen = useNoteStore((s) => s.setIsNotesOpen);
  const drawingUserIdByChat = useNoteStore((s) => s.drawingUserIdByChat);
  const isVideoPanelOpen = useNoteStore((s) => s.isVideoPanelOpen);
  const setIsVideoPanelOpen = useNoteStore((s) => s.setIsVideoPanelOpen);
  const videoUserIdByChat = useNoteStore((s) => s.videoUserIdByChat);
  const isNotesOpen = useNoteStore((s) => s.isNotesOpen);
  const panelMinimized = useNoteStore((s) => s.panelMinimized);
  const isTruthDareOpen = useGameStore((s) => s.isTruthDareOpen);
  const gamePanelMinimized = useGameStore((s) => s.panelMinimized);
  const setTruthDareOpen = useGameStore((s) => s.setTruthDareOpen);
  const setOpenToGameIndex = useGameStore((s) => s.setOpenToGameIndex);
  const gamePlayingUserIdByChat = useGameStore(
    (s) => s.gamePlayingUserIdByChat
  );
  const gamePlayingGameNameByChat = useGameStore(
    (s) => s.gamePlayingGameNameByChat
  );
  const isMobile = useIsMobile();

  const GAME_NAME_TO_INDEX = {
    "Spin the bottle": 0,
    "Flip the coin": 1,
    "Roll the die": 2,
  };

  const chatIdStr = selectedChat?._id != null ? String(selectedChat._id) : null;

  const otherUserIsPlaying =
    chatIdStr &&
    gamePlayingUserIdByChat[chatIdStr] &&
    String(gamePlayingUserIdByChat[chatIdStr]) === String(selectedUser?._id);
  const showPlayingIndicator = otherUserIsPlaying && !isTruthDareOpen;
  const otherUserGameName = chatIdStr
    ? gamePlayingGameNameByChat[chatIdStr]
    : null;

  const otherUserIsDrawing =
    chatIdStr &&
    drawingUserIdByChat[chatIdStr] &&
    String(drawingUserIdByChat[chatIdStr]) === String(selectedUser?._id);
  const showDrawingIndicator = otherUserIsDrawing && !isDrawingOpen;

  const otherUserHasVideoOpen =
    chatIdStr &&
    videoUserIdByChat[chatIdStr] &&
    String(videoUserIdByChat[chatIdStr]) === String(selectedUser?._id);
  const showVideoIndicator = otherUserHasVideoOpen && !isVideoPanelOpen;

  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const peekScrollTimeoutRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleScrollLoadMore = () => {
    const el = scrollContainerRef.current;
    if (
      !el ||
      !selectedChat?._id ||
      !hasMoreOlderMessages ||
      isMessagesLoadingMore
    )
      return;
    if (el.scrollTop > 100) return;
    const previousScrollHeight = el.scrollHeight;
    loadMoreOlderMessages(selectedChat._id).then(() => {
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          container.scrollTop = container.scrollHeight - previousScrollHeight;
        }
      });
    });
  };

  /* ================= GUARDS ================= */

  if (!selectedChat) {
    return <NoChatSelected />;
  }

  const safeMessages = Array.isArray(messages) ? messages : [];
  const safeLength = safeMessages.length;

  const isPendingChat = selectedChat && !selectedChat.acceptedBy;

  useEffect(() => {
    subscribeToChatEvents();
  }, []);

  useEffect(() => {
    if (!selectedChat?._id || !authUser?._id) return;

    const socket = useAuthStore.getState().socket;

    // ✅ MUST happen first
    socket.emit("join_chat", { chatId: selectedChat._id });

    // then load messages
    getMessagesByConversation(selectedChat._id);

    // then mark seen
    socket.emit("chat_opened", {
      chatId: selectedChat._id,
      userId: authUser._id,
    });
  }, [selectedChat?._id]);

  const fetchNotes = useNoteStore((s) => s.fetchNotes);

  useEffect(() => {
    if (selectedChat?._id) {
      fetchNotes(selectedChat._id);
    }
  }, [selectedChat?._id]);
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.on("bot_typing", (status) => {
      setBotTyping(status);
    });
    return () => socket.off("bot_typing");
  }, []);

  // useEffect(() => {
  //   const socket = useAuthStore.getState().socket;
  //   const { markChatSeen } = useChatStore.getState();

  //   if (!socket) return;

  //   const handleSeenUpdate = ({ chatId, seenAt }) => {
  //     if (chatId !== selectedChat?._id) return;
  //     markChatSeen(chatId, seenAt);
  //   };

  //   socket.on("chat_seen_update", handleSeenUpdate);

  //   return () => {
  //     socket.off("chat_seen_update", handleSeenUpdate);
  //   };
  // }, [selectedChat?._id]);

  /* ================= LOAD + SOCKET ================= */

  /* ================= CHAT EVENTS ================= */

  /* ================= MOOD BACKGROUND ================= */

  useMoodBackground(safeMessages, authUser._id, selectedChat._id);

  /* ================= AUTO SCROLL ================= */

  /* When chat is opened, scroll to bottom so last message shows above the input bar */
  useEffect(() => {
    if (!selectedChat?._id || !scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    const scrollToBottom = () => {
      el.scrollTop = el.scrollHeight;
    };
    const t1 = requestAnimationFrame(scrollToBottom);
    const t2 = setTimeout(scrollToBottom, 150);
    const t3 = setTimeout(scrollToBottom, 400);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [selectedChat?._id]);

  /* When messages finish loading for this chat, scroll to bottom so last message is visible */
  useEffect(() => {
    if (isMessagesLoading || !selectedChat?._id || !scrollContainerRef.current)
      return;
    const el = scrollContainerRef.current;
    el.scrollTop = el.scrollHeight;
    const t = setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 100);
    return () => clearTimeout(t);
  }, [selectedChat?._id, isMessagesLoading]);

  useLayoutEffect(() => {
    if (!bottomRef.current) return;
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [safeLength]);

  /* When panel is slid down (peek visible) on mobile: scroll last message up so it sits above the title bar */
  const peekVisible =
    isMobile &&
    (((isNotesOpen || isDrawingOpen || isVideoPanelOpen) && panelMinimized) ||
      (isTruthDareOpen && gamePanelMinimized));
  useEffect(() => {
    if (!peekVisible || !scrollContainerRef.current) return;

    const el = scrollContainerRef.current;

    const scrollToBottomSmooth = () => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    };

    // initial smooth scroll
    scrollToBottomSmooth();

    // small correction after layout changes
    const t = setTimeout(() => {
      const diff = el.scrollHeight - el.scrollTop - el.clientHeight;

      // only adjust if we're not already at bottom
      if (diff > 2) {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 350); // match your panel transition

    peekScrollTimeoutRef.current = { t };

    return () => {
      clearTimeout(peekScrollTimeoutRef.current?.t);
    };
  }, [peekVisible, safeLength]);

  /* ================= CLOSE MENU ================= */

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".message-menu")) {
        setActiveMenu(null);
      }
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* ================= LOADING ================= */

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader
          setCallType={setCallType}
          setCalling={setCalling}
          setCallActive={setCallActive}
          setActiveCallUserId={setActiveCallUserId}
          setActiveCallUserName={setActiveCallUserName}
          setActiveCallUserAvatar={setActiveCallUserAvatar}
        />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const lastSeenMessageId = (() => {
    const mySeenMessages = safeMessages.filter(
      (m) => String(m.senderId) === String(authUser._id) && m.seenAt
    );

    if (mySeenMessages.length === 0) return null;

    mySeenMessages.sort((a, b) => new Date(a.seenAt) - new Date(b.seenAt));

    return mySeenMessages[mySeenMessages.length - 1]._id;
  })();

  /* ================= RENDER ================= */

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        setCallType={setCallType}
        setCalling={setCalling}
        setCallActive={setCallActive}
        setActiveCallUserId={setActiveCallUserId}
        setActiveCallUserName={setActiveCallUserName}
        setActiveCallUserAvatar={setActiveCallUserAvatar}
        startCall={startCall}
      />

      <div
        className={`chat-container-wrap${
          showPlayingIndicator || showDrawingIndicator || showVideoIndicator
            ? " chat-container-wrap--with-indicator"
            : ""
        }`}
      >
        {showPlayingIndicator && (
          <div className="chat-playing-indicator chat-playing-indicator--overlay">
            <span className="chat-playing-indicator__dot" />
            <span className="chat-playing-indicator__text">
              {selectedUser?.fullName} is playing{" "}
              {otherUserGameName ?? "this game"} — wanna join?
            </span>
            <button
              type="button"
              className="chat-playing-indicator__btn"
              onClick={() => {
                setIsNotesOpen(false);
                setIsDrawingOpen(false);
                setIsVideoPanelOpen(false);
                const idx =
                  otherUserGameName != null
                    ? GAME_NAME_TO_INDEX[otherUserGameName]
                    : 0;
                setOpenToGameIndex(typeof idx === "number" ? idx : 0);
                setTruthDareOpen(true);
              }}
            >
              Join
            </button>
          </div>
        )}
        {showDrawingIndicator && !showPlayingIndicator && (
          <div className="chat-playing-indicator chat-playing-indicator--overlay">
            <span className="chat-playing-indicator__dot" />
            <span className="chat-playing-indicator__text">
              {selectedUser?.fullName} is drawing — wanna open?
            </span>
            <button
              type="button"
              className="chat-playing-indicator__btn"
              onClick={() => {
                setIsNotesOpen(false);
                setTruthDareOpen(false);
                setIsVideoPanelOpen(false);
                setIsDrawingOpen(true);
              }}
            >
              Open
            </button>
          </div>
        )}
        {showVideoIndicator &&
          !showPlayingIndicator &&
          !showDrawingIndicator && (
            <div className="chat-playing-indicator chat-playing-indicator--overlay">
              <span className="chat-playing-indicator__dot" />
              <span className="chat-playing-indicator__text">
                {selectedUser?.fullName} has Watch Party open — wanna join?
              </span>
              <button
                type="button"
                className="chat-playing-indicator__btn"
                onClick={() => {
                  setIsNotesOpen(false);
                  setIsDrawingOpen(false);
                  setTruthDareOpen(false);
                  setIsVideoPanelOpen(true);
                }}
              >
                Open
              </button>
            </div>
          )}
        <div
          ref={scrollContainerRef}
          className="chat-container chat-container-ref flex-1 overflow-y-auto"
          onScroll={handleScrollLoadMore}
        >
          {(() => {
            const filtered = safeMessages.filter(
              (m) => !m.deletedFor?.includes(authUser._id)
            );
            return filtered.map((message, index) => {
              const prev = filtered[index - 1];
              const prevTime = prev ? new Date(prev.createdAt).getTime() : 0;
              const currTime = new Date(message.createdAt).getTime();
              const showDateDivider = currTime - prevTime > ONE_DAY_MS;

              const isMine = message.senderId === authUser._id;
              const menuOpen = activeMenu === message._id;

              const isLastSeen =
                message._id === lastSeenMessageId &&
                message.senderId === authUser._id;

              const isOneToOne = selectedChat?.participants?.length === 2;
              const avatarUrl = isMine
                ? authUser?.profilePic || DEFAULT_AVATAR_URL
                : selectedUser?.profilePic || DEFAULT_AVATAR_URL;

              const followsSameSender =
                !showDateDivider && prev && prev.senderId === message.senderId;

              const next = filtered[index + 1];
              const nextTime = next ? new Date(next.createdAt).getTime() : 0;
              const sameSenderBelow =
                next &&
                next.senderId === message.senderId &&
                nextTime - currTime <= ONE_DAY_MS;

              return (
                <Fragment key={message._id}>
                  {showDateDivider && (
                    <div className="chat-date-divider">
                      {formatDateDivider(message.createdAt)}
                    </div>
                  )}
                  <div
                    className={`msg-row ${
                      isMine ? "msg-row--mine" : "msg-row--theirs"
                    } ${isOneToOne ? "msg-row--no-avatar" : ""} ${
                      followsSameSender ? "msg-row--follows-same" : ""
                    } ${sameSenderBelow ? "msg-row--same-sender-below" : ""}`}
                  >
                    {!isOneToOne && (
                      <img src={avatarUrl} alt="" className="msg-row__avatar" />
                    )}
                    <div className="relative flex items-start max-w-[75%] group message-menu">
                      {/* For receiver: bubble first so layout doesn't collapse; for mine: menu first */}
                      {!isMine && (
                        <>
                          <div className="msg-bubble-wrapper">
                            <div
                              className={`msg-bubble-ref msg-bubble-ref--theirs ${
                                noteIds.has(message._id)
                                  ? "msg-bubble-ref--note"
                                  : ""
                              }`}
                              id={`msg-${message._id}`}
                            >
                              {message.deleted ? (
                                <p className="italic text-xs opacity-70 text-inherit whitespace-nowrap">
                                  Message deleted by {selectedUser.fullName}
                                </p>
                              ) : (
                                <MessageItem
                                  message={message}
                                  onReveal={() =>
                                    markMessageRevealed(message._id)
                                  }
                                />
                              )}
                            </div>
                          </div>
                          {!message.deleted && !isPendingChat && (
                            <div className="relative flex items-center flex-shrink-0">
                              {menuOpen && (
                                <div
                                  type="button"
                                  onClick={(e) => e.stopPropagation()}
                                  className="msg-dropdown absolute left-full ml-2 top-0 z-50 rounded-md py-0.5 animate-scale-in"
                                >
                                  <button
                                    onClick={() => {
                                      deleteMessage(message._id, "me");
                                      setActiveMenu(null);
                                    }}
                                    className="msg-dropdown__item msg-dropdown__item--danger"
                                  >
                                    <Trash2
                                      size={12}
                                      className="msg-dropdown__icon"
                                    />
                                    <span>Delete for me</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      toggleNote({
                                        chatId: selectedChat._id,
                                        messageId: message._id,
                                      });
                                      setActiveMenu(null);
                                    }}
                                    className="msg-dropdown__item"
                                  >
                                    <StickyNote
                                      size={12}
                                      className="msg-dropdown__icon text-gray-600"
                                    />
                                    <span>
                                      {noteIds.has(message._id)
                                        ? "Unmark note"
                                        : "Mark note"}
                                    </span>
                                  </button>
                                  <div className="msg-dropdown__item msg-dropdown__item--muted msg-dropdown__item--muted-left">
                                    <span>
                                      {formatRevealLabel(message.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenu(message._id);
                                }}
                                className={`msg-three-dots-btn ${
                                  menuOpen
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                                }`}
                              >
                                ⋮
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      {isMine && (
                        <>
                          {!message.deleted && !isPendingChat && (
                            <div className="relative flex items-center flex-shrink-0">
                              {menuOpen && (
                                <div
                                  type="button"
                                  onClick={(e) => e.stopPropagation()}
                                  className="msg-dropdown absolute right-full mr-2 top-0 z-50 rounded-md py-0.5 animate-scale-in"
                                >
                                  <div className="msg-dropdown__row">
                                    <button
                                      onClick={() => {
                                        deleteMessage(message._id, "me");
                                        setActiveMenu(null);
                                      }}
                                      className="msg-dropdown__item msg-dropdown__item--danger"
                                    >
                                      <Trash2
                                        size={12}
                                        className="msg-dropdown__icon"
                                      />
                                      <span>Delete for me</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        deleteMessage(message._id, "everyone");
                                        setActiveMenu(null);
                                      }}
                                      className="msg-dropdown__item msg-dropdown__item--danger"
                                    >
                                      <Trash2
                                        size={12}
                                        className="msg-dropdown__icon"
                                      />
                                      <span>Delete for everyone</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        toggleNote({
                                          chatId: selectedChat._id,
                                          messageId: message._id,
                                        });
                                        setActiveMenu(null);
                                      }}
                                      className="msg-dropdown__item"
                                    >
                                      <StickyNote
                                        size={12}
                                        className="msg-dropdown__icon text-gray-600"
                                      />
                                      <span>
                                        {noteIds.has(message._id)
                                          ? "Unmark note"
                                          : "Mark note"}
                                      </span>
                                    </button>
                                  </div>
                                  <div className="msg-dropdown__item msg-dropdown__item--muted">
                                    <span>
                                      {formatRevealLabel(message.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenu(message._id);
                                }}
                                className={`msg-three-dots-btn ${
                                  menuOpen
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                                }`}
                              >
                                ⋮
                              </button>
                            </div>
                          )}
                          <div className="msg-bubble-wrapper">
                            <div
                              className={`msg-bubble-ref msg-bubble-ref--mine ${
                                noteIds.has(message._id)
                                  ? "msg-bubble-ref--note"
                                  : ""
                              }`}
                              id={`msg-${message._id}`}
                            >
                              {message.deleted ? (
                                <p className="italic text-xs opacity-70 text-inherit whitespace-nowrap">
                                  Message deleted by you
                                </p>
                              ) : (
                                <MessageItem
                                  message={message}
                                  onReveal={() =>
                                    markMessageRevealed(message._id)
                                  }
                                />
                              )}
                            </div>
                            {isLastSeen && isMine && (
                              <div className="msg-seen-below msg-seen-below--mine">
                                {`Seen at ${formatRevealLabel(message.seenAt)}`}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Fragment>
              );
            });
          })()}
          {botTyping && (
            <div className="bot-typing">
              <span className="bot-name"></span>
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {/* ALWAYS PRESENT */}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="chat-input-bar-wrap">
        <MessageInput />
      </div>

      <ImagePreviewModal
        src={previewImage}
        onClose={() => setPreviewImage(null)}
      />
      {/* ================= SCREEN SHARE (UI ONLY) ================= */}
    </div>
  );
};

export default ChatContainer;
