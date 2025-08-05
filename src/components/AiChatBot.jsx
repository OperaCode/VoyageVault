import React, { useState, useRef, useEffect } from "react";
import { getBotReply } from "../hooks/AIconfig";

const suggestedQuestions = [
  "What should I pack for a 10-day trip to Japan?",
  "What are the must-see attractions in Paris?",
  "How do I prepare for a solo trip?",
  "What are some travel safety tips?",
  "Help me create a quick itinerary!",
];

const AiChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await getBotReply(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Bot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn’t respond right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedClick = (question) => {
    setInput(question);
    handleSend();
  };

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto bg-white/50 rounded-xl p-4 shadow-lg border border-amber-200">
      {/* Chat Messages */}
      <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 text-sm rounded-lg w-fit max-w-[85%] ${
              msg.role === "user"
                ? "bg-amber-100 self-end text-right"
                : "bg-gray-100 self-start text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic">WanderBot is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t pt-4">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow p-2  px-4 py-3 rounded-md border-2 border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
        >
          Send
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="pt-2 border-t border-dashed border-amber-300">
        <p className="text-sm text-gray-600 font-medium mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedClick(question)}
              className="bg-orange-100 hover:bg-orange-200 text-orange-800 text-sm px-3 py-1 rounded-full transition cursor-pointer"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiChatBot;
