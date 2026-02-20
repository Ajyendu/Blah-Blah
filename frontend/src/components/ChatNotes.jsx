import { useEffect, useState } from "react";
import { useNoteStore } from "../store/useNoteStore";
import { useChatStore } from "../store/useChatStore";
import "./mood.css";

window.jumpToMessage = (id) => {
  const el = document.getElementById(`msg-${id}`);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("flash");

  setTimeout(() => el.classList.remove("flash"), 1500);
};

const ChatNotes = () => {
  const { selectedChat } = useChatStore();
  const { notes, fetchNotes } = useNoteStore();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (selectedChat?._id) {
      fetchNotes(selectedChat._id);
    }
  }, [selectedChat?._id]);

  const filtered = notes.filter((n) =>
    n.previewText.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-4 h-full overflow-y-auto">
      <input
        placeholder="Search notes..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full mb-3 p-2 rounded border"
      />

      {filtered.map((note) => (
        <div
          key={note._id}
          className="p-3 mb-2 rounded bg-yellow-50 cursor-pointer hover:bg-yellow-100 transition"
          onClick={() => window.jumpToMessage(note.messageId)}
        >
          <p className="text-sm">{note.previewText}</p>

          <span className="text-xs opacity-60">
            {new Date(note.messageCreatedAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatNotes;
