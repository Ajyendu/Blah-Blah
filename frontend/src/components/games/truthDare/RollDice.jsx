import React, { useState, useRef, useEffect } from "react";

const DICE_VALUES = [1, 2, 3, 4, 5, 6];

/* Dice pip positions on a 3x3 grid (1-9). */
const DICE_PIPS = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

function randomFace() {
  return DICE_VALUES[Math.floor(Math.random() * 6)];
}

function DiceFace({ value }) {
  if (value == null) return null;
  const pips = DICE_PIPS[value] ?? [];
  return (
    <div className="td-dice__face" aria-hidden>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pos) => (
        <span
          key={pos}
          className={`td-dice__pip ${pips.includes(pos) ? "td-dice__pip--on" : ""}`}
        />
      ))}
    </div>
  );
}

export default function RollDice({ onGameResult, syncedValue }) {
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState(null);
  const intervalRef = useRef(null);
  const rollSoundRef = useRef(null);

  useEffect(() => {
    rollSoundRef.current = new Audio("/dieroll.mp3");
    rollSoundRef.current.volume = 0.5;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // When other peer rolls: play same value with roll animation
  useEffect(() => {
    if (syncedValue == null || rolling) return;
    const audio = rollSoundRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
    setRolling(true);
    setResult(null);
    setDisplayValue(syncedValue);
    const tickMs = 80;
    const rollDuration = 800;
    intervalRef.current = setInterval(() => {
      setDisplayValue(randomFace());
    }, tickMs);
    const t = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setResult(syncedValue);
      setDisplayValue(syncedValue);
      setRolling(false);
    }, rollDuration);
    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [syncedValue]);

  const roll = () => {
    if (rolling) return;
    const final = randomFace();
    onGameResult?.(final);
    const audio = rollSoundRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
    setRolling(true);
    setResult(null);
    setDisplayValue(randomFace());

    const rollDuration = 800;
    const tickMs = 80;
    intervalRef.current = setInterval(() => {
      setDisplayValue(randomFace());
    }, tickMs);

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setResult(final);
      setDisplayValue(final);
      setRolling(false);
    }, rollDuration);
  };

  const showValue = displayValue ?? result;

  return (
    <div className="td-mini-game">
      <div
        role="button"
        tabIndex={0}
        className={`td-dice ${rolling ? "td-dice--rolling" : ""}`}
        onClick={roll}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); roll(); } }}
        aria-label="Roll die"
        style={{ cursor: rolling ? "default" : "pointer" }}
      >
        {showValue != null && <DiceFace value={showValue} />}
      </div>
    </div>
  );
}
