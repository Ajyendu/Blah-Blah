import { useEffect, useState } from "react";
import "./mood.css";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

export function formatRevealLabel(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  const time = formatMessageTime(timestamp);

  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isSameDay) {
    return `${time} today`;
  }

  if (isYesterday) {
    return `${time} yesterday`;
  }

  const formattedDate = date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${time} on ${formattedDate}`;
}

export function formatDuration(ms) {
  if (ms <= 0) return "Revealing now";

  let totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const parts = [];

  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hr`);
  if (minutes) parts.push(`${minutes} min`);
  if (seconds || parts.length === 0) parts.push(`${seconds} sec`);

  return parts.join(" ");
}

/* ================= ⏳ COUNTDOWN ================= */

function TimedCountdown({ revealAt, onReveal }) {
  const [remaining, setRemaining] = useState(
    Math.max(0, new Date(revealAt) - Date.now())
  );

  useEffect(() => {
    const i = setInterval(() => {
      const diff = new Date(revealAt) - Date.now();
      if (diff <= 0) {
        clearInterval(i);
        onReveal?.();
        setRemaining(0);
      } else {
        setRemaining(diff);
      }
    }, 1000);

    return () => clearInterval(i);
  }, [revealAt]);

  if (remaining <= 0) return null;

  return (
    <div className="text-[10px] opacity-60 text-right">
      ⏳ Reveals in {formatDuration(remaining)}
    </div>
  );
}

/* ================= 💬 TIMED TEXT ================= */

function TimedTextMessage({ message, onReveal }) {
  const { authUser } = useAuthStore();

  const isSender = message.senderId === authUser._id;
  const isTimed = message.revealAt && !message.revealed;

  if (isTimed && !message.revealed) {
    return (
      <TimedCountdown
        revealAt={message.revealAt}
        revealed={message.revealed}
        onReveal={onReveal}
      />
    );
  }

  return (
    <div>
      {isTimed && !isSender && (
        <div className="message-bubble">{message.text}</div>
      )}
    </div>
  );
}

/* ================= 🎭 TIMED MEDIA ================= */

function TimedMedia({ message }) {
  const revealed = message.revealed;

  return (
    <div className="timed-media-wrapper">
      <div
        className={`timed-media ${revealed ? "revealed" : "blurred"}`}
        aria-hidden={!revealed}
      >
        {message.mediaType === "image" && (
          <img src={message.mediaUrl} alt="Timed media" draggable={false} />
        )}

        {message.mediaType === "video" && (
          <video
            src={message.mediaUrl}
            controls={revealed}
            preload="metadata"
          />
        )}
      </div>

      {!revealed && (
        <div className="media-countdown">
          <TimedCountdown revealAt={message.revealAt} revealed={revealed} />
        </div>
      )}
    </div>
  );
}

/* ================= MESSAGE SWITCH ================= */

function MessageItem({ message, onReveal }) {
  const { authUser } = useAuthStore();

  const isSender = message.senderId === authUser._id;
  const isTimed = message.revealAt && !message.revealed;

  // 🔐 RECEIVER – hide content
  if (isTimed && message.revealAt && !isSender) {
    return <TimedTextMessage message={message} onReveal={onReveal} />;
  }
  if (isTimed && message.revealAt && isSender) {
    return (
      <div className="message-bubble">
        {message.text}{" "}
        <TimedTextMessage message={message} onReveal={onReveal} />
      </div>
    );
  }

  // ✅ SENDER OR REVEALED
  return (
    <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
      <div className="message-bubble">
        <div>{message.text}</div>
      </div>

      {message.revealAt && message.revealed && (
        <div
          className={`text-[10px] opacity-60 mt-1 text-red-500 ${
            isSender ? "text-right" : "text-left"
          }`}
        >
          {`Revealed at ${formatRevealLabel(message.revealAt)}`}
        </div>
      )}
    </div>
  );
}

export default MessageItem;
