"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm ${personalInfo.name.split(" ")[0]}'s AI assistant. Ask about L&D, business development, programme management, certifications, or career highlights. How can I help?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    messagesEndRef.current?.scrollIntoView({ behavior: instant ? "auto" : "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            `I'm having trouble connecting right now. Please try again or message ${personalInfo.name.split(" ")[0]} on LinkedIn.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="resume-chat-panel"
        aria-label="Open resume chat assistant"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-neural-cyan/30 bg-neural-cyan/20 text-neural-cyan transition-colors duration-200 glow-cyan-sm hover:bg-neural-cyan/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg ${
          open ? "hidden" : ""
        }`}
      >
        <MessageCircle size={24} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="resume-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-chat-title"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex h-[min(520px,85vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden glass-card"
          >
            <div className="flex items-center justify-between border-b border-neural-border/30 p-4">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-neural-cyan" aria-hidden />
                <div>
                  <h3 id="resume-chat-title" className="text-sm font-semibold text-neural-fg">
                    Talk to My Resume
                  </h3>
                  <p className="text-xs text-neural-fg-dim">AI-powered assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="cursor-pointer rounded-lg p-1 text-neural-fg-dim transition-colors duration-200 hover:text-neural-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-neural-purple/20 text-neural-purple"
                        : "bg-neural-cyan/20 text-neural-cyan"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} aria-hidden />
                    ) : (
                      <Bot size={14} aria-hidden />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-neural-purple/20 text-neural-fg-soft"
                        : "bg-neural-surface text-neural-fg-soft"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-neural-cyan/20 text-neural-cyan flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-neural-surface">
                    <div className="flex gap-1" aria-hidden>
                      <span className="h-2 w-2 rounded-full bg-neural-fg-muted/60 motion-safe:animate-bounce" />
                      <span
                        className="h-2 w-2 rounded-full bg-neural-fg-muted/60 motion-safe:animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-neural-fg-muted/60 motion-safe:animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-neural-border/30 p-3">
              <div className="flex gap-2">
                <label htmlFor="resume-chat-input" className="sr-only">
                  Message to assistant
                </label>
                <input
                  id="resume-chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about Pavithra's experience..."
                  className="flex-1 rounded-lg border border-neural-border/30 bg-neural-surface px-3 py-2 text-sm text-neural-fg placeholder:text-neural-fg-dim/80 transition-colors duration-200 focus:border-neural-cyan/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="cursor-pointer rounded-lg bg-neural-cyan/20 p-2 text-neural-cyan transition-colors duration-200 hover:bg-neural-cyan/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neural-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-neural-bg disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Send size={16} aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
