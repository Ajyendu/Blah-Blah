import React from "react";

export default function PlayerRing({
  participants,
  winnerIndex,
  baseRotation,
}) {
  const total = participants.length;
  const slice = 360 / total;

  return (
    <div
      className="player-ring"
      style={{
        transform: `rotate(${baseRotation}deg)`,
      }}
    >
      {participants.map((p, i) => {
        const angle = i * slice;

        return (
          <div
            key={p._id}
            className={`player ${winnerIndex === i ? "winner" : ""}`}
            style={{
              transform: `
                rotate(${angle}deg)
                translate(0, -200px)
                rotate(-${angle}deg)
              `,
            }}
          >
            {p.name}
          </div>
        );
      })}
    </div>
  );
}
