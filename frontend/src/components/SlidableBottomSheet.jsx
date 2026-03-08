import { useRef, useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import "./SlidableBottomSheet.css";

const PEEK_RATIO = 0.1; // 10% visible when minimized
const EXPANDED_RATIO = 0.85;
const SNAP_THRESHOLD_PX = 48;
const HANDLE_HEIGHT_PX = 48;
const INPUT_BAR_OFFSET_PX = 72;

export default function SlidableBottomSheet({
  children,
  isMinimized,
  onMinimizedChange,
  onClose,
  peekLabel,
}) {
  const sheetRef = useRef(null);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const [dragMaxDown, setDragMaxDown] = useState(0);
  const dragMaxDownRef = useRef(0);
  const dragStartY = useRef(0);
  const dragStartMinimized = useRef(false);
  const didDragRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastDragOffsetRef = useRef(0);
  /* Start from bottom when opening so panel emerges from bottom; reset when minimized */
  const [isEntrance, setIsEntrance] = useState(() => !isMinimized);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMinimized && isEntrance) {
      const id1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (mountedRef.current) setIsEntrance(false);
        });
      });
      return () => cancelAnimationFrame(id1);
    }
    if (isMinimized) setIsEntrance(true);
  }, [isMinimized, isEntrance]);

  const handlePointerDown = useCallback(
    (e) => {
      if (e.button !== 0 && e.type !== "touchstart") return;
      e.preventDefault();
      didDragRef.current = false;
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      dragStartY.current = y;
      dragStartMinimized.current = isMinimized;
      isDraggingRef.current = true;
      if (sheetRef.current) {
        const parent = sheetRef.current.parentElement;
        const containerHeight = parent
          ? parent.getBoundingClientRect().height
          : 400;
        const sheetHeight = sheetRef.current.getBoundingClientRect().height;

        const maxDown = Math.max(0, sheetHeight - INPUT_BAR_OFFSET_PX);
        dragMaxDownRef.current = maxDown;
        setDragMaxDown(maxDown);
      } else {
        dragMaxDownRef.current = 0;
        setDragMaxDown(0);
      }
      if (e.target && typeof e.target.setPointerCapture === "function") {
        e.target.setPointerCapture(e.pointerId);
      }
    },
    [isMinimized]
  );

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const maxDown = dragMaxDownRef.current;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    let delta = y - dragStartY.current;
    if (dragStartMinimized.current) {
      delta = Math.max(-maxDown, Math.min(0, delta));
    } else {
      delta = Math.max(0, Math.min(delta, maxDown));
    }
    lastDragOffsetRef.current = delta;
    setDragOffsetY(delta);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const offset = lastDragOffsetRef.current;
    setDragOffsetY(0);
    if (Math.abs(offset) >= SNAP_THRESHOLD_PX) {
      didDragRef.current = true;
      if (!dragStartMinimized.current && offset > 0) {
        onMinimizedChange(true);
      } else if (dragStartMinimized.current && offset < 0) {
        onMinimizedChange(false);
      }
    }
  }, [onMinimizedChange]);

  useEffect(() => {
    const onMove = (e) => handlePointerMove(e);
    const onUp = () => handlePointerUp();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const handlePeekClick = useCallback(() => {
    if (didDragRef.current) return;
    if (isMinimized) {
      onMinimizedChange(false);
    }
  }, [isMinimized, onMinimizedChange]);

  const handleCloseClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClose?.();
    },
    [onClose]
  );

  /* Drag = change height only: down from 85% to 10%, up from 10% to 85%. One motion, stops at title. */
  const isDraggingDown = !isMinimized && dragOffsetY > 0 && dragMaxDown > 0;
  const isDraggingUp = isMinimized && dragOffsetY < 0 && dragMaxDown > 0;
  const dragHeightRatio = isDraggingDown
    ? EXPANDED_RATIO -
      (dragOffsetY / dragMaxDown) * (EXPANDED_RATIO - PEEK_RATIO)
    : isDraggingUp
    ? PEEK_RATIO + (-dragOffsetY / dragMaxDown) * (EXPANDED_RATIO - PEEK_RATIO)
    : null;

  /* When just opened, start at bottom (0) so panel emerges from bottom; then animate to expanded */
  const effectiveExpandedRatio =
    !isMinimized && isEntrance ? 0 : EXPANDED_RATIO;
  const heightRatio =
    dragHeightRatio != null
      ? dragHeightRatio
      : isMinimized
      ? PEEK_RATIO
      : effectiveExpandedRatio;

  return (
    <div
      ref={sheetRef}
      className={`slidable-bottom-sheet ${
        isMinimized
          ? "slidable-bottom-sheet--minimized"
          : "slidable-bottom-sheet--expanded"
      } ${dragOffsetY !== 0 ? "slidable-bottom-sheet--dragging" : ""}`}
      style={{
        "--peek-ratio": PEEK_RATIO,
        "--expanded-ratio": EXPANDED_RATIO,

        height: `${EXPANDED_RATIO * 100}%`,
        maxHeight: "85vh",

        transform: `translateY(${Math.max(
          0,
          Math.min(dragMaxDown, (isMinimized ? dragMaxDown : 0) + dragOffsetY)
        )}px)`,
      }}
    >
      <div
        className="slidable-bottom-sheet__handle"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handlePeekClick}
        role="button"
        tabIndex={0}
        aria-label={
          isMinimized ? `Expand ${peekLabel}` : "Drag down to minimize"
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePeekClick();
          }
        }}
      >
        <span className="slidable-bottom-sheet__handle-left" aria-hidden />
        <span className="slidable-bottom-sheet__handle-label">{peekLabel}</span>
        {onClose ? (
          <button
            type="button"
            className="slidable-bottom-sheet__close"
            onClick={handleCloseClick}
            aria-label={`Close ${peekLabel}`}
          >
            <X size={20} />
          </button>
        ) : (
          <span className="slidable-bottom-sheet__handle-right" aria-hidden />
        )}
      </div>
      <div className="slidable-bottom-sheet__content">{children}</div>
    </div>
  );
}
