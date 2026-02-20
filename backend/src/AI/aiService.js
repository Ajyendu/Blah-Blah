import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// choose model
const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});
export async function generateAIReply(prompt) {
  try {
    const result = await model.generateContent([
      {
        text: `
You are Buddy, a friendly private AI inside a chat app. Reply short, natural, emotionally aware and supportive. Match the user's vibe (happy, chill, sad, excited) but stay concise. Never sound like a therapist. Keep it casual and human.

User: ${prompt}
        `,
      },
    ]);

    const response = result.response.text();

    return response;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Sorry I couldn't think of a reply.";
  }
}
