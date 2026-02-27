import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BottleStage from "./BottleStage";
import PlayerRing from "./PlayerRing";
import CoinFlip from "./CoinFlip";
import RollDice from "./RollDice";
import "./truthDare.css";
import { useEffect } from "react";
import { useChatStore } from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useGameStore } from "../../../store/useGameStore";
import Wheel from "./Wheel";
import Spin from "../../../assets/Spin.mp3";

export default function TruthDareGame() {
  const selectedChat = useChatStore((s) => s.selectedChat);
  const authUser = useAuthStore((s) => s.authUser);
  const socket = useAuthStore((s) => s.socket);
  const audioRef = useRef(null);
  const spinSoundRef = useRef(null);
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

  }, []);

  useEffect(() => {
    audioRef.current = new Audio(Spin);
    audioRef.current.loop = true; // loop while spinning
  }, []);

  const rawParticipants =
    selectedChat?.participants?.filter(Boolean).map((p) => ({
      _id: p._id,
      name: p.fullName,
      avatar: p.profilePic,
    })) || [];

  // Order so current user is at bottom (last index), receiver(s) at top
  const participants =
    rawParticipants.length > 0
      ? [
          ...rawParticipants.filter(
            (p) => String(p._id) !== String(authUser?._id)
          ),
          ...rawParticipants.filter(
            (p) => String(p._id) === String(authUser?._id)
          ),
        ]
      : [];

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
  const [previousWinnerIndex, setPreviousWinnerIndex] = useState(null);
  const [gameIndex, setGameIndex] = useState(0); // 0 = bottle, 1 = coin, 2 = dice
  const setCurrentGameName = useGameStore((s) => s.setCurrentGameName);
  const openToGameIndex = useGameStore((s) => s.openToGameIndex);
  const setOpenToGameIndex = useGameStore((s) => s.setOpenToGameIndex);
  const [syncedCoin, setSyncedCoin] = useState(null);
  const [syncedDice, setSyncedDice] = useState(null);
  const [spinCooldown, setSpinCooldown] = useState(false);
  const [spinning, setSpinning] = useState(false);

  // Stable "my side of the table": same person always sees the same perspective (like sitting opposite each other)
  const otherParticipant = participants.find((p) => String(p._id) !== String(authUser?._id));
  const bottleViewOffset = otherParticipant != null && String(authUser?._id) > String(otherParticipant._id) ? 180 : 0;

  const velocityRef = useRef(0);
  const spinningRef = useRef(false);
  const frameRef = useRef(null);
  const rotationRef = useRef(0);
  const mountedRef = useRef(true);
  const winnerIndexRef = useRef(null);
  const spinBlockedUntilRef = useRef(0);
  const tweenStartTimeRef = useRef(0);
  const tweenStartRotationRef = useRef(0);
  const tweenEndRotationRef = useRef(0);

  const SPIN_DURATION_MS = 2000;

  // Given a winner index, return rotation in [0, 360) that points bottle at that slice center
  const getFinalRotationForWinner = (index) => {
    const s = 360 / participants.length;
    const centerAngle = index * s + s / 2;
    return (centerAngle - 90 + 360) % 360;
  };

  // Which slice the bottle points to for a given rotation (same math as pointer angle)
  const getWinnerIndexFromRotation = (rot) => {
    const total = participants.length;
    if (total === 0) return null;
    const s = 360 / total;
    const normalized = ((rot % 360) + 360) % 360;
    const pointerAngle = (normalized + 90) % 360;
    return Math.floor(pointerAngle / s) % total;
  };

  // Ease-out cubic: fast start, slow end
  const easeOutCubic = (t) => 1 - (1 - t) ** 3;

  const runBottleTween = (finalRotationNorm, durationMs, onComplete) => {
    const startRotation = rotationRef.current;
    const startNorm = ((startRotation % 360) + 360) % 360;
    let delta = (finalRotationNorm - startNorm + 360) % 360;
    if (delta < 1) delta += 360; // avoid 0 so we always spin at least a bit
    const fullSpins = 4;
    const endRotation = startRotation + 360 * fullSpins + delta;

    tweenStartTimeRef.current = performance.now();
    tweenStartRotationRef.current = startRotation;
    tweenEndRotationRef.current = endRotation;

    const tick = () => {
      if (!mountedRef.current) return;
      const elapsed = performance.now() - tweenStartTimeRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      const r =
        tweenStartRotationRef.current +
        (tweenEndRotationRef.current - tweenStartRotationRef.current) * eased;
      rotationRef.current = r;
      setRotation(r);

      if (spinSoundRef.current) {
        spinSoundRef.current.playbackRate = 0.5 + (1 - t) * 0.8;
        spinSoundRef.current.volume = Math.max(0.2, 1 - t);
      }

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        if (spinSoundRef.current) {
          spinSoundRef.current.pause();
          spinSoundRef.current.currentTime = 0;
        }
        rotationRef.current = tweenEndRotationRef.current;
        setRotation(tweenEndRotationRef.current);
        frameRef.current = null;
        onComplete?.();
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    winnerIndexRef.current = winnerIndex;
  }, [winnerIndex]);

  useEffect(() => {
    setCurrentGameName(SYNC_GAME_NAMES[gameIndex]);
  }, [gameIndex, setCurrentGameName]);

  useEffect(() => {
    if (openToGameIndex != null) {
      setGameIndex(openToGameIndex);
      setOpenToGameIndex(null);
    }
  }, [openToGameIndex, setOpenToGameIndex]);

  /* ================= GAME SYNC (receive from other peer) ================= */
  /* Bottle: result is sent before animation; both sides run the same tween so they stay in sync. */
  useEffect(() => {
    if (!socket || !selectedChat?._id) return;
    const handler = ({ gameType, data }) => {
      if (gameType === "bottle" && data) {
        const finalRotation = data.finalRotation != null ? Number(data.finalRotation) : null;
        const duration = data.spinDuration ?? SPIN_DURATION_MS;

        if (finalRotation != null) {
          setSpinning(true);
          runBottleTween(finalRotation, duration, () => {
            if (!mountedRef.current) return;
            setSpinning(false);
            if (data.winnerUserId != null) {
              const raw =
                selectedChat?.participants?.filter(Boolean).map((p) => ({
                  _id: p._id,
                  name: p.fullName,
                  avatar: p.profilePic,
                })) ?? [];
              const ordered =
                raw.length > 0
                  ? [
                      ...raw.filter((p) => String(p._id) !== String(authUser?._id)),
                      ...raw.filter((p) => String(p._id) === String(authUser?._id)),
                    ]
                  : [];
              const idx = ordered.findIndex(
                (p) => String(p._id) === String(data.winnerUserId)
              );
              setWinnerIndex(idx >= 0 ? idx : null);
            } else if (data.winnerIndex != null) {
              setWinnerIndex(data.winnerIndex);
            }
          });
        }
      }
      if (gameType === "coin" && data?.result) {
        setSyncedCoin(data.result);
        setTimeout(() => setSyncedCoin(null), 1200);
      }
      if (gameType === "dice" && data?.value != null) {
        setSyncedDice(data.value);
        setTimeout(() => setSyncedDice(null), 1200);
      }
    };
    socket.off("game_sync");
    socket.on("game_sync", handler);
    return () => socket.off("game_sync");
  }, [socket, selectedChat?._id, selectedChat?.participants, authUser?._id]);

  const GAME_TITLES = ["Rotate the bottle", "Coin flip", "Roll a die"];
  /** Names used in "A is playing ..." notifications */
  const SYNC_GAME_NAMES = ["Spin the bottle", "Flip the coin", "Roll the die"];

  /* ================= CLEANUP ON UNMOUNT ================= */
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      spinSoundRef.current?.pause();
      spinSoundRef.current = null;
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  /* ================= SPIN ================= */
  /* Decide result first (random), send to other user, then both run the same tween so they stay in sync. */

  const spinBottle = () => {
    if (spinning || participants.length === 0) return;
    if (Date.now() < spinBlockedUntilRef.current) return;

    setWinnerIndex(null);
    setSpinning(true);
    spinningRef.current = true;

    const chosenIndex = Math.floor(Math.random() * participants.length);
    const finalRotationNorm = getFinalRotationForWinner(chosenIndex);

    const chatId = selectedChat?._id;
    if (socket && chatId) {
      socket.emit("game_sync", {
        chatId,
        gameType: "bottle",
        data: {
          finalRotation: finalRotationNorm,
          winnerIndex: chosenIndex,
          winnerUserId: participants[chosenIndex]?._id ?? null,
          spinDuration: SPIN_DURATION_MS,
        },
      });
    }

    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play();
    }

    runBottleTween(finalRotationNorm, SPIN_DURATION_MS, () => {
      if (!mountedRef.current) return;
      spinningRef.current = false;
      setSpinning(false);
      setPreviousWinnerIndex(winnerIndexRef.current);
      setWinnerIndex(chosenIndex);

      document.querySelector(".td-stage")?.classList.add("shake");
      setTimeout(() => document.querySelector(".td-stage")?.classList.remove("shake"), 400);

      if (navigator.vibrate) navigator.vibrate([100, 50, 200]);

      spinBlockedUntilRef.current = Date.now() + 1000;
      setSpinCooldown(true);
      setTimeout(() => setSpinCooldown(false), 1000);
    });
  };

  /* ================= UI ================= */

  /* Derive winner from display rotation so it matches where the bottle points on THIS device (fixes opposite view). Show as soon as spin stops, not after cooldown. */
  const displayRotation = rotation + bottleViewOffset;
  const displayWinnerIndex =
    winnerIndex !== null && !spinning
      ? getWinnerIndexFromRotation(displayRotation)
      : null;
  const isMyTurn = displayWinnerIndex !== null && displayWinnerIndex === myIndex;
  const isOthersTurn =
    displayWinnerIndex !== null &&
    displayWinnerIndex !== myIndex &&
    participants[displayWinnerIndex] != null;

  const resetBottleIfActive = () => {
    if (gameIndex !== 0) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    spinningRef.current = false;
    setSpinning(false);
    if (spinSoundRef.current) {
      spinSoundRef.current.pause();
      spinSoundRef.current.currentTime = 0;
    }
    setWinnerIndex(null);
    rotationRef.current = 0;
    setRotation(0);
  };

  const handlePreviousGame = () => {
    resetBottleIfActive();
    setGameIndex((i) => (i - 1 + 3) % 3);
  };
  const handleNextGame = () => {
    resetBottleIfActive();
    setGameIndex((i) => (i + 1) % 3);
  };

  return (
    <div className="td-container">
      <div className="td-rotate-row">
        <button
          type="button"
          className="td-controls__btn td-controls__btn--arrow"
          onClick={handlePreviousGame}
          aria-label="Previous game"
          title="Previous game"
        >
          <ChevronLeft size={16} />
        </button>
        <p className="td-rotate-label">{GAME_TITLES[gameIndex]}</p>
        <button
          type="button"
          className="td-controls__btn td-controls__btn--arrow"
          onClick={handleNextGame}
          aria-label="Next game"
          title="Next game"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="td-game-content">
      {gameIndex === 0 && (
        <>
          <div className="winner-area winner-area--above">
            {isOthersTurn && (
              <div className="winner-box">
                {participants[displayWinnerIndex].name}'s turn!
              </div>
            )}
          </div>
          <div className="td-stage">
            <BottleStage
              rotation={rotation + bottleViewOffset}
              onSpin={spinBottle}
              isSpinning={spinning || spinCooldown}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            />
          </div>
          <div className="winner-area winner-area--below">
            {isMyTurn && <div className="winner-box">Your turn!</div>}
          </div>
        </>
      )}
      {gameIndex === 1 && (
        <CoinFlip
          onGameResult={(result) => {
            if (socket && selectedChat?._id)
              socket.emit("game_sync", {
                chatId: selectedChat._id,
                gameType: "coin",
                data: { result },
              });
          }}
          syncedResult={syncedCoin}
        />
      )}
      {gameIndex === 2 && (
        <RollDice
          onGameResult={(value) => {
            if (socket && selectedChat?._id)
              socket.emit("game_sync", {
                chatId: selectedChat._id,
                gameType: "dice",
                data: { value },
              });
          }}
          syncedValue={syncedDice}
        />
      )}
      </div>
    </div>
  );
}
