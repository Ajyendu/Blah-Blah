import React, { useState, useRef, useEffect } from "react";

const SIDES = ["Heads", "Tails"];

export default function CoinFlip({ onGameResult, syncedResult }) {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const flipSoundRef = useRef(null);

  useEffect(() => {
    flipSoundRef.current = new Audio("/coinflip.mp3");
    flipSoundRef.current.volume = 0.5;
  }, []);

  // When other peer flips: play same result with animation
  useEffect(() => {
    if (!syncedResult || flipping) return;
    const audio = flipSoundRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
    setResult(syncedResult);
    setFlipping(true);
    const t = setTimeout(() => setFlipping(false), 800);
    return () => clearTimeout(t);
  }, [syncedResult]);

  const flip = () => {
    if (flipping) return;
    const outcome = SIDES[Math.floor(Math.random() * 2)];
    onGameResult?.(outcome);
    const audio = flipSoundRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
    setResult(outcome);
    setFlipping(true);
    setTimeout(() => setFlipping(false), 800);
  };

  const flipClass = flipping
    ? result === "Tails"
      ? "td-coin__flip-inner--to-tails"
      : "td-coin__flip-inner--to-heads"
    : result === "Tails"
      ? "td-coin__flip-inner--show-tails"
      : "td-coin__flip-inner--show-heads";

  return (
    <div className="td-mini-game">
      <div
        role="button"
        tabIndex={0}
        className="td-coin"
        onClick={flip}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } }}
        aria-label="Flip coin"
        style={{ cursor: flipping ? "default" : "pointer" }}
      >
        <div className={`td-coin__flip-inner ${flipClass}`}>
          <div className="td-coin__side td-coin__side--head">
            <img src="/head.png" alt="Heads" className="td-coin__face" />
          </div>
          <div className="td-coin__side td-coin__side--tails">
            <img src="/tails.png" alt="Tails" className="td-coin__face" />
          </div>
        </div>
      </div>
      <div className="td-coin__result-wrap">
        {result && !flipping && (
          <p className="td-coin__result" aria-live="polite">
            {result}
          </p>
        )}
      </div>
    </div>
  );
}
