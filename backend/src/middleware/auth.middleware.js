import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { cacheGet, cacheKey, cacheSet, TTL } from "../lib/cache.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const key = cacheKey.user(userId);

    let user = await cacheGet(key);
    if (!user) {
      user = await User.findById(userId)
        .select("_id fullName email profilePic userCode theme")
        .lean();
      if (user) await cacheSet(key, user, TTL.user);
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
