import { useEffect, useState } from "react";

function CallTimer({ active }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) {
      setSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const h = String(hours).padStart(2, "0");
  const m = String(mins).padStart(2, "0");
  const s = String(secs).padStart(2, "0");

  return (
    <span style={{ color: "#fff", fontSize: "14px", minWidth: "100px" }}>
      {h}h {m}m {s}s
    </span>
  );
}

export default CallTimer;
