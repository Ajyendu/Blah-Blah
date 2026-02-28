import { useEffect, useRef } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

/* ================= EMOTION CONFIG ================= */
const EMOTIONS = {
  /* ❤️ LOVE / AFFECTION */
  love: [
    // English
    "love",
    "luv",
    "loved",
    "loving",
    "miss you",
    "missing you",
    "need you",
    "forever",
    "mine",
    "my person",

    // Hinglish / Indian
    "jaan",
    "jaanu",
    "baby",
    "babe",
    "shona",
    "sona",
    "cutie",
    "meri",
    "mera",
    "dil",
    "dil se",
    "pyaar",
    "pyar",
    "ishq",

    // Emojis
    "❤️",
    "💕",
    "💖",
    "💗",
    "💞",
    "💘",
    "😍",
    "🥰",
    "😘",
    "🤍",
  ],

  /* 😄 HAPPY / EXCITED / FUN */
  happy: [
    // English
    "happy",
    "happiness",
    "joy",
    "joyful",
    "awesome",
    "amazing",
    "great",
    "nice",
    "cool",
    "fantastic",
    "perfect",

    // Slang
    "yay",
    "yayy",
    "yayyy",
    "yess",
    "yesss",
    "hehe",
    "haha",
    "lol",
    "lmao",
    "rofl",

    // Hinglish
    "mast",
    "badiya",
    "sahi",
    "ekdum sahi",
    "full on",
    "mazza",
    "mazaa",
    "majaa",
    "jhakaas",
    "killer",

    // Emojis
    "😂",
    "🤣",
    "😄",
    "😁",
    "😆",
    "😊",
    "😎",
  ],

  /* 😡 ANGER / FRUSTRATION */
  angry: [
    // English
    "angry",
    "anger",
    "mad",
    "furious",
    "irritated",
    "annoyed",
    "annoying",
    "hate",
    "hated",
    "hating",

    // Slang
    "wtf",
    "omfg",
    "ffs",
    "shit",
    "bullshit",
    "damn",
    "bloody",

    // Hinglish
    "gussa",
    "bahut gussa",
    "pagal",
    "dimag kharab",
    "irritate",
    "pak gaya",
    "bas yaar",
    "chutiya",
    "bakwaas",
    "bekaar",

    // Emojis
    "😡",
    "🤬",
    "😠",
    "💢",
    "🔥",
  ],

  /* 😢 SAD / LOW / HURT */
  sad: [
    // English
    "sad",
    "sadness",
    "unhappy",
    "cry",
    "crying",
    "cried",
    "hurt",
    "hurts",
    "lonely",
    "alone",
    "broken",

    // Hinglish
    "dukhi",
    "udaas",
    "mann nahi",
    "bura lag raha",
    "thak gaya",
    "tired",
    "exhausted",
    "akela",
    "akeli",

    // Emojis
    "😭",
    "😢",
    "😞",
    "😔",
    "☹️",
    "🥺",
  ],

  /* 😌 CALM / SAFE / RELIEVED */
  calm: [
    // English
    "calm",
    "relaxed",
    "peace",
    "peaceful",
    "fine",
    "okay",
    "ok",
    "alright",
    "safe",
    "comfortable",

    // Hinglish
    "theek hai",
    "thik hai",
    "chill",
    "koi baat nahi",
    "sab theek",
    "shaant",
    "sukoon",

    // Emojis
    "😌",
    "🙂",
    "🫶",
  ],

  /* 😰 ANXIOUS / STRESSED / OVERTHINKING */
  anxious: [
    // English
    "anxious",
    "anxiety",
    "stressed",
    "stress",
    "worried",
    "scared",
    "afraid",
    "nervous",
    "panic",
    "overthinking",

    // Hinglish
    "tension",
    "dar lag raha",
    "soch raha",
    "overthink",
    "ghabrahat",
    "confused",
    "samajh nahi aa raha",

    // Emojis
    "😰",
    "😥",
    "😨",
    "😟",
    "😬",
  ],
};

const EMOTION_COLORS = {
  love: [330, 70, 75], // pink
  happy: [120, 70, 75], // green
  angry: [0, 0, 18], // red
  sad: [220, 40, 75], // blue
  calm: [180, 30, 85], // soft teal
  anxious: [40, 60, 80], // muted yellow
};

/* ================= ANALYSIS ================= */

function analyzeEmotionMix(texts) {
  const counts = {};
  let totalHits = 0;

  Object.keys(EMOTIONS).forEach((e) => (counts[e] = 0));

  texts.forEach((t) => {
    const text = t.toLowerCase();
    Object.entries(EMOTIONS).forEach(([emotion, words]) => {
      words.forEach((w) => {
        if (text.includes(w)) {
          counts[emotion]++;
          totalHits++;
        }
      });
    });
  });

  if (totalHits === 0) return null;

  const mix = {};
  Object.entries(counts).forEach(([e, c]) => {
    if (c > 0) mix[e] = c / totalHits;
  });

  const intensity = Math.min(totalHits / 6, 1);

  return { mix, intensity };
}

/* ================= COLOR UTILS ================= */

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
}

function blendEmotionColorsToRGB(mix) {
  let r = 0,
    g = 0,
    b = 0;

  const weights = {
    angry: mix.angry || 0,
    sad: mix.sad || 0,
    anxious: mix.anxious || 0,
    love: mix.love || 0,
    happy: mix.happy || 0,
    calm: mix.calm || 0,
  };

  Object.entries(mix).forEach(([emotion, weight]) => {
    const base = EMOTION_COLORS[emotion];
    if (!base) return;
    let [h, s, l] = base;
    let [cr, cg, cb] = hslToRgb(h, s, l);

    /* 😡 ANGER — HARD SUPPRESSION */
    if (weights.angry > 0.3 && emotion !== "angry") {
      const kill = Math.min((weights.angry - 0.3) / 0.7, 1);
      cr *= 1 - kill;
      cg *= 1 - kill;
      cb *= 1 - kill;
    }

    /* 😢 SAD — DESATURATION */
    if (weights.sad > 0.25 && emotion !== "sad") {
      const grey = (cr + cg + cb) / 3;
      const fade = Math.min(weights.sad / 0.8, 1);
      cr = cr * (1 - fade) + grey * fade;
      cg = cg * (1 - fade) + grey * fade;
      cb = cb * (1 - fade) + grey * fade;
    }

    /* 😰 ANXIOUS — YELLOW DISTORTION */
    if (weights.anxious > 0.25 && emotion !== "anxious") {
      const skew = Math.min(weights.anxious / 0.8, 1);
      cr += 20 * skew;
      cg += 20 * skew;
      cb -= 15 * skew;
    }

    /* ❤️ LOVE — WARM AMPLIFICATION */
    if (emotion === "love") {
      cr *= 1 + weights.love * 0.4;
      cg *= 1 + weights.love * 0.15;
    }

    /* 😄 HAPPY — BRIGHTNESS LIFT */
    if (emotion === "happy") {
      cr *= 1 + weights.happy * 0.25;
      cg *= 1 + weights.happy * 0.25;
      cb *= 1 + weights.happy * 0.15;
    }

    cr = Math.min(255, Math.max(0, cr));
    cg = Math.min(255, Math.max(0, cg));
    cb = Math.min(255, Math.max(0, cb));

    r += cr * weight;
    g += cg * weight;
    b += cb * weight;
  });

  /* 😌 CALM — GLOBAL DAMPENING */
  if (weights.calm > 0.3) {
    const damp = Math.min(weights.calm / 0.8, 1);
    r = r * (1 - damp) + 245 * damp;
    g = g * (1 - damp) + 245 * damp;
    b = b * (1 - damp) + 245 * damp;
  }

  const maxC = Math.max(r, g, b, 1);
  if (maxC > 255) {
    r = (r / maxC) * 255;
    g = (g / maxC) * 255;
    b = (b / maxC) * 255;
  }

  return {
    r: Math.min(255, Math.round(r)),
    g: Math.min(255, Math.round(g)),
    b: Math.min(255, Math.round(b)),
  };
}

/* ================= EMOTIONAL INERTIA ================= */

const DEFAULT_NEUTRAL = { r: 245, g: 245, b: 245 };
const moodByChatId = {};

function smoothStep(current, target, alpha) {
  return current + (target - current) * alpha;
}

function applyInertialMood(target, intensity, chatId) {
  const key = chatId ?? "_global";
  if (!moodByChatId[key]) {
    moodByChatId[key] = { ...DEFAULT_NEUTRAL };
  }
  const current = moodByChatId[key];

  const alpha = 0.06 + intensity * 0.14;

  current.r = smoothStep(current.r, target.r, alpha);
  current.g = smoothStep(current.g, target.g, alpha);
  current.b = smoothStep(current.b, target.b, alpha);

  const value = `rgb(${Math.round(current.r)}, ${Math.round(current.g)}, ${Math.round(current.b)})`;
  document.documentElement.style.setProperty("--chat-mood-bg", value);
}

function resetMoodToTheme(chatId) {
  const key = chatId ?? "_global";
  delete moodByChatId[key];
  const themeBg = getComputedStyle(document.documentElement).getPropertyValue("--chat-bg").trim();
  if (themeBg) {
    document.documentElement.style.setProperty("--chat-mood-bg", themeBg);
  } else {
    document.documentElement.style.setProperty("--chat-mood-bg", "rgb(245, 245, 245)");
  }
}

/* ================= MESSAGE WINDOW ================= */

function getRecentMessages(messages, myId) {
  const mine = [];
  const theirs = [];
  const myIdStr = myId != null ? String(myId) : "";

  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (!m?.text || typeof m.text !== "string") continue;

    const senderStr = m.senderId != null ? String(m.senderId) : "";
    if (senderStr === myIdStr && mine.length < 8) {
      mine.push(m.text);
    } else if (senderStr !== myIdStr && theirs.length < 8) {
      theirs.push(m.text);
    }

    if (mine.length >= 8 && theirs.length >= 8) break;
  }

  return [...mine, ...theirs];
}

/* ================= HOOK ================= */

export function useMoodBackground(messages, myId, chatId) {
  useEffect(() => {
    if (!Array.isArray(messages) || messages.length === 0 || myId == null) {
      resetMoodToTheme(chatId);
      return;
    }

    const recent = getRecentMessages(messages, myId);
    if (recent.length === 0) {
      resetMoodToTheme(chatId);
      return;
    }

    const result = analyzeEmotionMix(recent);
    if (!result) {
      resetMoodToTheme(chatId);
      return;
    }

    const target = blendEmotionColorsToRGB(result.mix);
    applyInertialMood(target, result.intensity, chatId);
  }, [messages, myId, chatId]);
}
