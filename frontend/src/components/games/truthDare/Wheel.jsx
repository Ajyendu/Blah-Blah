import React from "react";

export default function Wheel({ participants, authUser }) {
  const total = participants.length;
  if (!total) return null;

  const slice = 360 / total;

  const myIndex = participants.findIndex(
    (p) => String(p._id) === String(authUser?._id)
  );

  // Center of that slice
  const mySliceCenter = myIndex * slice + slice / 2;

  // 270deg = bottom
  const baseRotation = 270 - mySliceCenter;

  const gradient = participants
    .map((_, i) => {
      const start = i * slice;
      const end = start + slice;
      return `hsl(${i * 60}, 65%, 60%) ${start}deg ${end}deg`;
    })
    .join(",");

  return (
    <div
      className="wheel"
      style={{
        transform: `rotate(${-angle}deg)`,
      }}
    >
      {/* Wheel Background */}
      <div
        className="wheel-bg"
        style={{
          background: `conic-gradient(${gradient})`,
        }}
      />

      {/* Labels */}
      {participants.map((p, i) => {
        const angle = i * slice + slice / 2;

        return (
          <div
            key={p._id}
            className="wheel-label-wrapper"
            style={{
              transform: `rotate(${angle}deg)`,
            }}
          >
            <div
              className="wheel-label"
              style={{
                transform: `rotate(${-angle}deg)`,
              }}
            >
              {p.name}
            </div>
          </div>
        );
      })}

      {/* Inner Circle */}
      <div className="inner-circle" />
    </div>
  );
}
