import { useState, useEffect } from "react";

/**
 * @param {string} query - CSS media query (e.g. "(max-width: 768px)")
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export const MOBILE_BREAKPOINT = 768;

/** true when viewport width <= 768px */
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
}
