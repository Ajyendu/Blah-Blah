import User from "../models/user.model.js";

export const searchByCode = async (req, res) => {
  const code = req.params.code.trim().toUpperCase();

  const user = await User.findOne({ userCode: code }).select(
    "_id fullName profilePic userCode"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
