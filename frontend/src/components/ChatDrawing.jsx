import { useRef, useEffect, useState, useCallback } from "react";
import { X, Eraser, Undo2, Redo2, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useNoteStore } from "../store/useNoteStore";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { axiosInstance } from "../lib/axios";
import "./ChatDrawing.css";

const SAVE_DEBOUNCE_MS = 600;

const INITIAL_COLORS = [
  "#1e293b",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
  "#0891b2",
  "#7c3aed",
  "#db2777",
  "#ffffff",
];
const MAX_UNDO = 10;
/** Minimum stroke length (px) to keep; shorter strokes are treated as accidental taps and discarded. */
const MIN_STROKE_LENGTH = 4;
/** Logical coordinate space – same on all devices so strokes align regardless of canvas size. */
const LOGICAL_WIDTH = 1000;
const LOGICAL_HEIGHT = 750;
/** Min stroke length in logical space. */
const MIN_STROKE_LENGTH_LOGICAL = (MIN_STROKE_LENGTH / 400) * LOGICAL_WIDTH;
/** Minimum canvas internal size. */
const MIN_CANVAS_WIDTH = 600;
const MIN_CANVAS_HEIGHT = 450;

/** Pencil: opacity 1, thinner line. Eraser: handled separately in drawStroke. */
const PENCIL_WIDTH_MUL = 0.7;

/** Convert display (CSS) point to logical coords. */
function toLogical(displayX, displayY, rect) {
  if (!rect || !rect.width || !rect.height) return { x: displayX, y: displayY };
  return {
    x: (displayX / rect.width) * LOGICAL_WIDTH,
    y: (displayY / rect.height) * LOGICAL_HEIGHT,
  };
}

/** Convert logical point to display coords for drawing. */
function toDisplayPoint(logicalPoint, rect) {
  if (!rect || !rect.width || !rect.height) return { x: logicalPoint.x, y: logicalPoint.y, size: logicalPoint.size };
  return {
    x: (logicalPoint.x / LOGICAL_WIDTH) * rect.width,
    y: (logicalPoint.y / LOGICAL_HEIGHT) * rect.height,
    size: logicalPoint.size != null ? (logicalPoint.size / LOGICAL_WIDTH) * rect.width : undefined,
  };
}

/** Convert logical brush size to display. */
function toDisplayBrushSize(logicalBrushSize, rect) {
  if (!rect || !rect.width) return logicalBrushSize ?? 6;
  return ((logicalBrushSize ?? 6) / LOGICAL_WIDTH) * rect.width;
}

/** Draw a single stroke on ctx. Points and brushSize in stroke are in logical space; rect is canvas getBoundingClientRect() for conversion. canvasBg used for eraser stroke color. */
function drawStroke(ctx, stroke, rect, canvasBg = "#ffffff") {
  if (!ctx || !Array.isArray(stroke.points) || stroke.points.length < 2) return;
  const pts = stroke.points.map((p) => toDisplayPoint(p, rect));
  const brushSizeDisplay = toDisplayBrushSize(stroke.brushSize, rect);
  const avgSize = pts.reduce((s, p) => s + (p.size ?? brushSizeDisplay ?? 6), 0) / pts.length;
  const { tool } = stroke;
  const lineWidth =
    tool === "eraser"
      ? Math.max(1, avgSize * 1.5)
      : Math.max(1, avgSize * PENCIL_WIDTH_MUL);
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2;
    ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
  }
  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  ctx.quadraticCurveTo(prev.x, prev.y, last.x, last.y);
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (tool === "eraser") {
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = canvasBg;
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.strokeStyle = stroke.color ?? "#1e293b";
  }
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

const ChatDrawing = () => {
  const setIsDrawingOpen = useNoteStore((s) => s.setIsDrawingOpen);
  const selectedChat = useChatStore((s) => s.selectedChat);
  const selectedUser = useChatStore((s) => s.selectedUser);
  const { socket, authUser } = useAuthStore();
  const otherParticipant =
    selectedChat?.participants?.find(
      (p) => String(p._id) !== String(authUser?._id),
    ) ?? selectedUser;
  const chatIdStr = selectedChat?._id != null ? String(selectedChat._id) : null;
  const pendingCanvas = useNoteStore((s) =>
    chatIdStr ? s.pendingDrawingCanvasByChat[chatIdStr] : null,
  );
  const clearPendingDrawingCanvas = useNoteStore((s) => s.clearPendingDrawingCanvas);
  const theme = useThemeStore((s) => s.theme);
  const isDarkCanvas =
    theme?.chatBg === "#0a0a0a" ||
    theme?.pageBg === "#0a0a0a" ||
    theme?.chatBg === "#000000";
  const canvasBg = isDarkCanvas ? (theme?.chatBg ?? "#0a0a0a") : "#ffffff";
  const canvasBgRef = useRef(canvasBg);
  canvasBgRef.current = canvasBg;
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const pointsRef = useRef([]);
  const strokeStartImageRef = useRef(null);
  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);
  const baseImageRef = useRef(null);
  const lastDprRef = useRef(2);
  const [pencilSize, setPencilSize] = useState(6);
  const [eraserSize, setEraserSize] = useState(6);
  const [colorsList, setColorsList] = useState(() => [...INITIAL_COLORS]);
  const [color, setColor] = useState(INITIAL_COLORS[0]);
  const [tool, setTool] = useState("pencil"); // "pencil" | "eraser"
  const pencilSizeRef = useRef(6);
  const eraserSizeRef = useRef(6);
  const toolRef = useRef("pencil");
  const colorRef = useRef(INITIAL_COLORS[0]);
  const loadedForChatIdRef = useRef(null);
  const saveTimerRef = useRef(null);
  const onSaveScheduledRef = useRef(null);
  const saveStateRef = useRef(null);
  const lastCanvasStateFromSocketRef = useRef(0);

  useEffect(() => {
    pencilSizeRef.current = pencilSize;
    eraserSizeRef.current = eraserSize;
    toolRef.current = tool;
    colorRef.current = color;
  }, [pencilSize, eraserSize, tool, color]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [cursorPos, setCursorPos] = useState(null);
  const [pendingApplyTick, setPendingApplyTick] = useState(0);
  const pendingApplyTriesRef = useRef(0);
  const canvasWrapRef = useRef(null);

  const syncUndoRedo = useCallback(() => {
    setCanUndo(undoStackRef.current.length > 0);
    setCanRedo(redoStackRef.current.length > 0);
  }, []);

  const scheduleSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveTimerRef.current = null;
      const chatId = useChatStore.getState().selectedChat?._id;
      const canvas = canvasRef.current;
      if (!chatId || !canvas?.width || !canvas?.height) return;
      try {
        const imageData = canvas.toDataURL("image/png");
        axiosInstance.put(`/drawings/${chatId}`, { imageData }).catch((err) => {
          console.warn("Drawing save failed:", err?.message);
        });
      } catch (_) {}
    }, SAVE_DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    onSaveScheduledRef.current = scheduleSave;
    return () => { onSaveScheduledRef.current = null; };
  }, [scheduleSave]);

  const getPoint = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const pressure = e.pressure != null ? e.pressure : 1;
    const displayX = clientX - rect.left;
    const displayY = clientY - rect.top;
    const { x: logicalX, y: logicalY } = toLogical(displayX, displayY, rect);
    return {
      logicalX,
      logicalY,
      displayX,
      displayY,
      pressure: Math.min(1, Math.max(0, pressure)),
    };
  }, []);

  const pushStrokeToHistory = useCallback((stroke) => {
    undoStackRef.current.push(stroke);
    if (undoStackRef.current.length > MAX_UNDO) undoStackRef.current.shift();
    redoStackRef.current = [];
    setCanUndo(undoStackRef.current.length > 0);
    setCanRedo(false);
  }, []);

  const redrawCanvas = useCallback((onDone) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: false });
    if (!canvas || !ctx) {
      onDone?.();
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const dpr = lastDprRef.current;
    const strokes = undoStackRef.current;
    const base = baseImageRef.current;

    const drawStrokes = () => {
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const bg = canvasBgRef.current;
      for (let i = 0; i < strokes.length; i++) {
        drawStroke(ctx, strokes[i], rect, bg);
      }
      ctx.restore();
      onDone?.();
    };

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = canvasBgRef.current;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (base) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        drawStrokes();
      };
      img.onerror = () => drawStrokes();
      img.src = base;
    } else {
      drawStrokes();
    }
  }, []);

  useEffect(() => {
    saveStateRef.current = pushStrokeToHistory;
    return () => { saveStateRef.current = null; };
  }, [pushStrokeToHistory]);

  const emitCanvasState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas?.width || !canvas?.height) return;
    const s = useAuthStore.getState().socket;
    if (!s?.connected) return;
    const chat = useChatStore.getState().selectedChat;
    if (!chat?._id) return;
    const chatId = String(chat._id);
    try {
      const w = canvas.width;
      const h = canvas.height;
      const maxSide = 800;
      const jpegQuality = 0.92;
      let imageData;
      if (w <= maxSide && h <= maxSide) {
        imageData = canvas.toDataURL("image/jpeg", jpegQuality);
      } else {
        const scale = maxSide / Math.max(w, h);
        const ow = Math.max(1, Math.floor(w * scale));
        const oh = Math.max(1, Math.floor(h * scale));
        const off = document.createElement("canvas");
        off.width = ow;
        off.height = oh;
        const octx = off.getContext("2d", { willReadFrequently: true });
        if (octx) {
          octx.drawImage(canvas, 0, 0, w, h, 0, 0, ow, oh);
          imageData = off.toDataURL("image/jpeg", jpegQuality);
        } else {
          imageData = canvas.toDataURL("image/jpeg", jpegQuality);
        }
      }
      const payload = { chatId, imageData };
      s.emit("drawing_canvas_state", payload);
      setTimeout(() => s.emit("drawing_canvas_state", payload), 150);
    } catch (_) {}
  }, []);

  const getOtherUserId = useCallback(() => {
    const chat = useChatStore.getState().selectedChat;
    const selectedUser = useChatStore.getState().selectedUser;
    const authUser = useAuthStore.getState().authUser;
    const other =
      chat?.participants?.find(
        (p) => String(p._id) !== String(authUser?._id),
      ) ?? selectedUser;
    return chat?._id && other
      ? { chatId: String(chat._id), otherUserId: String(other._id ?? other) }
      : null;
  }, []);

  const undo = useCallback((fromRemote = false) => {
    if (undoStackRef.current.length === 0) return;
    const stroke = undoStackRef.current.pop();
    redoStackRef.current.push(stroke);
    syncUndoRedo();
    redrawCanvas(() => {
      scheduleSave();
      if (!fromRemote) {
        const s = useAuthStore.getState().socket;
        const ids = getOtherUserId();
        if (s?.connected && ids) {
          s.emit("drawing_undo", ids);
          emitCanvasState();
        }
      }
    });
  }, [redrawCanvas, syncUndoRedo, scheduleSave, getOtherUserId, emitCanvasState]);

  const redo = useCallback((fromRemote = false) => {
    if (redoStackRef.current.length === 0) return;
    const stroke = redoStackRef.current.pop();
    undoStackRef.current.push(stroke);
    syncUndoRedo();
    redrawCanvas(() => {
      scheduleSave();
      if (!fromRemote) {
        const s = useAuthStore.getState().socket;
        const ids = getOtherUserId();
        if (s?.connected && ids) {
          s.emit("drawing_redo", ids);
          emitCanvasState();
        }
      }
    });
  }, [redrawCanvas, syncUndoRedo, scheduleSave, getOtherUserId, emitCanvasState]);

  const clearCanvas = useCallback((fromRemote = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    baseImageRef.current = null;
    undoStackRef.current = [];
    redoStackRef.current = [];
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = canvasBgRef.current;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    syncUndoRedo();
    scheduleSave();
    if (!fromRemote) {
      const s = useAuthStore.getState().socket;
      const ids = getOtherUserId();
      if (s?.connected && ids) {
        s.emit("drawing_clear", ids);
        emitCanvasState();
      }
    }
  }, [syncUndoRedo, scheduleSave, getOtherUserId, emitCanvasState]);

  const lastSizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const chatId = selectedChat?._id;
    if (!chatId) return;
    const id = String(chatId);
    const t = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas?.width || !canvas?.height) return;
      if (loadedForChatIdRef.current === id) return;
      const hasPending = useNoteStore.getState().pendingDrawingCanvasByChat[id];
      if (hasPending) return;
      loadedForChatIdRef.current = id;
      axiosInstance
        .get(`/drawings/${chatId}`)
        .then((res) => {
          const imageData = res?.data?.imageData;
          if (!imageData || !canvasRef.current) return;
          if (useNoteStore.getState().pendingDrawingCanvasByChat[id]) return;
          if (Date.now() - lastCanvasStateFromSocketRef.current < 3000) return;
          const ctx = canvasRef.current.getContext("2d", { willReadFrequently: true });
          if (!ctx) return;
          const img = new Image();
          img.onload = () => {
            const c = canvasRef.current;
            if (!c) return;
            if (useNoteStore.getState().pendingDrawingCanvasByChat[id]) return;
            const ctx2 = c.getContext("2d", { willReadFrequently: false });
            ctx2.save();
            ctx2.setTransform(1, 0, 0, 1, 0, 0);
            ctx2.fillStyle = canvasBgRef.current;
            ctx2.fillRect(0, 0, c.width, c.height);
            ctx2.drawImage(img, 0, 0, c.width, c.height);
            ctx2.restore();
            baseImageRef.current = imageData;
            undoStackRef.current = [];
            redoStackRef.current = [];
            syncUndoRedo();
          };
          img.src = imageData;
        })
        .catch(() => {});
    }, 150);
    return () => clearTimeout(t);
  }, [selectedChat?._id, syncUndoRedo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    lastDprRef.current = dpr;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = Math.max(1, parent.clientWidth);
      const h = Math.max(1, parent.clientHeight);

      if (w === lastSizeRef.current.w && h === lastSizeRef.current.h) return;
      lastSizeRef.current = { w, h };

      const cw = Math.max(MIN_CANVAS_WIDTH, Math.floor(w * dpr));
      const ch = Math.max(MIN_CANVAS_HEIGHT, Math.floor(h * dpr));
      const hadContent = canvas.width > 0 && canvas.height > 0;
      const previousImage = hadContent ? canvas.toDataURL("image/png") : null;
      const oldCw = canvas.width;
      const oldCh = canvas.height;

      canvas.width = cw;
      canvas.height = ch;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.flexShrink = "0";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (previousImage && oldCw > 0 && oldCh > 0) {
        const img = new Image();
        img.onload = () => {
          const nw = img.naturalWidth;
          const nh = img.naturalHeight;
          ctx.fillStyle = canvasBgRef.current;
          ctx.fillRect(0, 0, cw, ch);
          if (cw <= nw && ch <= nh) {
            /* Shrinking: crop top-left at 1:1 so drawing doesn’t zoom out */
            ctx.drawImage(img, 0, 0, cw, ch, 0, 0, cw, ch);
          } else {
            /* Growing: draw full image at 1:1, centered (letterbox) */
            const x = Math.floor((cw - nw) / 2);
            const y = Math.floor((ch - nh) / 2);
            ctx.drawImage(img, 0, 0, nw, nh, x, y, nw, nh);
          }
          ctx.scale(dpr, dpr);
        };
        img.src = previousImage;
      } else {
        ctx.fillStyle = canvasBgRef.current;
        ctx.fillRect(0, 0, cw, ch);
        ctx.scale(dpr, dpr);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();
    return () => ro.disconnect();
  }, []);

  const startDraw = useCallback(
    (e) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (canvas && e.target === canvas) canvas.setPointerCapture?.(e.pointerId);
      const point = getPoint(e);
      if (!point) return;
      if (!canvas || !canvas.width || !canvas.height) return;
      const rect = canvas.getBoundingClientRect();
      setCursorPos({ x: point.displayX, y: point.displayY });
      const ctx = canvas.getContext("2d", { willReadFrequently: false });
      const currentTool = toolRef.current;
      const currentBrush = currentTool === "eraser" ? eraserSizeRef.current : pencilSizeRef.current;
      const size = currentTool === "eraser" ? currentBrush * 1.5 : currentBrush;
      const displaySize = size * (0.5 + 0.5 * (point.pressure ?? 1));
      const logicalSize = rect.width ? (displaySize / rect.width) * LOGICAL_WIDTH : displaySize;
      strokeStartImageRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      pointsRef.current = [
        { x: point.logicalX, y: point.logicalY, size: logicalSize },
      ];
      isDrawingRef.current = true;
    },
    [getPoint],
  );

  const moveDraw = useCallback(
    (e) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const point = getPoint(e);
      if (!point) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { willReadFrequently: true });
      if (!ctx || !strokeStartImageRef.current) return;

      const rect = canvas.getBoundingClientRect();
      setCursorPos({ x: point.displayX, y: point.displayY });
      const points = pointsRef.current;
      const currentTool = toolRef.current;
      const currentBrush = currentTool === "eraser" ? eraserSizeRef.current : pencilSizeRef.current;
      const baseSize = currentTool === "eraser" ? currentBrush * 1.5 : currentBrush;
      const displaySize = baseSize * (currentTool === "eraser" ? 1 : 0.5 + 0.5 * (point.pressure ?? 1));
      const logicalSize = rect.width ? (displaySize / rect.width) * LOGICAL_WIDTH : displaySize;
      points.push({ x: point.logicalX, y: point.logicalY, size: logicalSize });

      if (points.length < 2) return;

      ctx.putImageData(strokeStartImageRef.current, 0, 0);

      const pts = points.map((p) => toDisplayPoint(p, rect));
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const midX = (p0.x + p1.x) / 2;
        const midY = (p0.y + p1.y) / 2;
        ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
      }
      const last = pts[pts.length - 1];
      const prev = pts[pts.length - 2];
      ctx.quadraticCurveTo(prev.x, prev.y, last.x, last.y);

      const avgSize = pts.reduce((s, p) => s + (p.size ?? 6), 0) / pts.length;
      const lineWidth =
        currentTool === "eraser"
          ? avgSize
          : Math.max(1, avgSize * PENCIL_WIDTH_MUL);
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (currentTool === "eraser") {
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = canvasBgRef.current;
        ctx.stroke();
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colorRef.current;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    },
    [getPoint],
  );

  const endDraw = useCallback(() => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const points = pointsRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    const startImage = strokeStartImageRef.current;
    strokeStartImageRef.current = null;

    if (points.length > 0) {
      const isShortStroke =
        points.length < 2 ||
        (() => {
          let len = 0;
          for (let i = 1; i < points.length; i++) {
            len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
          }
          return len < MIN_STROKE_LENGTH_LOGICAL;
        })();

      if (isShortStroke && startImage && ctx) {
        ctx.putImageData(startImage, 0, 0);
        pointsRef.current = [];
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const displayBrushSize = toolRef.current === "eraser" ? eraserSizeRef.current : pencilSizeRef.current;
      const logicalBrushSize = rect.width ? (displayBrushSize / rect.width) * LOGICAL_WIDTH : displayBrushSize;

      pushStrokeToHistory({
        points: points.map((p) => ({ x: p.x, y: p.y, size: p.size })),
        color: colorRef.current,
        tool: toolRef.current,
        brushSize: logicalBrushSize,
      });
      if (toolRef.current !== "eraser") {
        const drawnColor = colorRef.current;
        setColorsList((prev) => (prev.includes(drawnColor) ? prev : [...prev, drawnColor]));
      }
      const socket = useAuthStore.getState().socket;
      const selectedChat = useChatStore.getState().selectedChat;
      const selectedUser = useChatStore.getState().selectedUser;
      const authUser = useAuthStore.getState().authUser;
      const other =
        selectedChat?.participants?.find(
          (p) => String(p._id) !== String(authUser?._id),
        ) ?? selectedUser;
      if (socket && selectedChat?._id && other) {
        const payload = {
          chatId: String(selectedChat._id),
          otherUserId: String(other._id ?? other),
          points: points.map((p) => ({ x: p.x, y: p.y, size: p.size })),
          color: colorRef.current,
          brushSize: logicalBrushSize,
          tool: toolRef.current,
        };
        socket.emit("drawing_stroke", payload);
      }
      scheduleSave();
    }
    pointsRef.current = [];
  }, [pushStrokeToHistory, scheduleSave]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!canvas || !wrap) return;
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const onLeave = () => setCursorPos(null);
    canvas.addEventListener("pointerdown", startDraw);
    canvas.addEventListener("pointermove", moveDraw);
    canvas.addEventListener("pointerup", endDraw);
    canvas.addEventListener("pointerleave", endDraw);
    canvas.addEventListener("pointercancel", endDraw);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      canvas.removeEventListener("pointerdown", startDraw);
      canvas.removeEventListener("pointermove", moveDraw);
      canvas.removeEventListener("pointerup", endDraw);
      canvas.removeEventListener("pointerleave", endDraw);
      canvas.removeEventListener("pointercancel", endDraw);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [startDraw, moveDraw, endDraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.touchAction = "none";
    return () => {
      canvas.style.touchAction = "";
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedChat?._id || !otherParticipant || !socket) return;
    const chatId = String(selectedChat._id);
    const otherUserId = String(otherParticipant._id ?? otherParticipant);
    socket.emit("join_chat", { chatId });
    socket.emit("drawing_playing", { chatId, otherUserId });
    return () => {
      socket.emit("drawing_left", { chatId, otherUserId });
    };
  }, [selectedChat?._id, otherParticipant?._id, socket]);

  useEffect(() => {
    const s = socket;
    if (!s) return;
    const handleDrawingStroke = ({ chatId, points, color, brushSize, tool }) => {
      const currentChat = useChatStore.getState().selectedChat;
      const currentChatId = currentChat?._id != null ? String(currentChat._id) : null;
      if (!currentChatId || currentChatId !== chatId) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { willReadFrequently: true });
      if (!canvas || !ctx || !Array.isArray(points) || points.length < 2) return;
      let pathLen = 0;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        pathLen += Math.hypot((b.x ?? 0) - (a.x ?? 0), (b.y ?? 0) - (a.y ?? 0));
      }
      if (pathLen < MIN_STROKE_LENGTH_LOGICAL) return;
      const rect = canvas.getBoundingClientRect();
      const stroke = { points, color, tool, brushSize };
      drawStroke(ctx, stroke, rect, canvasBgRef.current);
      saveStateRef.current?.({ points, color, tool, brushSize });
      onSaveScheduledRef.current?.();
    };
    s.on("drawing_stroke", handleDrawingStroke);
    return () => s.off("drawing_stroke", handleDrawingStroke);
  }, [socket]);

  /* When other device requests our canvas, send it. */
  useEffect(() => {
    const s = socket;
    if (!s || !chatIdStr) return;
    const onRequest = ({ chatId }) => {
      if (String(chatId) !== chatIdStr) return;
      emitCanvasState();
    };
    s.on("drawing_request_canvas_state", onRequest);
    return () => s.off("drawing_request_canvas_state", onRequest);
  }, [socket, chatIdStr, emitCanvasState]);

  /* On remote undo/redo/clear: only show toast. Do NOT replay the action (it can clear the canvas and cause a black screen if stacks differ). Canvas is updated when drawing_canvas_state arrives. */
  useEffect(() => {
    const s = socket;
    if (!s || !chatIdStr) return;
    const onUndo = ({ chatId }) => {
      if (String(chatId) !== chatIdStr) return;
      toast("Other user undid", { icon: "↩️", duration: 2000 });
    };
    const onRedo = ({ chatId }) => {
      if (String(chatId) !== chatIdStr) return;
      toast("Other user redid", { icon: "↪️", duration: 2000 });
    };
    const onClear = ({ chatId }) => {
      if (String(chatId) !== chatIdStr) return;
      toast("Other user cleared the canvas", { icon: "🗑️", duration: 2000 });
    };
    s.on("drawing_undo", onUndo);
    s.on("drawing_redo", onRedo);
    s.on("drawing_clear", onClear);
    return () => {
      s.off("drawing_undo", onUndo);
      s.off("drawing_redo", onRedo);
      s.off("drawing_clear", onClear);
    };
  }, [socket, chatIdStr]);

  const handleCanvasStateRef = useRef(null);
  useEffect(() => {
    handleCanvasStateRef.current = ({ chatId, imageData }) => {
      const currentChatId = useChatStore.getState().selectedChat?._id != null ? String(useChatStore.getState().selectedChat._id) : null;
      if (!currentChatId || String(chatId) !== currentChatId || !imageData) return;
      const canvas = canvasRef.current;
      if (!canvas?.width || !canvas?.height) {
        useNoteStore.getState().setPendingDrawingCanvas(currentChatId, imageData);
        return;
      }
      const img = new Image();
      img.onerror = () => useNoteStore.getState().clearPendingDrawingCanvas(currentChatId);
      img.onload = () => {
        const c = canvasRef.current;
        if (!c) return;
        lastCanvasStateFromSocketRef.current = Date.now();
        const ctx = c.getContext("2d", { willReadFrequently: false });
        if (!ctx) return;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = canvasBgRef.current;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, img.naturalWidth || c.width, img.naturalHeight || c.height, 0, 0, c.width, c.height);
        ctx.restore();
        baseImageRef.current = imageData;
        undoStackRef.current = [];
        redoStackRef.current = [];
        syncUndoRedo();
        onSaveScheduledRef.current?.();
        useNoteStore.getState().clearPendingDrawingCanvas(currentChatId);
      };
      img.src = imageData;
    };
  });

  useEffect(() => {
    if (!socket || !chatIdStr) return;
    const handler = (payload) => handleCanvasStateRef.current?.(payload);
    socket.on("drawing_canvas_state", handler);
    return () => socket.off("drawing_canvas_state", handler);
  }, [socket, chatIdStr]);

  useEffect(() => {
    if (!pendingCanvas || !chatIdStr) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canvas.width || !canvas.height) {
      pendingApplyTriesRef.current += 1;
      if (pendingApplyTriesRef.current > 50) {
        clearPendingDrawingCanvas(chatIdStr);
        pendingApplyTriesRef.current = 0;
        return;
      }
      const t = setTimeout(() => setPendingApplyTick((k) => k + 1), 100);
      return () => clearTimeout(t);
    }
    pendingApplyTriesRef.current = 0;
    const imageData = pendingCanvas;
    const img = new Image();
    img.onerror = () => {
      clearPendingDrawingCanvas(chatIdStr);
    };
    img.onload = () => {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d", { willReadFrequently: false });
      if (!ctx) return;
      lastCanvasStateFromSocketRef.current = Date.now();
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = canvasBgRef.current;
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, img.naturalWidth || c.width, img.naturalHeight || c.height, 0, 0, c.width, c.height);
      ctx.restore();
      baseImageRef.current = imageData;
      undoStackRef.current = [];
      redoStackRef.current = [];
      syncUndoRedo();
      onSaveScheduledRef.current?.();
      clearPendingDrawingCanvas(chatIdStr);
    };
    img.src = imageData;
  }, [pendingCanvas, chatIdStr, pendingApplyTick, syncUndoRedo, clearPendingDrawingCanvas]);

  return (
    <div className="chat-drawing-block">
      <header className="chat-drawing-block__header">
        <h2 className="chat-drawing-block__title">Drawing</h2>
        <div className="chat-drawing-block__header-actions">
          <button
            type="button"
            className="chat-drawing-block__btn"
            onClick={() => setIsDrawingOpen(false)}
            aria-label="Close drawing"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      <div className="chat-drawing-block__toolbar">
        <div className="chat-drawing-block__toolbar-row">
          <div className="chat-drawing-block__tools">
            <button
              type="button"
              className={`chat-drawing-block__tool-btn ${tool === "pencil" ? "chat-drawing-block__tool-btn--active" : ""}`}
              onClick={() => setTool("pencil")}
              title="Pencil"
              aria-pressed={tool === "pencil"}
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              className={`chat-drawing-block__tool-btn ${tool === "eraser" ? "chat-drawing-block__tool-btn--active" : ""}`}
              onClick={() => setTool("eraser")}
              title="Eraser"
              aria-pressed={tool === "eraser"}
            >
              <Eraser size={16} />
            </button>
          </div>

          <div className="chat-drawing-block__size-inline">
            <input
              type="range"
              min={1}
              max={24}
              value={tool === "eraser" ? eraserSize : pencilSize}
              onChange={(e) =>
                tool === "eraser"
                  ? setEraserSize(Number(e.target.value))
                  : setPencilSize(Number(e.target.value))
              }
              className="chat-drawing-block__size-slider"
              title={tool === "eraser" ? "Eraser size" : "Pencil size"}
              aria-label={tool === "eraser" ? "Eraser size" : "Pencil size"}
            />
          </div>

          <div className={`chat-drawing-block__colors-wrap ${tool !== "pencil" ? "chat-drawing-block__colors-wrap--hidden" : ""}`}>
            <div className="chat-drawing-block__colors">
                {colorsList.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`chat-drawing-block__color-btn ${color === c ? "chat-drawing-block__color-btn--active" : ""}`}
                    style={{ background: c }}
                    onClick={() => setColor(c)}
                    title={c}
                    aria-label={`Color ${c}`}
                  >
                    {color === c && c === "#ffffff" ? <span className="chat-drawing-block__color-check" /> : null}
                  </button>
                ))}
                <label className={`chat-drawing-block__color-btn chat-drawing-block__color-btn--custom ${!colorsList.includes(color) ? "chat-drawing-block__color-btn--active" : ""}`} title="Pick any colour">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="chat-drawing-block__color-input"
                    aria-label="Pick custom colour"
                  />
                  <span className="chat-drawing-block__color-custom-icon" aria-hidden>+</span>
                </label>
              </div>
            </div>

          <div className="chat-drawing-block__actions">
            <button
              type="button"
              className="chat-drawing-block__action-btn"
              onClick={() => undo()}
              disabled={!canUndo}
              aria-label="Undo"
              title="Undo"
            >
              <Undo2 size={16} />
            </button>
            <button
              type="button"
              className="chat-drawing-block__action-btn"
              onClick={() => redo()}
              disabled={!canRedo}
              aria-label="Redo"
              title="Redo"
            >
              <Redo2 size={16} />
            </button>
            <button
              type="button"
              className="chat-drawing-block__action-btn"
              onClick={() => clearCanvas()}
              aria-label="Clear all"
              title="Clear all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="chat-drawing-block__body">
        <div ref={canvasWrapRef} className="chat-drawing-block__canvas-wrap">
          <canvas
            ref={canvasRef}
            className="chat-drawing-block__canvas"
            aria-label="Drawing canvas"
            style={{ cursor: "none" }}
          />
          {cursorPos != null && (
            <div
              className={`chat-drawing-block__cursor ${tool === "eraser" ? "chat-drawing-block__cursor--eraser" : ""}`}
              style={{
                left: cursorPos.x,
                top: cursorPos.y,
                width: (tool === "eraser" ? eraserSize * 1.5 : pencilSize) * 2,
                height: (tool === "eraser" ? eraserSize * 1.5 : pencilSize) * 2,
                marginLeft: -(tool === "eraser" ? eraserSize * 1.5 : pencilSize),
                marginTop: -(tool === "eraser" ? eraserSize * 1.5 : pencilSize),
                borderColor: tool === "eraser" ? "#94a3b8" : color,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDrawing;
