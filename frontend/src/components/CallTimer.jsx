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

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <span style={{ color: "#fff", fontSize: "14px", minWidth: "45px" }}>
      {mins}:{secs.toString().padStart(2, "0")}
    </span>
  );
}

export default CallTimer;
