"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Key, Loader2, Bot, User } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function FloatingAIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hello! I am the Agentic AI Hackathon Assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setIsConfigured(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isConfigured) {
      alert("Please provide a Gemini API Key first.");
      return;
    }

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const chat = model.startChat({
        history: messages.filter(m => m.role !== "model" || m.content !== "Hello! I am the Agentic AI Hackathon Assistant. Ask me anything!").map(m => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
        systemInstruction: "You are an AI assistant for the IGNITRIX Agentic AI Hackathon at KLE Technological University. The hackathon focuses on autonomous AI systems, LangChain, and LangGraph. Be helpful, concise, and futuristic.",
      });

      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      
      setMessages(prev => [...prev, { role: "model", content: response.text() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", content: "Error communicating with AI model. Please check your API key." }]);
      setIsConfigured(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 rounded-2xl overflow-hidden card-vibrant flex flex-col shadow-2xl backdrop-blur-xl bg-[#09090b]/90 border border-white/10" style={{ height: "500px" }}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <Bot size={18} className="text-red-400" />
              </div>
              <h3 className="font-bold text-white tracking-tight">Agentic AI Guide</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Configuration Screen */}
          {!isConfigured ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 pulse-ring">
                <Key size={28} className="text-indigo-400" />
              </div>
              <h4 className="font-bold mb-2 text-white">Setup AI Agent</h4>
              <p className="text-sm text-gray-400 mb-6">Enter your Gemini API key to activate the intelligent assistant.</p>
              
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors mb-4"
              />
              <button 
                onClick={handleSaveKey}
                className="w-full btn-primary py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <span>Initialize AI</span>
              </button>
            </div>
          ) : (
            // Chat Screen
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-8 h-8 shrink-0 rounded-full flex flex-col items-center justify-center ${msg.role === "user" ? "bg-indigo-500/20" : "bg-red-500/20"}`}>
                        {msg.role === "user" ? <User size={16} className="text-indigo-400" /> : <Bot size={16} className="text-red-400" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 text-sm ${msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-sm"}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex flex-col items-center justify-center">
                        <Bot size={16} className="text-red-400" />
                      </div>
                      <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-white/5 border border-white/5 flex items-center">
                        <Loader2 size={16} className="text-gray-400 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-black/20">
                <form onSubmit={handleSendMessage} className="flex gap-2 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about the hackathon..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                  >
                    <Send size={14} className={input.trim() ? "translate-x-[1px]" : ""} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-red-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform duration-300 relative pulse-ring group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-[#09090B] rounded-full animate-pulse-dot"></span>
      </button>
    </div>
  );
}
