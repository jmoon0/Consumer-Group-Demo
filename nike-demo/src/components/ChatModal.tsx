import React, { useState } from "react";
import { products } from "@/util/data";
import { Loader2 } from "lucide-react";

type ChatModalProps = {
  onClose: () => void;
  onChat: (ids: number[]) => void;
};

export default function ChatModal({ onClose, onChat }: ChatModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const productSummary = products.map(
    ({ id, name, category, description, fit, sport, price }) => ({
      id,
      name,
      category,
      description,
      fit,
      sport,
      price,
    })
  );
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [matchingIds, setMatchingIds] = useState<number[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    const systemPrompt = `You are a helpful assistant for the Nike website. 
    Use the provided t-shirt data to filter products and suggest ones that match the user's preferences. 
    Respond with a helpful explanation, but end your response with a single line containing only a JSON array of matching product IDs.'

    Here is the product data:
    ${JSON.stringify(productSummary, null, 2)}`;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.2,
        }),
      });

      const data = await res.json();
      const gptResponse =
        data.choices?.[0]?.message?.content || "Sorry, no response.";

      setMessages((prev) => [...prev, { role: "bot", content: gptResponse }]);

      try {
        const lines = gptResponse.trim().split("\n");
        const lastLine = lines[lines.length - 1];
        const match = lastLine.match(/\[[\d,\s]+\]/);
        if (match) {
          const ids = JSON.parse(match[0]);
          if (Array.isArray(ids) && ids.every((id) => typeof id === "number")) {
            setMatchingIds(ids);
            console.log("Matched IDs:", ids);

            // Call function that re-renders product page
            onChat(ids);
          }
        }
      } catch (err) {
        console.warn("Could not parse GPT response as ID list:", err);
      }
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "There was an error processing your request." },
      ]);
      onChat([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Nike SmartAssist Chat</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="h-64 overflow-y-auto border rounded p-4 mb-4 text-sm space-y-2 bg-gray-50">
          {messages.length === 0 && !isLoading ? ( // Hide initial text if loading starts immediately
            <p className="text-gray-400 italic">
              Ask me to help narrow your product search!
            </p>
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
                {(() => {
                  // Filter out the ID array line from the display
                  const lines = msg.content.trim().split("\n");
                  const filteredLines = lines.filter(
                    (line) => !/^\s*\[[\d,\s]*\]\s*$/.test(line) // Allow empty array []
                  );
                  // If it's a bot message and all lines were filtered (only ID array was present)
                  // show a generic message or nothing, otherwise show filtered lines.
                  // This handles cases where the bot *only* returns the ID array.
                  if (
                    msg.role === "bot" &&
                    filteredLines.length === 0 &&
                    lines.length > 0
                  ) {
                    return <div>Okay, filtering products...</div>; // Or return null;
                  }
                  return filteredLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ));
                })()}
              </div>
            ))
          )}

          {/* --- Add Loading Indicator Here --- */}
          {isLoading && (
            <div className="flex justify-start p-2">
              {" "}
              {/* Aligns left like bot message */}
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            </div>
          )}
          {/* --- End Loading Indicator --- */}
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
