import { useRef, useState, useCallback, useEffect } from "react";
import { X, Minus, Pencil, StickyNote, MonitorPlay, Gamepad2 } from "lucide-react";
import "./SlidableBottomSheet.css";

export default function SlidableBottomSheet({
  children,
  isMinimized,
  onMinimizedChange,
  onClose,
  peekLabel,
}) {
  const normalizedLabel = String(peekLabel || "").toLowerCase();
  const BubbleIcon =
    normalizedLabel.includes("draw")
      ? Pencil
      : normalizedLabel.includes("note")
      ? StickyNote
      : normalizedLabel.includes("watch")
      ? MonitorPlay
      : normalizedLabel.includes("truth") || normalizedLabel.includes("dare")
      ? Gamepad2
      : Minus;

  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0 });
  const bubbleDragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    moved: false,
  });

  useEffect(() => {
    // Default bubble position near bottom-right, above nav/input area.
    const x = Math.max(12, window.innerWidth - 72);
    const y = Math.max(12, window.innerHeight - 220);
    setBubblePos({ x, y });
  }, []);

  const handleBubblePointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    const y = e.clientY ?? 0;
    const x = e.clientX ?? 0;
    bubbleDragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: x,
      startY: y,
      startLeft: bubblePos.x,
      startTop: bubblePos.y,
      moved: false,
    };
    if (e.currentTarget?.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  }, [bubblePos.x, bubblePos.y]);

  useEffect(() => {
    const onMove = (e) => {
      const drag = bubbleDragRef.current;
      if (!drag.active) return;
      const x = e.clientX ?? 0;
      const y = e.clientY ?? 0;
      const dx = x - drag.startX;
      const dy = y - drag.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        bubbleDragRef.current.moved = true;
      }
      const nextX = Math.max(8, Math.min(window.innerWidth - 56, drag.startLeft + dx));
      const nextY = Math.max(8, Math.min(window.innerHeight - 56, drag.startTop + dy));
      setBubblePos({ x: nextX, y: nextY });
    };
    const onUp = (e) => {
      const drag = bubbleDragRef.current;
      if (!drag.active) return;
      if (drag.pointerId != null && e.pointerId === drag.pointerId) {
        bubbleDragRef.current.active = false;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const handleCloseClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClose?.();
    },
    [onClose]
  );

  const handleMinimizeClick = useCallback((e) => {
    e.stopPropagation();
    onMinimizedChange(true);
  }, [onMinimizedChange]);

  const handleBubbleClick = useCallback(() => {
    if (bubbleDragRef.current.moved) {
      bubbleDragRef.current.moved = false;
      return;
    }
    onMinimizedChange(false);
  }, [onMinimizedChange]);

  if (isMinimized) {
    return (
      <button
        type="button"
        className="slidable-bottom-sheet__bubble"
        style={{ left: `${bubblePos.x}px`, top: `${bubblePos.y}px` }}
        onPointerDown={handleBubblePointerDown}
        onClick={handleBubbleClick}
        aria-label={`Open ${peekLabel}`}
        title={`Open ${peekLabel}`}
      >
        <BubbleIcon size={20} />
      </button>
    );
  }

  return (
    <div
      className="slidable-bottom-sheet slidable-bottom-sheet--expanded"
      style={{
        height: "100%",
        maxHeight: "92vh",
        transform: "translateY(0)",
      }}
    >
      <div
        className="slidable-bottom-sheet__handle"
        role="heading"
        aria-level={2}
      >
        <span className="slidable-bottom-sheet__handle-left" aria-hidden />
        <span className="slidable-bottom-sheet__handle-label">{peekLabel}</span>
        <div className="slidable-bottom-sheet__handle-actions">
          <button
            type="button"
            className="slidable-bottom-sheet__minimize"
            onClick={handleMinimizeClick}
            aria-label={`Minimize ${peekLabel}`}
          >
            <Minus size={18} />
          </button>
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
      </div>
      <div className="slidable-bottom-sheet__content">{children}</div>
    </div>
  );
}
