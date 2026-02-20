import React from "react";
import bottleImg from "../../../assets/bottle.png";

export default function BottleStage({ rotation, onSpin, isSpinning }) {
  return (
    <div className="bottle-wrapper">
      <img
        src={bottleImg}
        alt="Bottle"
        className="bottle-img"
        style={{
          transform: `
      rotate(${rotation}deg) scale(2)
      rotateX(${Math.sin(rotation * 0.02) * 3}deg)
    `,
          cursor: isSpinning ? "default" : "pointer",
        }}
        onClick={!isSpinning ? onSpin : undefined}
      />
    </div>
  );
}
