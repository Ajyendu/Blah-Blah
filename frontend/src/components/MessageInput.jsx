import { useEffect, useRef, useState } from "react";
import {
  Paperclip,
  Send,
  X,
  Clock,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import "./MessageInput.css";

/* ================= DATE/TIME PICKER HELPERS ================= */

const CURRENT_YEAR = new Date().getFullYear();

function getDaysInMonth(year, month1To12) {
  return new Date(year, month1To12, 0).getDate();
}

/** Clamp datetime to the current moment so past times cannot be set. */
function clampToFuture(year, month1To12, day, hours, minutes, seconds) {
  const maxDay = getDaysInMonth(year, month1To12);
  const safeDay = Math.min(day, maxDay);
  const d = new Date(year, month1To12 - 1, safeDay, hours, minutes, seconds);
  const now = new Date();
  if (d.getTime() <= now.getTime()) {
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  }
  return { year, month: month1To12, day: safeDay, hours, minutes, seconds };
}

/* ================= UTIL ================= */

export const formatDuration = (ms) => {
  let total = Math.max(0, Math.floor(ms / 1000));

  const hours = Math.floor(total / 3600);
  total %= 3600;
  const mins = Math.floor(total / 60);
  const secs = total % 60;

  const h = String(hours).padStart(2, "0");
  const m = String(mins).padStart(2, "0");
  const s = String(secs).padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
};

const ITEM_HEIGHT = 28;

function DurationWheelColumn({ value, max, label, onChange, format }) {
  const formatItem = format
    ? (i) => format(i)
    : (i) => String(i).padStart(2, "0");
  const wheelAccumRef = useRef(0);
  const prevValueRef = useRef(value);
  const [slideDir, setSlideDir] = useState(null);

  useEffect(() => {
    if (slideDir === null) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlideDir(null));
    });
    return () => cancelAnimationFrame(id);
  }, [slideDir]);

  const prevVal = value === 0 ? max : value - 1;
  const nextVal = value === max ? 0 : value + 1;
  const displayValues = [prevVal, value, nextVal];

  const triggerSlide = (dir) => {
    setSlideDir(dir);
    prevValueRef.current = value;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const THRESHOLD = 40;
    wheelAccumRef.current += e.deltaY;
    if (wheelAccumRef.current >= THRESHOLD) {
      wheelAccumRef.current = 0;
      const next = value === max ? 0 : value + 1;
      onChange(next);
      triggerSlide("up");
    } else if (wheelAccumRef.current <= -THRESHOLD) {
      wheelAccumRef.current = 0;
      const prev = value === 0 ? max : value - 1;
      onChange(prev);
      triggerSlide("down");
    }
  };

  const goUp = () => {
    const next = value === max ? 0 : value + 1;
    onChange(next);
    triggerSlide("up");
  };
  const goDown = () => {
    const prev = value === 0 ? max : value - 1;
    onChange(prev);
    triggerSlide("down");
  };

  const stripClass = [
    "duration-wheel__strip",
    slideDir === "up" && "duration-wheel__strip--slide-from-up",
    slideDir === "down" && "duration-wheel__strip--slide-from-down",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="duration-wheel__col">
      <div className="duration-wheel__label">{label}</div>
      <button
        type="button"
        className="duration-wheel__arrow duration-wheel__arrow--up"
        onClick={goDown}
        aria-label={`Increase ${label}`}
      >
        <ChevronUp size={14} />
      </button>
      <div
        className="duration-wheel__viewport"
        onWheel={handleWheel}
        role="region"
        aria-label={`Set ${label}`}
      >
        <div className={stripClass}>
          {displayValues.map((v, idx) => (
            <div
              key={idx}
              className={`duration-wheel__item ${idx === 1 ? "duration-wheel__item--selected" : ""}`}
              style={{ height: ITEM_HEIGHT }}
            >
              {formatItem(v)}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="duration-wheel__arrow duration-wheel__arrow--down"
        onClick={goUp}
        aria-label={`Decrease ${label}`}
      >
        <ChevronDown size={14} />
      </button>
    </div>
  );
}

/* ================= COMPONENT ================= */

const MessageInput = () => {
  const { authUser } = useAuthStore();
  const { selectedChat, selectedUser, sendMessage, acceptChat, rejectChat } =
    useChatStore();

  const fileInputRef = useRef(null);
  const pickerRef = useRef(null);

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [attachedFileName, setAttachedFileName] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("datetime"); // duration | datetime

  // duration parts
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // datetime (year, month 1-12, day 1-31, hours 0-23, minutes 0-59, seconds 0-59)
  const defaultDt = () => {
    const d = new Date();
    d.setHours(d.getHours() + 1, 0, 0, 0);
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hours: d.getHours(),
      minutes: 0,
      seconds: 0,
    };
  };
  const [dtYear, setDtYear] = useState(() => defaultDt().year);
  const [dtMonth, setDtMonth] = useState(() => defaultDt().month);
  const [dtDay, setDtDay] = useState(() => defaultDt().day);
  const [dtHours, setDtHours] = useState(() => defaultDt().hours);
  const [dtMinutes, setDtMinutes] = useState(() => defaultDt().minutes);
  const [dtSeconds, setDtSeconds] = useState(() => defaultDt().seconds);

  // after user changes hours/minutes/seconds once, show time row above date row
  const [hasPickedTimeOnce, setHasPickedTimeOnce] = useState(false);

  // preview only (NOT sent)
  const [previewMs, setPreviewMs] = useState(null);
  const [previewSetByDateTime, setPreviewSetByDateTime] = useState(false);
  const [previewTargetTs, setPreviewTargetTs] = useState(null);
  const [previewTick, setPreviewTick] = useState(0);

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const close = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  /* Tick preview countdown every second only for date/time mode (duration countdown starts on send) */
  useEffect(() => {
    if (!previewMs || !previewSetByDateTime) return;
    const i = setInterval(() => setPreviewTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, [previewMs, previewSetByDateTime]);

  /* Clamp datetime to future when opening Date & Time tab */
  useEffect(() => {
    if (showPicker && mode === "datetime") {
      const c = clampToFuture(
        dtYear,
        dtMonth,
        dtDay,
        dtHours,
        dtMinutes,
        dtSeconds,
      );
      if (
        c.year !== dtYear ||
        c.month !== dtMonth ||
        c.day !== dtDay ||
        c.hours !== dtHours ||
        c.minutes !== dtMinutes ||
        c.seconds !== dtSeconds
      ) {
        setDtYear(c.year);
        setDtMonth(c.month);
        setDtDay(c.day);
        setDtHours(c.hours);
        setDtMinutes(c.minutes);
        setDtSeconds(c.seconds);
      }
    }
  }, [showPicker, mode]);

  /* ================= BLOCK ================= */

  /** Receiver sees Accept/Reject until they accept; messaging is allowed on both devices (no block). */
  const createdById = selectedChat?.createdBy?._id ?? selectedChat?.createdBy;
  const isReceiver = authUser?._id && selectedChat && String(createdById) !== String(authUser._id);
  const showAcceptReject =
    selectedChat && !selectedChat.acceptedBy && isReceiver;

  /** When chat is pending (not accepted): no file or timer — text only, on both devices */
  const isPendingChat = selectedChat && !selectedChat.acceptedBy;
  const fileAndTimerDisabled = isPendingChat;

  useEffect(() => {
    if (fileAndTimerDisabled) setShowPicker(false);
  }, [fileAndTimerDisabled]);

  /* ================= FILE (any type) ================= */
  const handleFileChange = (e) => {
    if (fileAndTimerDisabled) {
      e.target.value = "";
      return;
    }
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setAttachedFileName(file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  /* ================= APPLY TIMER ================= */

  const applyTimer = () => {
    let ms = null;

    if (mode === "duration") {
      ms = hours * 3600000 + minutes * 60000 + seconds * 1000;

      if (ms <= 0) {
        toast.error("Timer must be > 0");
        return;
      }
    }

    if (mode === "datetime") {
      const maxDay = getDaysInMonth(dtYear, dtMonth);
      const day = Math.min(dtDay, maxDay);
      const target = new Date(
        dtYear,
        dtMonth - 1,
        day,
        dtHours,
        dtMinutes,
        dtSeconds,
      ).getTime();
      if (target <= Date.now()) {
        toast.error("Choose a future date and time");
        return;
      }
      ms = target - Date.now();
    }

    setPreviewMs(ms);
    setPreviewSetByDateTime(mode === "datetime");
    setPreviewTargetTs(Date.now() + ms);
    setShowPicker(false);
  };

  /* ================= SEND ================= */

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (fileAndTimerDisabled && (imagePreview || previewMs)) {
      toast.error("File and timer are available after chat is accepted");
      return;
    }

    // 🔥 TIMER STARTS HERE
    const revealAt = fileAndTimerDisabled ? null : (previewMs ? Date.now() + previewMs : null);

    await sendMessage({
      receiverId: selectedUser._id,
      conversationId: selectedChat._id,
      text: text.trim(),
      image: fileAndTimerDisabled ? undefined : imagePreview,
      fileName: fileAndTimerDisabled ? undefined : (attachedFileName || undefined),
      revealAt,
      revealed: !revealAt,
    });

    // reset
    setText("");
    setImagePreview(null);
    setAttachedFileName("");
    setPreviewMs(null);
    setPreviewSetByDateTime(false);
    setPreviewTargetTs(null);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    const def = defaultDt();
    setDtYear(def.year);
    setDtMonth(def.month);
    setDtDay(def.day);
    setDtHours(def.hours);
    setDtMinutes(def.minutes);
    setDtSeconds(def.seconds);
  };

  /* ================= RENDER ================= */

  return (
    <div className="message-input-ref relative">
      {previewMs && (
        <div className="message-input-ref__timer-info">
          <span className="message-input-ref__timer-info-text">
            {previewSetByDateTime
              ? (() => {
                  const d = new Date(Date.now() + previewMs);
                  const dateStr = d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                  const timeStr = d.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  });
                  return `Reveal on ${dateStr} at ${timeStr}`;
                })()
              : (() => {
                  const remaining =
                    previewSetByDateTime && previewTargetTs != null
                      ? Math.max(0, previewTargetTs - Date.now())
                      : previewMs;
                  return `Reveals in ${formatDuration(remaining)}`;
                })()}
          </span>
          <button
            type="button"
            onClick={() => {
              setPreviewMs(null);
              setPreviewSetByDateTime(false);
              setPreviewTargetTs(null);
            }}
            className="message-input-ref__timer-clear"
            aria-label="Remove scheduled time"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {imagePreview && (
        <div className="message-input-ref__preview">
          {imagePreview.startsWith("data:image/") ? (
            <img src={imagePreview} alt="Preview" />
          ) : (
            <span className="message-input-ref__file-name">
              {attachedFileName || "File attached"}
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              setImagePreview(null);
              setAttachedFileName("");
            }}
            className="message-input-ref__preview-remove"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <form onSubmit={handleSend} className="message-input-ref__bar">
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="*/*"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className={`message-input-ref__attach ${fileAndTimerDisabled ? "message-input-ref__attach--disabled" : ""}`}
          onClick={() => !fileAndTimerDisabled && fileInputRef.current?.click()}
          aria-label="Attach"
          disabled={fileAndTimerDisabled}
          title={fileAndTimerDisabled ? "Available after chat is accepted" : "Attach"}
        >
          <Paperclip size={20} />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="message-input-ref__input"
          placeholder="Your message"
        />

        <div
          className="message-input-ref__extra message-input-ref__extra--has-picker"
          ref={pickerRef}
        >
          {showPicker && (
            <div className={`timer-picker ${previewMs ? "timer-picker--shift-up" : ""}`}>
              <div className="timer-picker__tabs">
            <button
                  type="button"
                  className={`timer-picker__tab ${mode === "datetime" ? "timer-picker__tab--active" : ""}`}
              onClick={() => setMode("datetime")}
            >
              Date & Time
            </button>
            <button
                  type="button"
                  className={`timer-picker__tab ${mode === "duration" ? "timer-picker__tab--active" : ""}`}
              onClick={() => setMode("duration")}
            >
              Duration
            </button>
          </div>

          {mode === "duration" && (
                <div className="timer-picker__duration">
                  <div className="duration-wheel">
                    <DurationWheelColumn
                  value={hours}
                      max={23}
                      label="h"
                      onChange={setHours}
                      format={(v) => String(v).padStart(2, "0") + "h"}
                    />
                    <DurationWheelColumn
                  value={minutes}
                      max={59}
                      label="m"
                      onChange={setMinutes}
                      format={(v) => String(v).padStart(2, "0") + "m"}
                    />
                    <DurationWheelColumn
                  value={seconds}
                      max={59}
                      label="s"
                      onChange={setSeconds}
                      format={(v) => String(v).padStart(2, "0") + "s"}
                    />
              </div>
                </div>
          )}

          {mode === "datetime" && (
                <div className="timer-picker__datetime">
                  <div className="timer-picker__duration timer-picker__duration--datetime">
                    {hasPickedTimeOnce ? (
                      <>
                        <div className="duration-wheel">
                      <DurationWheelColumn
                        value={dtHours}
                        max={23}
                        label="Hours"
                        onChange={(v) => {
                          setHasPickedTimeOnce(true);
                          const c = clampToFuture(
                            dtYear,
                            dtMonth,
                            dtDay,
                            v,
                            dtMinutes,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                      />
                      <DurationWheelColumn
                        value={dtMinutes}
                        max={59}
                        label="Minutes"
                        onChange={(v) => {
                          setHasPickedTimeOnce(true);
                          const c = clampToFuture(
                            dtYear,
                            dtMonth,
                            dtDay,
                            dtHours,
                            v,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                      />
                      <DurationWheelColumn
                        value={dtSeconds}
                        max={59}
                        label="Seconds"
                        onChange={(v) => {
                          setHasPickedTimeOnce(true);
                          const c = clampToFuture(
                            dtYear,
                            dtMonth,
                            dtDay,
                            dtHours,
                            dtMinutes,
                            v,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                      />
                    </div>
                        <div className="duration-wheel duration-wheel--row">
                      <DurationWheelColumn
                        value={dtYear - CURRENT_YEAR}
                        max={20}
                        label="Year"
                        onChange={(v) => {
                          const y = CURRENT_YEAR + v;
                          const c = clampToFuture(
                            y,
                            dtMonth,
                            dtDay,
                            dtHours,
                            dtMinutes,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                        format={(v) => String(CURRENT_YEAR + v)}
                      />
                      <DurationWheelColumn
                        value={dtMonth - 1}
                        max={11}
                        label="Month"
                        onChange={(v) => {
                          const m = v + 1;
                          const c = clampToFuture(
                            dtYear,
                            m,
                            dtDay,
                            dtHours,
                            dtMinutes,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                        format={(v) => String(v + 1).padStart(2, "0")}
                      />
                      <DurationWheelColumn
                        value={
                          Math.min(dtDay, getDaysInMonth(dtYear, dtMonth)) - 1
                        }
                        max={30}
                        label="Date"
                        onChange={(v) => {
                          const d = v + 1;
                          const c = clampToFuture(
                            dtYear,
                            dtMonth,
                            d,
                            dtHours,
                            dtMinutes,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                        format={(v) => String(v + 1).padStart(2, "0")}
                      />
              </div>
                      </>
                    ) : (
                      <>
                    <div className="duration-wheel duration-wheel--row">
                      <DurationWheelColumn
                        value={dtYear - CURRENT_YEAR}
                        max={20}
                        label="Year"
                        onChange={(v) => {
                          const y = CURRENT_YEAR + v;
                          const c = clampToFuture(
                            y,
                            dtMonth,
                            dtDay,
                            dtHours,
                            dtMinutes,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                        format={(v) => String(CURRENT_YEAR + v)}
                      />
                      <DurationWheelColumn
                        value={dtMonth - 1}
                        max={11}
                        label="Month"
                        onChange={(v) => {
                          const m = v + 1;
                          const c = clampToFuture(
                            dtYear,
                            m,
                            dtDay,
                            dtHours,
                            dtMinutes,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                        format={(v) => String(v + 1).padStart(2, "0")}
                      />
                      <DurationWheelColumn
                        value={
                          Math.min(dtDay, getDaysInMonth(dtYear, dtMonth)) - 1
                        }
                        max={30}
                        label="Date"
                        onChange={(v) => {
                          const d = v + 1;
                          const c = clampToFuture(
                            dtYear,
                            dtMonth,
                            d,
                            dtHours,
                            dtMinutes,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                        format={(v) => String(v + 1).padStart(2, "0")}
                      />
              </div>
                    <div className="duration-wheel">
                      <DurationWheelColumn
                        value={dtHours}
                        max={23}
                        label="Hours"
                        onChange={(v) => {
                          setHasPickedTimeOnce(true);
                          const c = clampToFuture(
                            dtYear,
                            dtMonth,
                            dtDay,
                            v,
                            dtMinutes,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                      />
                      <DurationWheelColumn
                        value={dtMinutes}
                        max={59}
                        label="Minutes"
                        onChange={(v) => {
                          setHasPickedTimeOnce(true);
                          const c = clampToFuture(
                            dtYear,
                            dtMonth,
                            dtDay,
                            dtHours,
                            v,
                            dtSeconds,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                      />
                      <DurationWheelColumn
                        value={dtSeconds}
                        max={59}
                        label="Seconds"
                        onChange={(v) => {
                          setHasPickedTimeOnce(true);
                          const c = clampToFuture(
                            dtYear,
                            dtMonth,
                            dtDay,
                            dtHours,
                            dtMinutes,
                            v,
                          );
                          setDtYear(c.year);
                          setDtMonth(c.month);
                          setDtDay(c.day);
                          setDtHours(c.hours);
                          setDtMinutes(c.minutes);
                          setDtSeconds(c.seconds);
                        }}
                      />
                    </div>
                      </>
                    )}
                  </div>
                </div>
          )}

          <button
                type="button"
            onClick={applyTimer}
                className="timer-picker__submit"
          >
            Set Timer
          </button>
        </div>
      )}
          <button
            type="button"
            onClick={() => !fileAndTimerDisabled && setShowPicker((v) => !v)}
            className={`message-input-ref__attach ${fileAndTimerDisabled ? "message-input-ref__attach--disabled" : ""}`}
            aria-label="Schedule"
            disabled={fileAndTimerDisabled}
            title={fileAndTimerDisabled ? "Available after chat is accepted" : "Schedule"}
          >
            <Clock size={18} />
          </button>
        </div>

        <button
          type="submit"
          className="message-input-ref__send"
          disabled={!text.trim() && !imagePreview}
          aria-label="Send"
        >
          <Send size={20} />
        </button>
      </form>

      {showAcceptReject && (
        <div className="message-input-ref__accept-reject">
          <button
            type="button"
            className="accept"
            onClick={() => acceptChat(selectedChat._id)}
          >
            Accept
          </button>
          <button
            type="button"
            className="reject"
            onClick={() => rejectChat(selectedChat._id)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
