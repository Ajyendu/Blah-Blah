import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import generateUserCode from "../lib/generateUserCode.js";

// ================== SIGNUP ==================
export const signup = async (req, res) => {
  let { fullName, email, password, gender, profilePic } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    gender = typeof gender === "string" ? gender.trim().toLowerCase() : "";
    if (!gender || !["male", "female"].includes(gender)) {
      return res.status(400).json({ message: "Please select a gender" });
    }

    profilePic = profilePic && typeof profilePic === "string" ? profilePic.trim() : "";

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // 🔐 Generate UNIQUE userCode
    let userCode;
    let isUnique = false;

    while (!isUnique) {
      userCode = generateUserCode();
      const codeExists = await User.findOne({ userCode });
      if (!codeExists) isUnique = true;
    }

    const user = await User.create({
      fullName,
      email,
      password: hashed,
      userCode,
      gender,
      profilePic: profilePic || "",
    });

    const token = generateToken(user._id, res);

    // Re-fetch so response matches DB and includes all fields
    const saved = await User.findById(user._id)
      .select("_id fullName email profilePic userCode gender")
      .lean();

    res.status(201).json({
      user: {
        _id: saved._id,
        fullName: saved.fullName,
        email: saved.email,
        profilePic: saved.profilePic || "",
        userCode: saved.userCode,
        gender: saved.gender || "",
      },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ================== LOGIN ==================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, res);

    res.status(200).json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic || "",
        userCode: user.userCode,
        gender: user.gender || "",
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ================== LOGOUT ==================
export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

// ================== CHECK AUTH ==================
export const checkAuth = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findById(req.user._id).select(
    "_id fullName email profilePic userCode gender",
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic || "",
    userCode: user.userCode,
    gender: user.gender || "",
  });
};

// ================== UPDATE PROFILE ==================
export const updateProfile = async (req, res) => {
  const { profilePic, fullName, gender } = req.body;
  const userId = req.user._id;

  try {
    const updates = {};
    if (typeof fullName === "string" && fullName.trim()) {
      updates.fullName = fullName.trim();
    }
    if (gender === "male" || gender === "female") {
      updates.gender = gender;
    }
    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic);
      updates.profilePic = upload.secure_url;
    }
    if (Object.keys(updates).length === 0) {
      const user = await User.findById(userId).select(
        "_id fullName email profilePic userCode gender",
      );
      return res.status(200).json(user);
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true },
    ).select("_id fullName email profilePic userCode gender");

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// ================== DELETE ACCOUNT ==================
export const deleteAccount = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
