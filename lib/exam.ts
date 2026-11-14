// Shared exam types and the offline fallback scorer (used when Gemini is not configured or fails).
export type Persona = { name: string; role: string; reaction: string; stayed: boolean };
export type ExamResult = {
  score: number;
  verdict: string;
  personas: Persona[];
  strengths: string[];
  fixes: string[];
  improved: string;
  engine: "gemini" | "offline";
};

const GREETING = /\b(hi|hello|hey|welcome|today i want|in this video)\b/i;
const VAGUE = /\b(everyone|anyone|inspire|amazing|best version|journey|passion)\b/i;

export function offlineScore(answer: string, minLines = 1): ExamResult {
  const text = answer.trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const lines = text.split(/\n/).filter((l) => l.trim()).length;
  let s = 5;
  const strengths: string[] = [];
  const fixes: string[] = [];
  if (words < 8) { s -= 3; fixes.push("Too short. Give the viewer something concrete."); }
  if (words > 12) { s += 0.5; }
  if (/\d/.test(text)) { s += 1; strengths.push("Uses a specific number."); } else fixes.push("Add one number: minutes, grams, steps or results.");
  if (/\byou(r)?\b/i.test(text)) { s += 0.7; strengths.push("Talks to the viewer directly."); }
  if (/\?/.test(text)) { s += 0.5; strengths.push("Opens a question in the viewer’s head."); }
  if (GREETING.test(text)) { s -= 2.5; fixes.push("Cut the greeting. Lead with the reason to stay."); }
  if (VAGUE.test(text)) { s -= 1.5; fixes.push("Replace vague words with a concrete result."); }
  if (lines >= minLines) { s += 1; } else { s -= 1.5; fixes.push(`The task asks for about ${minLines} parts. Add the missing ones.`); }
  const score = Math.max(1, Math.min(9.4, Math.round(s * 10) / 10));
  const pass = score >= 6;
  const personas: Persona[] = pass
    ? [
        { name: "Future client", role: "your ideal viewer", reaction: "This is about me. I would save it and check your profile.", stayed: true },
        { name: "Beginner", role: "new to the topic", reaction: "Clear and simple, I get it.", stayed: true },
        { name: "Expert", role: "knows the topic", reaction: "Solid. Add a source or a number to be even stronger.", stayed: true },
        { name: "Skeptic", role: "doubts everything", reaction: "Okay, but prove it. Show a real example.", stayed: true },
        { name: "Hater", role: "scrolls fast", reaction: "Fine, I watched to the end.", stayed: false },
      ]
    : [
        { name: "Future client", role: "your ideal viewer", reaction: "I don’t see why this is for me.", stayed: false },
        { name: "Beginner", role: "new to the topic", reaction: "Not sure what I would get from this.", stayed: false },
        { name: "Expert", role: "knows the topic", reaction: "Too general. Where is the specific point?", stayed: true },
        { name: "Skeptic", role: "doubts everything", reaction: "Heard this a hundred times.", stayed: false },
        { name: "Hater", role: "scrolls fast", reaction: "Gone in one second.", stayed: false },
      ];
  return {
    score,
    verdict: pass ? "Your AI audience stayed. Passed." : "Most of your AI audience scrolled away.",
    personas,
    strengths: strengths.length ? strengths : ["You finished the task."],
    fixes: fixes.length ? fixes : ["Make the first line sharper."],
    improved: "",
    engine: "offline",
  };
}
