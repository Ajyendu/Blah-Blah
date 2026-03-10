import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { X, GripVertical, Link, Upload, Play, Pause, SkipBack, SkipForward, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNoteStore } from "../store/useNoteStore";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useIsMobile } from "../hooks/useMediaQuery";
import { loadYouTubeApi, YT_PLAYING, YT_PAUSED, YT_BUFFERING } from "../lib/youtubeIframeApi";
import "./ChatVideoPanel.css";

const MIN_WIDTH = 240;
const MAX_WIDTH = 600;
/** Max local video size for "Upload" mode (100 MB). Stream mode has no limit. */
const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

/** Sync tuning: local video is streamed from server on the other device, so we send fewer time updates and only correct when drift is large to avoid lag/stutter. */
const TIMEUPDATE_THROTTLE_MS_YOUTUBE = 100;
const TIMEUPDATE_THROTTLE_MS_LOCAL = 280;
/** Only apply incoming timeupdate (seek) when drift exceeds this (seconds). Reduces constant micro-seeks on the receiver. */
const DRIFT_THRESHOLD_YOUTUBE = 1.0;
const DRIFT_THRESHOLD_LOCAL = 2.0;
/** Min ms between applying time correction on receiver (local). Prevents burst of timeupdates from causing stutter. */
const MIN_APPLY_INTERVAL_MS_LOCAL = 600;
/** Never seek backward by less than this (seconds). Small backward seeks cause the "repeat same few ms" stutter. */
const MIN_BACKWARD_SEEK_SEC = 1.2;
/** After applying remote sync, ignore our own player events for this long (ms) to avoid echo/ping-pong. */
const APPLY_GUARD_MS = 80;

/** Format seconds as M:SS or H:MM:SS for display. */
function formatTime(seconds) {
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < 0) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n) => String(n).padStart(2, "0");
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
}

/** Extract YouTube video ID from URL (watch, embed, or youtu.be). */
function getYouTubeId(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const embedMatch = trimmed.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  const shortMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  return null;
}

const ChatVideoPanel = () => {
  const isMobile = useIsMobile();
  const { setIsVideoPanelOpen, pendingYoutubeUrl, setPendingYoutubeUrl, videoPanelWidth, setVideoPanelWidth, watchPartyYoutubeUrlByChat, setWatchPartyYoutubeUrl, watchPartyLocalVideoUrlByChat, setWatchPartyLocalVideoUrl, videoUserIdByChat, watchPartyResumeByChat, setWatchPartyResume, watchPartyClearedByOtherByChat, setWatchPartyClearedByOther } = useNoteStore();
  const selectedChat = useChatStore((s) => s.selectedChat);
  const authUser = useAuthStore((s) => s.authUser);
  const socket = useAuthStore((s) => s.socket);
  const otherParticipant = selectedChat?.participants?.find(
    (p) => String(p._id) !== String(authUser?._id),
  );
  const [source, setSource] = useState("youtube"); // "youtube" | "local"
  const [localPlaybackMode, setLocalPlaybackMode] = useState("stream"); // "stream" | "upload"
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [localFile, setLocalFile] = useState(null);
  const [localObjectUrl, setLocalObjectUrl] = useState("");
  const resizeStartX = useRef(0);
  const resizeStartWidth = useRef(0);

  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    resizeStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    resizeStartWidth.current = videoPanelWidth;
    const onMove = (moveEvent) => {
      const x = moveEvent.clientX ?? moveEvent.touches?.[0]?.clientX ?? resizeStartX.current;
      const delta = resizeStartX.current - x;
      setVideoPanelWidth(resizeStartWidth.current + delta);
    };
    const onEnd = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd);
  }, [videoPanelWidth, setVideoPanelWidth]);

  const youtubeId = useMemo(() => getYouTubeId(youtubeUrl), [youtubeUrl]);

  // When opened with a URL from bookmarklet (or ?youtube=), use it
  useEffect(() => {
    if (pendingYoutubeUrl) {
      setYoutubeUrl(pendingYoutubeUrl);
      setPendingYoutubeUrl(null);
    }
  }, [pendingYoutubeUrl, setPendingYoutubeUrl]);

  // Sync with other user: tell them we have Watch Party open / closed
  useEffect(() => {
    if (!selectedChat?._id || !otherParticipant || !socket) return;
    const chatId = String(selectedChat._id);
    const otherUserId = String(otherParticipant._id ?? otherParticipant);
    socket.emit("join_chat", { chatId });
    socket.emit("watch_party_playing", { chatId, otherUserId });
    return () => {
      socket.emit("watch_party_left", { chatId, otherUserId });
    };
  }, [selectedChat?._id, otherParticipant?._id, socket]);

  const chatIdStr = selectedChat?._id != null ? String(selectedChat._id) : null;
  const syncedYoutubeUrl = chatIdStr ? watchPartyYoutubeUrlByChat?.[chatIdStr] : undefined;
  const otherUserHasJoined =
    chatIdStr &&
    otherParticipant &&
    videoUserIdByChat?.[chatIdStr] &&
    String(videoUserIdByChat[chatIdStr]) === String(otherParticipant._id ?? otherParticipant);
  const prevSyncedUrlRef = useRef(undefined);
  const resumeYoutube = chatIdStr ? watchPartyResumeByChat?.[chatIdStr]?.youtube : undefined;
  const resumeLocal = chatIdStr ? watchPartyResumeByChat?.[chatIdStr]?.local : undefined;

  // Save playback position when leaving this chat or closing the panel
  useEffect(() => {
    const chatId = chatIdStr;
    const src = source;
    return () => {
      if (!chatId) return;
      const v = localVideoRef.current;
      const yt = youtubePlayerRef.current;
      if (src === "local" && v && Number.isFinite(v.currentTime)) {
        setWatchPartyResume(chatId, "local", v.currentTime, v.paused);
      } else if (src === "youtube" && yt?.getCurrentTime) {
        try {
          const t = yt.getCurrentTime();
          const state = yt.getPlayerState?.();
          const isPaused = state !== YT_PLAYING && state !== YT_BUFFERING;
          setWatchPartyResume(chatId, "youtube", t, isPaused);
        } catch (_) {}
      }
    };
  }, [chatIdStr, source, setWatchPartyResume]);

  // When panel opens or chat changes, send current YouTube URL so the other account gets it immediately
  const youtubeUrlRef = useRef(youtubeUrl);
  youtubeUrlRef.current = youtubeUrl;
  useEffect(() => {
    if (source !== "youtube" || !chatIdStr || !otherParticipant || !socket) return;
    const url = (youtubeUrlRef.current || "").trim();
    if (url) {
      socket.emit("watch_party_youtube_url", {
        chatId: chatIdStr,
        otherUserId: String(otherParticipant._id ?? otherParticipant),
        url,
      });
    }
  }, [source, chatIdStr, otherParticipant?._id, socket]);

  // Apply YouTube URL synced from the other user (when they set/paste a URL)
  useEffect(() => {
    if (!chatIdStr || source !== "youtube") return;
    const urlToApply = typeof syncedYoutubeUrl === "string" && syncedYoutubeUrl.trim() !== "" ? syncedYoutubeUrl : null;
    if (urlToApply && prevSyncedUrlRef.current !== urlToApply) {
      prevSyncedUrlRef.current = urlToApply;
      setYoutubeUrl(urlToApply);
    }
    if (!syncedYoutubeUrl) prevSyncedUrlRef.current = undefined;
  }, [chatIdStr, source, syncedYoutubeUrl]);

  // When the other user clicked Clear, clear our local video/URL state so both screens stay in sync
  const clearedByOther = chatIdStr ? watchPartyClearedByOtherByChat?.[chatIdStr] : undefined;
  useEffect(() => {
    if (!chatIdStr || !clearedByOther) return;
    setYoutubeUrl("");
    const urlToRevoke = localObjectUrlRef.current;
    if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
    setLocalFile(null);
    setLocalObjectUrl("");
    setWatchPartyClearedByOther(chatIdStr, null);
  }, [chatIdStr, clearedByOther, setWatchPartyClearedByOther]);

  // When we change YouTube URL, sync to the other user (debounced)
  useEffect(() => {
    if (source !== "youtube" || !chatIdStr || !otherParticipant || !socket) return;
    const t = setTimeout(() => {
      socket.emit("watch_party_youtube_url", {
        chatId: chatIdStr,
        otherUserId: String(otherParticipant._id ?? otherParticipant),
        url: youtubeUrl.trim() || "",
      });
    }, 400);
    return () => clearTimeout(t);
  }, [source, chatIdStr, otherParticipant, socket, youtubeUrl]);

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setYoutubeUrl(text.trim());
    } catch {
      // clipboard not allowed or empty
    }
  };

  const handleLocalFile = (e) => {
    const file = e.target.files?.[0];
    if (localObjectUrl) URL.revokeObjectURL(localObjectUrl);
    if (!file) {
      setLocalFile(null);
      setLocalObjectUrl("");
      return;
    }
    if (localPlaybackMode === "upload" && file.size > MAX_VIDEO_SIZE_BYTES) {
      toast.error(`In Upload mode, keep file under ${MAX_VIDEO_SIZE_MB} MB. Use Stream mode for larger videos.`);
      e.target.value = "";
      return;
    }
    setLocalFile(file);
    setLocalObjectUrl(URL.createObjectURL(file));
  };

  const [ytReady, setYtReady] = useState(false);
  const youtubeContainerRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const youtubeSyncIntervalRef = useRef(null);
  const localObjectUrlRef = useRef("");
  localObjectUrlRef.current = localObjectUrl;
  const syncedLocalVideoUrl = chatIdStr ? watchPartyLocalVideoUrlByChat?.[chatIdStr] : undefined;

  useEffect(() => {
    loadYouTubeApi().then((YT) => {
      if (YT) setYtReady(true);
    });
  }, []);

  const localVideoRef = useRef(null);
  const applyingRemoteSyncRef = useRef(false);
  const timeupdateThrottleRef = useRef(null);
  const controlsInteractionRef = useRef(false);
  const seekBarDraggingRef = useRef(false);
  const lastTimeUpdateApplyRef = useRef(0);

  const [displayTime, setDisplayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const emitSync = useCallback(
    (event, currentTime, isPaused) => {
      if (!chatIdStr || !otherParticipant || !socket) return;
      socket.emit("watch_party_sync", {
        chatId: chatIdStr,
        otherUserId: String(otherParticipant._id ?? otherParticipant),
        event,
        currentTime,
        isPaused,
        ts: Date.now(),
        source,
      });
    },
    [chatIdStr, otherParticipant, socket, source],
  );

  const emitSyncRef = useRef(emitSync);
  emitSyncRef.current = emitSync;

  useEffect(() => {
    if (!socket || !chatIdStr || !otherParticipant) return;
    const otherId = String(otherParticipant._id ?? otherParticipant);
    const handleSync = ({ chatId, userId, event, currentTime, isPaused, ts, source: senderSource }) => {
      if (String(chatId) !== chatIdStr || String(userId) !== otherId) return;
      if (senderSource !== source) return;

      const v = localVideoRef.current;
      const yt = youtubePlayerRef.current;
      let t = typeof currentTime === "number" && !Number.isNaN(currentTime) ? currentTime : undefined;

      if (t !== undefined && typeof ts === "number" && (event === "play" || event === "timeupdate") && !isPaused) {
        const delaySec = (Date.now() - ts) / 1000;
        t = Math.max(0, t + delaySec);
        if (delaySec > 2) t = currentTime;
      }

      const isTimeUpdate = event === "timeupdate";
      const driftThreshold = source === "local" ? DRIFT_THRESHOLD_LOCAL : DRIFT_THRESHOLD_YOUTUBE;

      let localTime = 0;
      if (source === "local" && v) localTime = v.currentTime ?? 0;
      else if (source === "youtube" && yt?.getCurrentTime) {
        try {
          localTime = yt.getCurrentTime() ?? 0;
        } catch (_) {}
      }

      if (isTimeUpdate && t !== undefined) {
        if (source === "local" && v) {
          const now = Date.now();
          if (now - lastTimeUpdateApplyRef.current < MIN_APPLY_INTERVAL_MS_LOCAL) return;
          const drift = t - localTime;
          if (Math.abs(drift) <= driftThreshold) return;
          if (drift < 0 && -drift < MIN_BACKWARD_SEEK_SEC) return;
          lastTimeUpdateApplyRef.current = now;
        } else if (source === "youtube" && yt?.getCurrentTime) {
          const drift = t - localTime;
          if (Math.abs(drift) <= driftThreshold) return;
          if (drift < 0 && -drift < MIN_BACKWARD_SEEK_SEC) return;
        }
      }

      if (t !== undefined && t < localTime && (localTime - t) < MIN_BACKWARD_SEEK_SEC) {
        t = undefined;
      }

      applyingRemoteSyncRef.current = true;
      if (source === "local" && v) {
        if (t !== undefined) v.currentTime = t;
        if (event === "play" || (event === "timeupdate" && !isPaused)) v.play().catch(() => {});
        else if (event === "pause" || (event === "timeupdate" && isPaused)) v.pause();
      } else if (source === "youtube" && yt?.seekTo) {
        if (t !== undefined) yt.seekTo(t, true);
        if (event === "play" || (event === "timeupdate" && !isPaused)) yt.playVideo?.();
        else if (event === "pause" || (event === "timeupdate" && isPaused)) yt.pauseVideo?.();
      }
      setTimeout(() => {
        applyingRemoteSyncRef.current = false;
      }, APPLY_GUARD_MS);
    };
    socket.on("watch_party_sync", handleSync);
    return () => socket.off("watch_party_sync", handleSync);
  }, [socket, chatIdStr, otherParticipant, source]);

  useEffect(() => {
    lastTimeUpdateApplyRef.current = 0;
  }, [source, chatIdStr]);

  const onLocalVideoPlay = useCallback(() => {
    if (applyingRemoteSyncRef.current || controlsInteractionRef.current) return;
    emitSync("play", localVideoRef.current?.currentTime, false);
  }, [emitSync]);

  const onLocalVideoPause = useCallback(() => {
    if (applyingRemoteSyncRef.current || controlsInteractionRef.current) return;
    const t = localVideoRef.current?.currentTime;
    emitSync("pause", typeof t === "number" ? t : undefined, true);
  }, [emitSync]);

  const onLocalVideoTimeUpdate = useCallback(() => {
    if (applyingRemoteSyncRef.current || controlsInteractionRef.current) return;
    if (timeupdateThrottleRef.current) return;
    timeupdateThrottleRef.current = setTimeout(() => {
      timeupdateThrottleRef.current = null;
      const v = localVideoRef.current;
      if (v) emitSync("timeupdate", v.currentTime, v.paused);
    }, TIMEUPDATE_THROTTLE_MS_LOCAL);
  }, [emitSync]);

  const onLocalVideoSeeking = useCallback(() => {
    if (applyingRemoteSyncRef.current || controlsInteractionRef.current) return;
    const t = localVideoRef.current?.currentTime;
    emitSync("seek", typeof t === "number" ? t : undefined, localVideoRef.current?.paused ?? true);
  }, [emitSync]);

  const onLocalVideoSeeked = useCallback(() => {
    if (applyingRemoteSyncRef.current || controlsInteractionRef.current) return;
    const t = localVideoRef.current?.currentTime;
    emitSync("timeupdate", typeof t === "number" ? t : undefined, localVideoRef.current?.paused ?? true);
  }, [emitSync]);

  useEffect(() => {
    if (source !== "youtube" || !ytReady || !youtubeId || !youtubeContainerRef.current || typeof window.YT === "undefined") return;
    const YT = window.YT;
    const container = youtubeContainerRef.current;
    const inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.height = "100%";
    container.appendChild(inner);
    const resume = resumeYoutube;
    const player = new YT.Player(inner, {
      videoId: youtubeId,
      width: "100%",
      height: "100%",
      playerVars: { autoplay: syncedYoutubeUrl && youtubeUrl.trim() === (syncedYoutubeUrl || "").trim() ? 1 : 0 },
      events: {
        onReady: (e) => {
          if (resume && typeof resume.currentTime === "number" && resume.currentTime > 0) {
            try {
              e.target.seekTo(resume.currentTime, true);
              if (resume.isPaused) e.target.pauseVideo?.();
              else e.target.playVideo?.();
            } catch (_) {}
          }
        },
        onStateChange: (e) => {
          if (applyingRemoteSyncRef.current || controlsInteractionRef.current) return;
          const emit = emitSyncRef.current;
          if (!emit) return;
          const t = e.target.getCurrentTime?.();
          if (e.data === YT_PLAYING) emit("play", t, false);
          else if (e.data === YT_PAUSED) emit("pause", t, true);
          else if (e.data === YT_BUFFERING) emit("seek", t, false);
        },
      },
    });
    youtubePlayerRef.current = player;
    const interval = setInterval(() => {
      if (applyingRemoteSyncRef.current) return;
      try {
        const state = player.getPlayerState?.();
        if (state === YT_PLAYING) {
          const t = player.getCurrentTime?.();
          if (typeof t === "number") emitSyncRef.current("timeupdate", t, false);
        } else if (state === YT_PAUSED) {
          const t = player.getCurrentTime?.();
          if (typeof t === "number") emitSyncRef.current("timeupdate", t, true);
        }
      } catch (_) {}
    }, TIMEUPDATE_THROTTLE_MS_YOUTUBE);
    youtubeSyncIntervalRef.current = interval;
    return () => {
      if (youtubeSyncIntervalRef.current) clearInterval(youtubeSyncIntervalRef.current);
      youtubeSyncIntervalRef.current = null;
      youtubePlayerRef.current = null;
      try {
        if (player.destroy) player.destroy();
      } catch (_) {}
      if (inner.parentNode) inner.parentNode.removeChild(inner);
    };
  }, [source, ytReady, youtubeId]);

  const hasActiveVideo = (source === "youtube" && youtubeId) || (source === "local" && (syncedLocalVideoUrl || localObjectUrl));

  useEffect(() => {
    if (!hasActiveVideo || seekBarDraggingRef.current) return;
    const tick = () => {
      if (seekBarDraggingRef.current) return;
      if (source === "local") {
        const v = localVideoRef.current;
        if (v) {
          setDisplayTime(v.currentTime);
          setIsPaused(v.paused);
          if (Number.isFinite(v.duration) && v.duration > 0) setDuration(v.duration);
        }
      } else if (source === "youtube") {
        const yt = youtubePlayerRef.current;
        if (yt?.getCurrentTime != null) {
          try {
            const t = yt.getCurrentTime?.();
            const d = yt.getDuration?.();
            const state = yt.getPlayerState?.();
            if (typeof t === "number") setDisplayTime(t);
            if (typeof d === "number" && d > 0) setDuration(d);
            setIsPaused(state !== YT_PLAYING && state !== YT_BUFFERING);
          } catch (_) {}
        }
      }
    };
    tick();
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, [source, hasActiveVideo, youtubeId, syncedLocalVideoUrl, localObjectUrl]);

  const SKIP_SEC = 10;

  const handlePlayPause = useCallback(() => {
    if (!hasActiveVideo) return;
    controlsInteractionRef.current = true;
    setTimeout(() => { controlsInteractionRef.current = false; }, 150);
    if (source === "local") {
      const v = localVideoRef.current;
      if (!v) return;
      if (v.paused) {
        v.play().catch(() => {});
        emitSync("play", v.currentTime, false);
      } else {
        v.pause();
        emitSync("pause", v.currentTime, true);
      }
    } else {
      const yt = youtubePlayerRef.current;
      if (!yt) return;
      try {
        const state = yt.getPlayerState?.();
        if (state === YT_PLAYING) {
          yt.pauseVideo?.();
          emitSync("pause", yt.getCurrentTime?.(), true);
        } else {
          yt.playVideo?.();
          emitSync("play", yt.getCurrentTime?.(), false);
        }
      } catch (_) {}
    }
  }, [source, hasActiveVideo, emitSync]);

  const handleSeek = useCallback(
    (newTime) => {
      if (!hasActiveVideo || typeof newTime !== "number" || Number.isNaN(newTime)) return;
      const t = Math.max(0, Math.min(newTime, duration || newTime));
      controlsInteractionRef.current = true;
      setTimeout(() => { controlsInteractionRef.current = false; }, 150);
      if (source === "local") {
        const v = localVideoRef.current;
        if (v) {
          v.currentTime = t;
          emitSync("seek", t, v.paused);
        }
      } else {
        const yt = youtubePlayerRef.current;
        if (yt?.seekTo) {
          yt.seekTo(t, true);
          emitSync("seek", t, false);
        }
      }
      setDisplayTime(t);
    },
    [source, hasActiveVideo, duration, emitSync],
  );

  const handleSkipBack = useCallback(() => {
    handleSeek(displayTime - SKIP_SEC);
  }, [displayTime, handleSeek]);

  const handleSkipForward = useCallback(() => {
    handleSeek(displayTime + SKIP_SEC);
  }, [displayTime, handleSeek]);

  const handleClearVideo = useCallback(() => {
    if (source === "youtube") {
      setYoutubeUrl("");
      if (chatIdStr && otherParticipant && socket) {
        socket.emit("watch_party_clear", {
          chatId: chatIdStr,
          otherUserId: String(otherParticipant._id ?? otherParticipant),
        });
        setWatchPartyYoutubeUrl(chatIdStr, null);
      }
    } else {
      if (localObjectUrl) URL.revokeObjectURL(localObjectUrl);
      setLocalFile(null);
      setLocalObjectUrl("");
      if (chatIdStr) {
        setWatchPartyLocalVideoUrl(chatIdStr, null);
        if (otherParticipant && socket) {
          socket.emit("watch_party_clear", {
            chatId: chatIdStr,
            otherUserId: String(otherParticipant._id ?? otherParticipant),
          });
        }
      }
    }
  }, [source, localObjectUrl, chatIdStr, otherParticipant, socket, setWatchPartyLocalVideoUrl, setWatchPartyYoutubeUrl]);

  return (
    <div
      className={`chat-video-panel ${isMobile ? "chat-video-panel--mobile" : ""}`}
      style={!isMobile ? { width: videoPanelWidth, minWidth: videoPanelWidth } : undefined}
    >
      <button
        type="button"
        className="chat-video-panel__resize"
        onMouseDown={handleResizeStart}
        onTouchStart={handleResizeStart}
        aria-label="Resize panel"
      >
        <GripVertical size={16} />
      </button>
      <header className="chat-video-panel__header">
        <h2 className="chat-video-panel__title">Watch Party</h2>
        <button
          type="button"
          className="chat-video-panel__close"
          onClick={() => setIsVideoPanelOpen(false)}
          aria-label="Close video"
        >
          <X size={20} />
        </button>
      </header>

      {otherParticipant && (
        <p className={`chat-video-panel__joined ${otherUserHasJoined ? "chat-video-panel__joined--active" : ""}`} role="status">
          {otherUserHasJoined
            ? `${otherParticipant.fullName || "Friend"} is watching with you`
            : `Waiting for ${otherParticipant.fullName || "friend"} to join…`}
        </p>
      )}

      <div className={`chat-video-panel__body ${source === "local" ? "chat-video-panel__body--local" : ""}`}>
        <div className="chat-video-panel__tabs">
          <div
            className="chat-video-panel__tabs-slider"
            aria-hidden
            style={{ transform: source === "youtube" ? "translateX(0)" : "translateX(100%)" }}
          />
          <button
            type="button"
            className={`chat-video-panel__tab ${source === "youtube" ? "chat-video-panel__tab--active" : ""}`}
            onClick={() => setSource("youtube")}
          >
            YouTube
          </button>
          <button
            type="button"
            className={`chat-video-panel__tab ${source === "local" ? "chat-video-panel__tab--active" : ""}`}
            onClick={() => setSource("local")}
          >
            Local
          </button>
        </div>

        {source === "youtube" && (
          <div className="chat-video-panel__youtube-controls">
            <div className="chat-video-panel__controls">
              <div className="chat-video-panel__url-row">
                <button
                  type="button"
                  className="chat-video-panel__url-icon-wrap"
                  onClick={handlePasteFromClipboard}
                  title="Paste from clipboard"
                  aria-label="Paste URL"
                >
                  <Link size={20} strokeWidth={2.5} />
                </button>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="chat-video-panel__input chat-video-panel__url-input"
                />
              </div>
            </div>
          </div>
        )}

        {source === "local" && (
          <div className="chat-video-panel__local-controls">
            <div className="chat-video-panel__local-mode">
              <div className="chat-video-panel__local-mode-tabs">
                <div
                  className="chat-video-panel__local-mode-slider"
                  aria-hidden
                  style={{ transform: localPlaybackMode === "stream" ? "translateX(0)" : "translateX(100%)" }}
                />
                <button
                  type="button"
                  className={`chat-video-panel__local-mode-tab ${localPlaybackMode === "stream" ? "chat-video-panel__local-mode-tab--active" : ""}`}
                  onClick={() => setLocalPlaybackMode("stream")}
                >
                  Stream
                </button>
                <button
                  type="button"
                  className={`chat-video-panel__local-mode-tab ${localPlaybackMode === "upload" ? "chat-video-panel__local-mode-tab--active" : ""}`}
                  onClick={() => setLocalPlaybackMode("upload")}
                >
                  Upload
                </button>
              </div>
            </div>
            <label className="chat-video-panel__file-row">
              <span className="chat-video-panel__file-icon-wrap" aria-hidden>
                <Upload size={20} strokeWidth={2.5} />
              </span>
              <span className="chat-video-panel__file-btn">Choose video file</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleLocalFile}
                className="chat-video-panel__file-input"
              />
            </label>
            <p className={`chat-video-panel__file-name ${!localFile && !syncedLocalVideoUrl ? "chat-video-panel__file-name--spacer" : ""}`} aria-hidden={!localFile && !syncedLocalVideoUrl}>
              {localFile ? localFile.name : syncedLocalVideoUrl ? "Video shared with you" : "\u00A0"}
            </p>
          </div>
        )}

        {/* Single player slot: same position in both YouTube and Local */}
        <div className={`chat-video-panel__player-zone ${source === "local" ? "chat-video-panel__player-zone--local" : ""}`}>
          {source === "youtube" && (
            youtubeId ? (
              <div className="chat-video-panel__player-wrap chat-video-panel__player-wrap--youtube">
                <div ref={youtubeContainerRef} className="chat-video-panel__youtube-container" />
              </div>
            ) : (
              <div className="chat-video-panel__player-placeholder" />
            )
          )}
          {source === "local" && (
            (syncedLocalVideoUrl || localObjectUrl) ? (
              <div className="chat-video-panel__player-wrap">
                <video
                  ref={localVideoRef}
                  src={syncedLocalVideoUrl || localObjectUrl}
                  className="chat-video-panel__video"
                  playsInline
                  preload={localPlaybackMode === "stream" && !syncedLocalVideoUrl ? "metadata" : "auto"}
                  onLoadedMetadata={(e) => {
                    const v = e.target;
                    if (resumeLocal && typeof resumeLocal.currentTime === "number" && resumeLocal.currentTime > 0) {
                      v.currentTime = resumeLocal.currentTime;
                      if (resumeLocal.isPaused) v.pause();
                      else v.play().catch(() => {});
                    }
                  }}
                  onPlay={onLocalVideoPlay}
                  onPause={onLocalVideoPause}
                  onTimeUpdate={onLocalVideoTimeUpdate}
                  onSeeking={onLocalVideoSeeking}
                  onSeeked={onLocalVideoSeeked}
                />
              </div>
            ) : (
              <div className="chat-video-panel__player-placeholder" />
            )
          )}
        </div>

        {hasActiveVideo && (() => {
          const seekMax = Math.max(1, duration || 0);
          return (
          <div className="chat-video-panel__playback-bar">
            <div className="chat-video-panel__seek-row">
              <span className="chat-video-panel__time-label" aria-hidden>
                {formatTime(displayTime)} / {formatTime(duration)}
              </span>
              <div
                className="chat-video-panel__seek-track"
                style={{ "--seek-fill": `${seekMax > 0 ? (displayTime / seekMax) * 100 : 0}%` }}
              >
                <input
                  type="range"
                  className="chat-video-panel__seek-input"
                  min={0}
                  max={seekMax}
                  step={0.1}
                  value={Math.min(displayTime, seekMax)}
                  onMouseDown={() => { seekBarDraggingRef.current = true; }}
                  onTouchStart={() => { seekBarDraggingRef.current = true; }}
                  onMouseUp={() => { seekBarDraggingRef.current = false; }}
                  onTouchEnd={() => { seekBarDraggingRef.current = false; }}
                  onChange={(e) => handleSeek(parseFloat(e.target.value, 10))}
                  aria-label="Seek"
                />
              </div>
            </div>
            <div className="chat-video-panel__playback-buttons">
              <button
                type="button"
                className="chat-video-panel__playback-btn"
                onClick={handleSkipBack}
                aria-label="Skip back 10 seconds"
              >
                <SkipBack size={20} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="chat-video-panel__playback-btn chat-video-panel__playback-btn--primary"
                onClick={handlePlayPause}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play size={24} strokeWidth={2} /> : <Pause size={24} strokeWidth={2} />}
              </button>
              <button
                type="button"
                className="chat-video-panel__playback-btn"
                onClick={handleSkipForward}
                aria-label="Skip forward 10 seconds"
              >
                <SkipForward size={20} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="chat-video-panel__clear-btn"
                onClick={handleClearVideo}
                aria-label="Clear video"
              >
                <Trash2 size={16} />
                Clear
              </button>
            </div>
          </div>
          );
        })()}
      </div>
    </div>
  );
};

export default ChatVideoPanel;
