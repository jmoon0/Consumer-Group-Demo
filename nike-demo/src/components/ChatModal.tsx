"use client";
import React, { useState } from "react";

type ChatModalProps = {
  onClose: () => void;
};

export default function ChatModal({ onClose }: ChatModalProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    // replace this mock response with real API call
    const gptResponse = `blah blah "${userMessage}"...`;
    setMessages((prev) => [...prev, { role: "bot", content: gptResponse }]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">SmartSearch Chat</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Chat area */}
        <div className="h-64 overflow-y-auto border rounded p-4 mb-4 text-sm space-y-2 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-400 italic">Ask me to help narrow your product search!</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
              className={`whitespace-pre-wrap p-2 rounded-md w-fit max-w-[80%] ${
                  msg.role === "user"
                    ? "ml-auto bg-black text-white text-right"
                    : "mr-auto bg-gray-200 text-left"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Describe what you're looking for..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}