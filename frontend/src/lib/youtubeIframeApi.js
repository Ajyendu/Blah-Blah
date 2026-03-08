let readyPromise = null;

/**
 * Load YouTube IFrame API and return a promise that resolves when YT is ready.
 * Note: Console messages like [YOUTUBEJS][Player], "signature decipher", or
 * ERR_BLOCKED_BY_CLIENT are from browser extensions (e.g. YouTube downloaders,
 * ad blockers), not from this file. To confirm: open the app in an incognito
 * window with extensions disabled—those errors will disappear.
 * The origin param is passed so YouTube's postMessage target matches the page.
 */
export function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (readyPromise) return readyPromise;
  readyPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    const origin = typeof window.location?.origin === "string" ? window.location.origin : "";
    tag.src = origin
      ? `https://www.youtube.com/iframe_api?origin=${encodeURIComponent(origin)}`
      : "https://www.youtube.com/iframe_api";
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(tag, first);
  });
  return readyPromise;
}

export const YT_PLAYING = 1;
export const YT_PAUSED = 2;
export const YT_BUFFERING = 3;
