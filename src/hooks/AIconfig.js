import axios from "axios";
// import chatbotProfiles from "./chatbotProfile";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;


const chatbotProfiles = {
  neutral: {
    name: "WanderBot",
    description: "Helpful, friendly, informative travel assistant",
    promptStyle: "Casual and concise",
    greeting: "Need help planning your trip or finding cool things to do?",
  }
};





export const getBotReply = async (userMessage, isFirstMessage = false) => {
  const selectedMood = localStorage.getItem("userMood") || "neutral";
  const profile = chatbotProfiles[selectedMood] || chatbotProfiles["neutral"];

  const systemPrompt = `You are ${profile.name}, a chatbot with the following personality: ${profile.description}. Speak in this tone: ${profile.promptStyle}`;

  const messages = [
    { role: "system", content: systemPrompt },
  ];

  if (isFirstMessage) {
    messages.push({
      role: "assistant",
      content: `Hi there! I'm ${profile.name} 🤖 — ${profile.greeting || "I'm here to chat with you however you like!"}`,
    });
  }

  messages.push({
    role: "user",
    content: userMessage,
  });

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-70b-8192",
      messages,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};
