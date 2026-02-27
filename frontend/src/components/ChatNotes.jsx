import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNoteStore } from "../store/useNoteStore";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import "./mood.css";
import "./ChatNotes.css";

window.jumpToMessage = (id) => {
  const el = document.getElementById(`msg-${id}`);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("msg-bubble-ref--jump");

  setTimeout(() => el.classList.remove("msg-bubble-ref--jump"), 700);
};

const ChatNotes = () => {
  const { selectedChat, messages } = useChatStore();
  const { notes, fetchNotes, setIsNotesOpen } = useNoteStore();
  const authUser = useAuthStore((s) => s.authUser);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("added"); // "added" | "message"

  useEffect(() => {
    if (selectedChat?._id) {
      fetchNotes(selectedChat._id);
    }
  }, [selectedChat?._id, fetchNotes]);

  const filtered = notes
    .filter((note) => {
      const msg = Array.isArray(messages)
        ? messages.find((m) => String(m._id) === String(note.messageId))
        : null;
      if (!msg) return false;
      if (msg.deleted) return false;
      if (msg.deletedFor?.includes(authUser?._id)) return false;
      return true;
    })
    .filter((n) =>
      n.previewText.toLowerCase().includes(q.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "added") {
        const tA = new Date(a.createdAt || 0).getTime();
        const tB = new Date(b.createdAt || 0).getTime();
        return tB - tA; // newest first
      }
      const tA = new Date(a.messageCreatedAt || 0).getTime();
      const tB = new Date(b.messageCreatedAt || 0).getTime();
      return tB - tA; // newest first
    });

  return (
    <div className="chat-notes-block">
      <header className="chat-notes-block__header">
        <h2 className="chat-notes-block__title">Notes</h2>
        <button
          type="button"
          className="chat-notes-block__close"
          onClick={() => setIsNotesOpen(false)}
          aria-label="Close notes"
        >
          <X size={20} />
        </button>
      </header>

      <div className="chat-notes-block__body">
        <input
          type="text"
          placeholder="Search notes..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="chat-notes-block__search"
        />

        <div className="chat-notes-block__sort">
          <span className="chat-notes-block__sort-label">Sort by</span>
          <div className="chat-notes-block__sort-btns">
            <button
              type="button"
              className={`chat-notes-block__sort-btn ${sortBy === "added" ? "chat-notes-block__sort-btn--active" : ""}`}
              onClick={() => setSortBy("added")}
            >
              Date added
            </button>
            <button
              type="button"
              className={`chat-notes-block__sort-btn ${sortBy === "message" ? "chat-notes-block__sort-btn--active" : ""}`}
              onClick={() => setSortBy("message")}
            >
              Message date
            </button>
          </div>
        </div>

        {filtered.map((note) => {
          let senderId = note.messageSenderId;
          if (!senderId && note.messageId && Array.isArray(messages)) {
            const msg = messages.find(
              (m) => String(m._id) === String(note.messageId),
            );
            if (msg) senderId = msg.senderId;
          }
          const isMine = senderId && String(senderId) === String(authUser?._id);
          return (
            <button
              key={note._id}
              type="button"
              className={`chat-notes-block__item ${isMine ? "chat-notes-block__item--mine" : "chat-notes-block__item--theirs"}`}
              onClick={() => window.jumpToMessage(note.messageId)}
            >
              {note.previewText}
              <span className="chat-notes-block__item-meta">
                {new Date(note.messageCreatedAt).toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatNotes;
