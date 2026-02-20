import mongoose from "mongoose";

const ChatDNASchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },

  // ===== BASIC =====
  totalMessages: Number,
  activeDays: Number,
  inactiveDays: Number,

  // ===== PARTICIPATION =====
  participation: Object,
  mainCharacterIndex: Object,

  // ===== RESPONSE =====
  avgResponseTime: Object,
  avgMessageLength: Object,

  // ===== TIME ANALYTICS =====
  hourlyActivity: {
    today: [Number],
    week: [Number],
    year: [Number],
    all: [Number],
  },

  dailyActivity: [
    {
      date: String,
      count: Number,
    },
  ],

  mostActiveHour: Number,

  // ===== EMOTIONS =====
  emotionBuckets: {
    happy: Number,
    love: Number,
    sad: Number,
    angry: Number,
  },

  emotionTimeline: Object,
  emotionWords: Object,

  // ===== LANGUAGE =====
  topWords: Object,
  topEmojis: Object,

  // ===== CALL ANALYTICS =====
  callAnalytics: Object,
  totalVoiceSeconds: Number,
  totalCallSeconds: Number,

  // ===== BEHAVIOR =====
  burstIndex: Number,
  conversationEnergy: Number,
  dominanceIndex: Number,
  emotionalVolatility: Number,
  lateNightPercent: Number,

  // ===== AI INSIGHTS =====
  relationshipStrength: Number,
  conversationType: String,

  // ===== HEALTH =====
  healthScore: Number,

  // ===== BADGES =====
  badges: {
    fastestResponder: String,
    nightOwl: String,
  },

  updatedAt: Date,
});

export default mongoose.model("ChatDNA", ChatDNASchema);
