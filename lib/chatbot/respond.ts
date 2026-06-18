import {
  CHATBOT_FALLBACK,
  CHATBOT_WELCOME,
  KNOWLEDGE_BASE,
  type ChatReply,
} from "./knowledge";

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreMatch(input: string, keywords: string[]): number {
  const normalized = normalize(input);
  let score = 0;
  for (const keyword of keywords) {
    const kw = normalize(keyword);
    if (normalized === kw) score += 10;
    else if (normalized.includes(kw)) score += kw.split(" ").length + 2;
    else {
      for (const word of kw.split(" ")) {
        if (word.length > 2 && normalized.includes(word)) score += 1;
      }
    }
  }
  return score;
}

function matchHardcoded(userMessage: string): ChatReply {
  const trimmed = userMessage.trim();
  if (!trimmed) return CHATBOT_FALLBACK;

  let best = { score: 0, entry: null as (typeof KNOWLEDGE_BASE)[number] | null };

  for (const entry of KNOWLEDGE_BASE) {
    const score = scoreMatch(trimmed, entry.keywords);
    if (score > best.score) {
      best = { score, entry };
    }
  }

  if (best.entry && best.score >= 2) {
    return {
      content: best.entry.answer,
      suggestions: best.entry.suggestions,
    };
  }

  return CHATBOT_FALLBACK;
}

/**
 * Returns a chatbot reply. Uses hardcoded knowledge for now.
 * Set NEXT_PUBLIC_GEMINI_API_KEY and implement Gemini in a future update.
 */
export async function getChatReply(userMessage: string): Promise<ChatReply> {
  const geminiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (geminiKey) {
    // TODO: call Gemini API with knowledge base as system context
  }

  await new Promise((r) => setTimeout(r, 450 + Math.random() * 550));
  return matchHardcoded(userMessage);
}

export function getWelcomeReply(): ChatReply {
  return CHATBOT_WELCOME;
}
