import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import ImagePreviewModal from "./ImagePreviewModal";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { useThemeStore } from "../store/useThemeStore";
import { useMoodBackground } from "./utils/mood/useMoodBackground";
import "./mood.css";
import MessageItem from "./MessageItem";
import NoChatSelected from "./NoChatSelected";
import { formatRevealLabel } from "./MessageItem";
import { useNoteStore } from "../store/useNoteStore";

const ChatContainer = ({
  setCallType,
  setCallActive,
  setActiveCallUserId,
  setActiveCallUserName,
  setActiveCallUserAvatar,
  setCalling,
}) => {
  const {
    isScreenSharing,
    messages,
    getMessagesByConversation,
    isMessagesLoading,
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

  const bottomRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  /* ================= GUARDS ================= */

  if (!selectedChat) {
    return <NoChatSelected />;
  }

  const safeMessages = Array.isArray(messages) ? messages : [];
  const safeLength = safeMessages.length;

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

  useMoodBackground(safeMessages, authUser._id);

  /* ================= AUTO SCROLL ================= */

  useLayoutEffect(() => {
    if (!bottomRef.current) return;
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [safeLength]);

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
    <div className="flex flex-col h-full bg-white">
      <ChatHeader
        setCallType={setCallType}
        setCalling={setCalling}
        setCallActive={setCallActive}
        setActiveCallUserId={setActiveCallUserId}
        setActiveCallUserName={setActiveCallUserName}
        setActiveCallUserAvatar={setActiveCallUserAvatar}
      />

      {/* ================= MESSAGES ================= */}
      <div className="chat-container flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {safeMessages
          .filter((m) => !m.deletedFor?.includes(authUser._id))
          .map((message) => {
            const isMine = message.senderId === authUser._id;
            const menuOpen = activeMenu === message._id;

            const isLastSeen =
              message._id === lastSeenMessageId &&
              message.senderId === authUser._id;

            return (
              <div
                key={message._id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div className="relative flex items-start max-w-[75%] group message-menu">
                  {/* MENU */}
                  {isMine && !message.deleted && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(message._id);
                      }}
                      className={`mr-1 w-6 h-6 rounded-full flex items-center justify-center
                        text-gray-400 hover:bg-black/10 transition
                        ${
                          menuOpen
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      ⋮
                    </button>
                  )}

                  {/* BUBBLE */}
                  <div
                    className={`relative px-3 py-2 rounded-2xl text-sm shadow
                      ${isMine ? "rounded-br-md" : "rounded-bl-md"}`}
                    id={`msg-${message._id}`}
                    style={{ backgroundColor: "white", color: "black" }}
                  >
                    {message.deleted ? (
                      <p
                        className="italic text-xs pr-10 opacity-70"
                        style={{ color: theme.textSecondary }}
                      >
                        Message deleted by{" "}
                        {message.deletedBy === authUser._id
                          ? "you"
                          : selectedUser.fullName}
                      </p>
                    ) : (
                      <>
                        <MessageItem
                          message={message}
                          onReveal={() => markMessageRevealed(message._id)}
                        />
                        {isLastSeen && (
                          <div className="text-[10px] text-black opacity-30 mt-1 text-right">
                            {`Seen at ${formatRevealLabel(message.seenAt)} `}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* DELETE MENU */}
                  {menuOpen && (
                    <div
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-full mr-2 top-0
    bg-white/90 backdrop-blur shadow-xl rounded-xl
    overflow-hidden text-sm w-44 z-50 animate-scale-in"
                    >
                      <button
                        onClick={() => {
                          deleteMessage(message._id, "me");
                          setActiveMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-black/5"
                      >
                        Delete for me
                      </button>

                      <button
                        onClick={() => {
                          deleteMessage(message._id, "everyone");
                          setActiveMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-red-500 hover:bg-black/5"
                      >
                        Delete for everyone
                      </button>

                      <button
                        onClick={() => {
                          toggleNote({
                            chatId: selectedChat._id,
                            messageId: message._id,
                          });
                          setActiveMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-black/5 text-green-500"
                      >
                        {noteIds.has(message._id) ? "Unmark note" : "Mark note"}
                      </button>

                      {isMine && (
                        <div className="px-4 py-2 text-[10px] opacity-60">
                          {`Sent at ${formatRevealLabel(message.createdAt)}`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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

      <MessageInput />

      <ImagePreviewModal
        src={previewImage}
        onClose={() => setPreviewImage(null)}
      />
      {/* ================= SCREEN SHARE (UI ONLY) ================= */}
    </div>
  );
};

export default ChatContainer;
