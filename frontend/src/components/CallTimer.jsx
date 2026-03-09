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

  let label;
  if (seconds < 60) {
    label = `${secs}s`;
  } else if (seconds < 3600) {
    label = `${mins}m ${secs}s`;
  } else {
    label = `${hours}h ${mins}m ${secs}s`;
  }

  return (
    <span style={{ color: "#fff", fontSize: "14px" }}>
      {label}
    </span>
  );
}

export default CallTimer;
