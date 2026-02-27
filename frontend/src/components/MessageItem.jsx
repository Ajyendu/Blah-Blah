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

export function formatDateTimeFull(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatDuration(ms) {
  if (ms <= 0) return "Revealing now";

  let total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  total %= 3600;
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  const h = String(hours).padStart(2, "0");
  const m = String(mins).padStart(2, "0");
  const s = String(secs).padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
}

/* ================= ⏳ COUNTDOWN ================= */

function TimedCountdown({ revealAt, onReveal }) {
  const [remaining, setRemaining] = useState(
    Math.max(0, new Date(revealAt) - Date.now()),
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
  }, [revealAt, onReveal]);

  if (remaining <= 0) return null;

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="countdown-flip">
      <div className="countdown-flip__title">SAVE THE DATE</div>
      <div className="countdown-flip__row">
        <div className="countdown-flip__segment">
          <div className="countdown-flip__digits">
            <span className="countdown-flip__digit">{pad(days)[0]}</span>
            <span className="countdown-flip__digit">{pad(days)[1]}</span>
          </div>
          <div className="countdown-flip__label">Days</div>
        </div>
        <span className="countdown-flip__colon">:</span>
        <div className="countdown-flip__segment">
          <div className="countdown-flip__digits">
            <span className="countdown-flip__digit">{pad(hours)[0]}</span>
            <span className="countdown-flip__digit">{pad(hours)[1]}</span>
          </div>
          <div className="countdown-flip__label">Hours</div>
        </div>
        <span className="countdown-flip__colon">:</span>
        <div className="countdown-flip__segment">
          <div className="countdown-flip__digits">
            <span className="countdown-flip__digit">{pad(minutes)[0]}</span>
            <span className="countdown-flip__digit">{pad(minutes)[1]}</span>
          </div>
          <div className="countdown-flip__label">Minutes</div>
        </div>
        <span className="countdown-flip__colon">:</span>
        <div className="countdown-flip__segment">
          <div className="countdown-flip__digits">
            <span className="countdown-flip__digit">{pad(secs)[0]}</span>
            <span className="countdown-flip__digit">{pad(secs)[1]}</span>
          </div>
          <div className="countdown-flip__label">Seconds</div>
        </div>
      </div>
      <div className="countdown-flip__datetime">
        {formatDateTimeFull(revealAt)}
      </div>
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
  const [botTyping, setBotTyping] = useState(false);

  const isSender = message.senderId === authUser._id;
  const isTimed = message.revealAt && !message.revealed;
  const BOT_ID = "6997e34d5bfffd55ff54458d";
  const isBot = message.senderId === BOT_ID;

  // 🔐 RECEIVER – hide content
  if (isTimed && message.revealAt && !isSender) {
    return <TimedTextMessage message={message} onReveal={onReveal} />;
  }
  if (isTimed && message.revealAt && isSender) {
    return (
      <div className="message-bubble message-bubble--timed">
        <TimedTextMessage message={message} onReveal={onReveal} />
        {message.text && (
          <div className="timed-message-text">{message.text}</div>
        )}
      </div>
    );
  }

  // ✅ SENDER OR REVEALED
  return (
    <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
      <div
        className={`message-bubble ${
          isBot ? "bot-bubble" : isSender ? "sender-bubble" : "receiver-bubble"
        }`}
      >
        <div>{message.text}</div>
        {message.image &&
          ((message.fileName &&
            !/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i.test(
              message.fileName,
            )) ||
          message.image.includes("/raw/") ? (
            <a
              href={message.image}
              target="_blank"
              rel="noopener noreferrer"
              className="msg-attachment-link msg-attachment-file"
            >
              📎 {message.fileName || "Download file"}
            </a>
          ) : (
            <a
              href={message.image}
              target="_blank"
              rel="noopener noreferrer"
              className="msg-attachment-link"
            >
              <img src={message.image} alt="" className="msg-attachment-img" />
            </a>
          ))}
      </div>

      {message.revealAt && message.revealed && (
        <div
          className={`text-[10px] opacity-60 mt-1 text-gray-500 ${
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
