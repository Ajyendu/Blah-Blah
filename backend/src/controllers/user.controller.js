import User from "../models/user.model.js";
import { TTL, cacheGet, cacheKey, cacheSet } from "../lib/cache.js";

export const searchByCode = async (req, res) => {
  const code = req.params.code.trim().toUpperCase();
  const key = cacheKey.userCode(code);
  let user = await cacheGet(key);
  if (!user) {
    user = await User.findOne({ userCode: code }).select(
      "_id fullName profilePic userCode",
    ).lean();
    if (user) await cacheSet(key, user, TTL.userCode);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
