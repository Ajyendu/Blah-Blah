import { useRef, useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import "./SlidableBottomSheet.css";

const EXPANDED_RATIO = 0.85; // slide stops at 85% of height from top when expanded
const SNAP_THRESHOLD_PX = 48;
const HANDLE_HEIGHT_PX = 100; // when minimized, only this much (handle) visible

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
        const sheetHeight = sheetRef.current.getBoundingClientRect().height;

        const maxDown = Math.max(0, sheetHeight - HANDLE_HEIGHT_PX);
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

  return (
    <div
      ref={sheetRef}
      className={`slidable-bottom-sheet ${
        isMinimized
          ? "slidable-bottom-sheet--minimized"
          : "slidable-bottom-sheet--expanded"
      } ${dragOffsetY !== 0 ? "slidable-bottom-sheet--dragging" : ""}`}
      style={{
        "--expanded-ratio": EXPANDED_RATIO,
        "--handle-height-px": HANDLE_HEIGHT_PX,

        // When minimized, the sheet's bottom is fixed (via CSS) just above the message input,
        // and only the HANDLE_HEIGHT_PX title bar is visible. No vertical movement unless
        // we toggle to expanded.
        height: isMinimized ? `${HANDLE_HEIGHT_PX}px` : "100%",
        maxHeight: isMinimized ? `${HANDLE_HEIGHT_PX}px` : "92vh",
        transform: "translateY(0)",
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
