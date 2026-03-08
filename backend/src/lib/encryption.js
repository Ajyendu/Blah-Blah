import crypto from "crypto";

const ALGO = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const PREFIX = "enc:";

/**
 * Get encryption key from env. Must be 32 bytes (64 hex chars) for AES-256.
 * Accepts pasted values: trims whitespace/newlines, strips 0x prefix, uses first 64 hex chars.
 */
function getKey() {
  let raw = process.env.DATA_ENCRYPTION_KEY;
  if (!raw || typeof raw !== "string") return null;
  raw = raw.trim().replace(/^0x/i, "").replace(/\s+/g, "");
  const hex = raw.replace(/[^0-9a-fA-F]/g, "");
  if (hex.length < 64) return null;
  return Buffer.from(hex.slice(0, 64), "hex");
}

/**
 * Encrypt plaintext. Returns "enc:" + base64(iv|authTag|ciphertext), or plaintext if no key.
 */
export function encrypt(plaintext) {
  if (plaintext == null || plaintext === "") return plaintext;
  const key = getKey();
  if (!key) return plaintext;

  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGO, key, iv, { authTagLength: AUTH_TAG_LENGTH });
    const enc = Buffer.concat([
      cipher.update(String(plaintext), "utf8"),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    const combined = Buffer.concat([iv, authTag, enc]);
    return PREFIX + combined.toString("base64");
  } catch (err) {
    console.error("Encryption error:", err);
    return plaintext;
  }
}

/**
 * Decrypt ciphertext. If input has "enc:" prefix, decrypt; otherwise return as-is (backward compat).
 */
export function decrypt(ciphertext) {
  if (ciphertext == null) return ciphertext;
  const str = typeof ciphertext === "string" ? ciphertext : String(ciphertext);
  if (str === "") return str;
  if (!str.startsWith(PREFIX)) return ciphertext;

  const key = getKey();
  if (!key) return ciphertext;

  try {
    const combined = Buffer.from(str.slice(PREFIX.length), "base64");
    const iv = combined.subarray(0, IV_LENGTH);
    const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const enc = combined.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
    const decipher = crypto.createDecipheriv(ALGO, key, iv, { authTagLength: AUTH_TAG_LENGTH });
    decipher.setAuthTag(authTag);
    return decipher.update(enc) + decipher.final("utf8");
  } catch (err) {
    console.error("Decryption error:", err);
    return ciphertext;
  }
}
