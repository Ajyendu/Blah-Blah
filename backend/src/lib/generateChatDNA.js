import Message from "../models/message.model.js";
import ChatDNA from "../models/ChatDNA.js";
import User from "../models/user.model.js";

export default async function generateChatDNA(chatId) {
  const BOT_ID = "6997e34d5bfffd55ff54458d";
  console.log("🧬 Generating Chat DNA for:", chatId);

  const messages = await Message.find({
    chatId,
    isPrivateAI: { $ne: true },
    senderId: { $ne: BOT_ID },
  }).sort({ createdAt: 1 });

  if (!messages.length) {
    await ChatDNA.findOneAndUpdate(
      { chatId },
      { chatId, totalMessages: 0 },
      { upsert: true }
    );
    return;
  }

  // ================= USERS =================
  const userIds = [...new Set(messages.map((m) => m.senderId.toString()))];
  const users = await User.find({ _id: { $in: userIds } });

  const userMap = {};
  users.forEach((u) => {
    userMap[u._id.toString()] = u.fullName;
  });

  // ================= CONTAINERS =================
  const participation = {};
  const messageLength = {};
  const responseTime = {};
  const responseCount = {};
  const emojiMap = {};
  const wordMap = {};
  const emotionWordsMap = {};
  const dailyMap = {};
  const emotionTimeline = {};

  const callAnalytics = {};

  let lateNightCount = 0;
  let burstCount = 0;
  let totalVoiceSeconds = 0;
  let totalCallSeconds = 0;

  const emotionBuckets = {
    happy: 0,
    love: 0,
    sad: 0,
    angry: 0,
  };

  const happyWords = ["happy", "fun", "haha", "great"];
  const loveWords = ["love", "miss", "baby"];
  const sadWords = ["sad", "cry", "hurt"];
  const angryWords = ["angry", "hate", "annoyed"];

  // ================= TIME SETUP =================
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  const hourly = {
    today: Array(24).fill(0),
    week: Array(24).fill(0),
    year: Array(24).fill(0),
    all: Array(24).fill(0),
  };

  // ================= HOURLY LOOP =================
  messages.forEach((msg) => {
    const msgDate = new Date(msg.createdAt);
    const hour = msgDate.getHours();

    hourly.all[hour]++;

    if (msgDate.toDateString() === now.toDateString()) hourly.today[hour]++;

    if (msgDate >= weekAgo) hourly.week[hour]++;

    if (msgDate.getFullYear() === now.getFullYear()) hourly.year[hour]++;
  });

  // ================= MAIN LOOP =================
  messages.forEach((msg, i) => {
    const userId = msg.senderId.toString();
    const name = userMap[userId] || "Unknown";

    participation[name] = (participation[name] || 0) + 1;
    messageLength[name] = (messageLength[name] || 0) + (msg.text?.length || 0);

    const day = new Date(msg.createdAt).toISOString().slice(0, 10);
    dailyMap[day] = (dailyMap[day] || 0) + 1;

    if (!emotionTimeline[day]) {
      emotionTimeline[day] = {
        happy: 0,
        love: 0,
        sad: 0,
        angry: 0,
      };
    }

    // WORDS
    const words = msg.text
      ?.toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter((w) => w.length > 3);

    words?.forEach((word) => {
      if (!wordMap[name]) wordMap[name] = {};
      wordMap[name][word] = (wordMap[name][word] || 0) + 1;

      if (happyWords.includes(word)) {
        emotionBuckets.happy++;
        emotionTimeline[day].happy++;
      }

      if (loveWords.includes(word)) {
        emotionBuckets.love++;
        emotionTimeline[day].love++;
      }

      if (sadWords.includes(word)) {
        emotionBuckets.sad++;
        emotionTimeline[day].sad++;
      }

      if (angryWords.includes(word)) {
        emotionBuckets.angry++;
        emotionTimeline[day].angry++;
      }
    });

    // EMOJIS
    const emojis = msg.text?.match(/\p{Emoji}/gu) || [];
    emojis.forEach((e) => {
      if (!emojiMap[name]) emojiMap[name] = {};
      emojiMap[name][e] = (emojiMap[name][e] || 0) + 1;
    });

    // RESPONSE TIME
    if (i > 0 && messages[i - 1].senderId.toString() !== userId) {
      const diff =
        new Date(msg.createdAt) - new Date(messages[i - 1].createdAt);

      responseTime[name] = (responseTime[name] || 0) + diff;
      responseCount[name] = (responseCount[name] || 0) + 1;
    }

    // BURST
    if (i > 0) {
      const diff =
        new Date(msg.createdAt) - new Date(messages[i - 1].createdAt);
      if (diff < 10000) burstCount++;
    }

    // LATE NIGHT
    const hour = new Date(msg.createdAt).getHours();
    if (hour >= 0 && hour < 5) lateNightCount++;

    // CALLS
    if (msg.callDuration) {
      if (!callAnalytics[name]) callAnalytics[name] = { count: 0, duration: 0 };

      callAnalytics[name].count++;
      callAnalytics[name].duration += msg.callDuration;
      totalCallSeconds += msg.callDuration;
    }

    if (msg.voiceDuration) totalVoiceSeconds += msg.voiceDuration;
  });

  // ================= DERIVED =================
  const totalMessages = messages.length;

  const totalDays =
    Math.ceil(
      (new Date(messages[messages.length - 1].createdAt) -
        new Date(messages[0].createdAt)) /
        (1000 * 60 * 60 * 24)
    ) || 1;

  const activeDays = Object.keys(dailyMap).length;
  const inactiveDays = totalDays - activeDays;

  const avgResponseTime = {};
  Object.keys(responseTime).forEach((name) => {
    avgResponseTime[name] = responseCount[name]
      ? responseTime[name] / responseCount[name] / 1000
      : 0;
  });

  const values = Object.values(participation);
  const dominanceIndex =
    (Math.max(...values) - Math.min(...values)) / totalMessages;

  const emotionalVolatility =
    (emotionBuckets.sad + emotionBuckets.angry) / totalMessages;

  const lateNightPercent = (lateNightCount / totalMessages) * 100;

  const positive = emotionBuckets.happy + emotionBuckets.love;
  const negative = emotionBuckets.sad + emotionBuckets.angry;

  const positivityRatio =
    positive + negative === 0 ? 0.5 : positive / (positive + negative);

  const healthScore = Math.round(
    (positivityRatio * 0.4 +
      (1 - dominanceIndex) * 0.2 +
      (1 - emotionalVolatility) * 0.2 +
      (1 - lateNightPercent / 100) * 0.2) *
      100
  );

  // ===== PRO INSIGHTS =====

  const mainCharacterIndex = {};
  Object.keys(participation).forEach((name) => {
    mainCharacterIndex[name] = Math.round(
      (participation[name] / totalMessages) * 100
    );
  });

  Object.keys(callAnalytics).forEach((u) => {
    callAnalytics[u].avg = callAnalytics[u].duration / callAnalytics[u].count;
  });

  const mostActiveHour = hourly.all.indexOf(Math.max(...hourly.all));

  const conversationEnergy = burstCount / totalMessages;

  const fastestResponder = Object.entries(avgResponseTime).sort(
    (a, b) => a[1] - b[1]
  )[0]?.[0];

  const relationshipStrength = Math.round(
    ((1 - dominanceIndex) * 0.3 +
      (activeDays / totalDays) * 0.3 +
      positivityRatio * 0.2 +
      (conversationEnergy > 0.3 ? 1 : 0.5) * 0.2) *
      100
  );

  let conversationType = "Balanced";
  if (dominanceIndex > 0.5) conversationType = "One-sided";
  if (conversationEnergy > 0.4) conversationType = "High Energy";

  // ================= SAVE =================
  await ChatDNA.findOneAndUpdate(
    { chatId },
    {
      chatId,
      totalMessages,
      participation,
      avgResponseTime,
      hourlyActivity: hourly,
      dailyActivity: Object.entries(dailyMap).map(([date, count]) => ({
        date,
        count,
      })),
      emotionBuckets,
      emotionTimeline,
      callAnalytics,
      mainCharacterIndex,
      relationshipStrength,
      conversationEnergy,
      conversationType,
      mostActiveHour,
      badges: {
        fastestResponder,
      },
      healthScore,
      activeDays,
      inactiveDays,
      burstIndex: burstCount,
      dominanceIndex,
      emotionalVolatility,
      lateNightPercent,
      totalVoiceSeconds,
      totalCallSeconds,
      updatedAt: new Date(),
    },
    { upsert: true }
  );

  console.log("✅ Chat DNA PRO updated");
}
