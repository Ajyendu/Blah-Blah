import {
  redisDel,
  redisDelMany,
  redisGetJson,
  redisSetJson,
} from "./redis.js";

const TTL = {
  user: 90,
  userCode: 120,
  chats: 20,
  friends: 45,
  messages: 15,
  notes: 30,
  conversation: 60,
};

export const cacheKey = {
  user: (id) => `user:me:${id}`,
  userPub: (id) => `user:pub:${id}`,
  userCode: (code) => `user:code:${String(code).toUpperCase()}`,
  chats: (id) => `chats:list:${id}`,
  friends: (id) => `chats:friends:${id}`,
  messages: (chatId, userId) => `msgs:${chatId}:${userId}:p1`,
  notes: (chatId, userId) => `notes:${chatId}:${userId}`,
  conversation: (id) => `conv:${id}`,
};

export async function cacheGet(key) {
  return redisGetJson(key);
}

export async function cacheSet(key, value, ttlSec) {
  await redisSetJson(key, value, ttlSec);
}

export { TTL };

export async function bustUser(userId, userCode) {
  const id = String(userId);
  const keys = [cacheKey.user(id), cacheKey.userPub(id)];
  if (userCode) keys.push(cacheKey.userCode(userCode));
  await redisDelMany(keys);
}

export async function bustInbox(...userIds) {
  const keys = [];
  for (const id of userIds) {
    if (id == null) continue;
    const s = String(id);
    keys.push(cacheKey.chats(s), cacheKey.friends(s));
  }
  await redisDelMany(keys);
}

export async function bustChat(chatId, ...userIds) {
  if (!chatId) return;
  const cid = String(chatId);
  const keys = [cacheKey.conversation(cid)];
  for (const id of userIds) {
    if (id == null) continue;
    const s = String(id);
    keys.push(
      cacheKey.chats(s),
      cacheKey.friends(s),
      cacheKey.messages(cid, s),
      cacheKey.notes(cid, s),
    );
  }
  await redisDelMany(keys);
}

export async function bustMessages(chatId, ...userIds) {
  if (!chatId) return;
  const cid = String(chatId);
  await redisDelMany(
    userIds.filter((id) => id != null).map((id) => cacheKey.messages(cid, String(id))),
  );
  await redisDel(cacheKey.conversation(cid));
}
