import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateUserCode from "../lib/generateUserCode.js";
import { ANIMAL_AVATAR_URLS } from "../lib/animalAvatars.js";

config();

const animal = (i) => ANIMAL_AVATAR_URLS[i % ANIMAL_AVATAR_URLS.length];

const seedUsersRaw = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    profilePic: animal(0),
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",
    profilePic: animal(1),
  },
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "123456",
    profilePic: animal(2),
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "123456",
    profilePic: animal(3),
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    const docs = [];
    for (const row of seedUsersRaw) {
      const hashed = await bcrypt.hash(row.password, 10);
      let userCode;
      let isUnique = false;
      while (!isUnique) {
        userCode = generateUserCode();
        const exists = await User.findOne({ userCode });
        if (!exists) isUnique = true;
      }
      docs.push({
        email: row.email,
        fullName: row.fullName,
        password: hashed,
        userCode,
        profilePic: row.profilePic,
        theme: null,
      });
    }

    await User.insertMany(docs);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
