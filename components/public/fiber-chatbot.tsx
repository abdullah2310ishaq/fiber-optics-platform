"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X, Minus } from "lucide-react";
import { getChatReply, getWelcomeReply } from "@/lib/chatbot/respond";
import type { ChatMessage } from "@/lib/chatbot/knowledge";
import { cn } from "@/lib/utils";

function renderMarkdownLite(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function newMessage(role: "user" | "bot", content: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: new Date(),
  };
}

export function FiberChatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  useEffect(() => {
    if (open && !minimized) {
      inputRef.current?.focus();
    }
  }, [open, minimized]);

  const initChat = useCallback(() => {
    if (initialized) return;
    const welcome = getWelcomeReply();
    setMessages([newMessage("bot", welcome.content)]);
    setSuggestions(welcome.suggestions);
    setInitialized(true);
  }, [initialized]);

  function handleOpen() {
    setOpen(true);
    setMinimized(false);
    initChat();
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setInput("");
    setSuggestions([]);
    setMessages((prev) => [...prev, newMessage("user", trimmed)]);
    setTyping(true);

    try {
      const reply = await getChatReply(trimmed);
      setMessages((prev) => [...prev, newMessage("bot", reply.content)]);
      setSuggestions(reply.suggestions);
    } catch {
      setMessages((prev) => [
        ...prev,
        newMessage("bot", "Sorry, something went wrong. Please try again or visit /contact."),
      ]);
      setSuggestions(["Contact support", "What products do you sell?"]);
    } finally {
      setTyping(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(520px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-accent/10 sm:right-6"
          >
            <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-md shadow-accent/20">
                <Bot className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="home-label truncate text-sm font-bold text-foreground">
                  Fiber Optics Assistant
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                  Online — fiber catalog & RFQ help
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Minimize"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-background p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "bot" && (
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Bot className="h-3.5 w-3.5 text-accent" />
                    </span>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "rounded-br-md bg-accent text-accent-foreground"
                        : "rounded-bl-md border border-border bg-card text-foreground"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{renderMarkdownLite(msg.content)}</div>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Bot className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            {suggestions.length > 0 && !typing && (
              <div className="flex flex-wrap gap-2 border-t border-border bg-background px-4 py-3">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="home-label rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[11px] font-medium text-accent transition-colors hover:bg-accent/15"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border-t border-border bg-card p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, RFQ, fiber types..."
                disabled={typing}
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-md shadow-accent/20 transition-opacity hover:bg-accent-hover disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && minimized && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            type="button"
            onClick={() => setMinimized(false)}
            className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full border border-accent/30 bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-lg sm:right-6"
          >
            <Bot className="h-4 w-4 text-accent" />
            Fiber Assistant — tap to expand
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => (open ? setOpen(false) : handleOpen())}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg sm:right-6",
          open
            ? "bg-muted text-foreground shadow-foreground/10"
            : "bg-accent text-accent-foreground shadow-accent/30"
        )}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </>
  );
}
