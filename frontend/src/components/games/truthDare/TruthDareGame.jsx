import React, { useState, useRef } from "react";
import BottleStage from "./BottleStage";
import PlayerRing from "./PlayerRing";
import "./truthDare.css";
import { useEffect } from "react";
import { useChatStore } from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";
import Wheel from "./Wheel";
import Spin from "../../../assets/Spin.mp3";
import Whoosh from "../../../assets/Whoosh.mp3";
import tick from "../../../assets/tick.mp3";

export default function TruthDareGame() {
  const selectedChat = useChatStore((s) => s.selectedChat);
  const authUser = useAuthStore((s) => s.authUser);
  const audioRef = useRef(null);
  const spinSoundRef = useRef(null);
  const whooshRef = useRef(null);
  const tickRef = useRef(null);
  const startYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
  };

  const handleMouseUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const dragDistance = Math.abs(e.clientY - startYRef.current);

    const strength = Math.min(80, dragDistance);
    velocityRef.current = 20 + strength;

    spinBottle();
  };

  /* ================= BUILD PARTICIPANTS ================= */
  useEffect(() => {
    spinSoundRef.current = new Audio(Spin);
    spinSoundRef.current.loop = true;

    whooshRef.current = new Audio(Whoosh);
    tickRef.current = new Audio(tick);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(Spin);
    audioRef.current.loop = true; // loop while spinning
  }, []);

  const participants =
    selectedChat?.participants?.filter(Boolean).map((p) => ({
      _id: p._id,
      name: p.fullName,
      avatar: p.profilePic,
    })) || [];

  if (!participants.length) {
    return <div className="td-container">No participants</div>;
  }

  /* ================= KEEP USER AT BOTTOM ================= */

  const myIndex = participants.findIndex(
    (p) => String(p._id) === String(authUser?._id)
  );

  const slice = 360 / participants.length;

  // rotate ring so current user always appears bottom
  const baseRotation = myIndex >= 0 ? 180 - myIndex * slice : 0;

  /* ================= STATE ================= */

  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(null);

  const velocityRef = useRef(0);
  const spinningRef = useRef(false);
  const frameRef = useRef(null);
  const rotationRef = useRef(0);

  /* ================= SPIN ================= */

  const spinBottle = () => {
    if (spinningRef.current || participants.length === 0) return;

    setWinnerIndex(null);

    spinningRef.current = true;

    velocityRef.current = 55 + Math.random() * 20;
    whooshRef.current?.play();

    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play();
    }

    requestAnimationFrame(animate);
  };

  const animate = () => {
    velocityRef.current *= 0.985;

    rotationRef.current += velocityRef.current;

    setRotation(rotationRef.current);
    const speed = velocityRef.current;

    // 🔊 Dynamic sound
    if (spinSoundRef.current) {
      spinSoundRef.current.playbackRate = 0.5 + speed / 40;
      spinSoundRef.current.volume = Math.min(1, speed / 40);
    }
    if (speed > 25) {
      document.body.style.filter = "brightness(1.1)";
    } else {
      document.body.style.filter = "brightness(1)";
    }

    if (speed > 0.2) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      finishSpin();
    }
  };

  const finishSpin = () => {
    cancelAnimationFrame(frameRef.current);

    // stop sound
    if (spinSoundRef.current) {
      spinSoundRef.current.pause();
      spinSoundRef.current.currentTime = 0;
    }

    document.querySelector(".td-stage")?.classList.add("shake");

    setTimeout(() => {
      document.querySelector(".td-stage")?.classList.remove("shake");
    }, 400);

    document.body.style.filter = "brightness(0.8)"; // dim

    const total = participants.length;
    const slice = 360 / total;

    const normalized = ((rotationRef.current % 360) + 360) % 360;
    const pointerAngle = (normalized + 90) % 360;

    const index = Math.floor(pointerAngle / slice);

    const centerAngle = index * slice + slice / 2;
    const correction = centerAngle - pointerAngle;
    setWinnerIndex(index);

    rotationRef.current += correction;

    setRotation(rotationRef.current);
    setWinnerIndex(index);

    // 🔔 Tick sound
    tickRef.current?.play();

    // 📳 Mobile vibration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 200]);
    }

    spinningRef.current = false;

    // restore brightness after short delay
    setTimeout(() => {
      document.body.style.filter = "brightness(1)";
    }, 1500);
  };

  /* ================= UI ================= */

  return (
    <div
      className={`td-container ${winnerIndex !== null ? "winner-mode" : ""}`}
    >
      <h2>🍾 Truth & Dare</h2>
      {winnerIndex !== null && <div className="spotlight-overlay" />}

      <div className="td-stage">
        <BottleStage
          rotation={rotation}
          onSpin={spinBottle}
          isSpinning={spinningRef.current}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </div>

      <div className="winner-area">
        {winnerIndex !== null && participants[winnerIndex] && (
          <div className="winner-box">
            {participants[winnerIndex].name}'s turn!
          </div>
        )}
      </div>
    </div>
  );
}
