import { gemini, hasGemini, type GeminiTurn } from "@/lib/gemini";

type Body = {
  messages: GeminiTurn[];
  profile: { who: string; niche: string; audience: string; platforms: string; goal?: string; camera?: string };
  progress: { level: string; lessonsDone: number; lastScore?: number };
};

function offline(q: string, b: Body) {
  const t = q.toLowerCase();
  const who = `${b.profile.niche} for ${b.profile.audience}`;
  if (t.includes("hook")) return `Three hooks for ${who}:\n1. “Stop doing this if you want … ”\n2. “3 … in under 5 minutes.”\n3. “As a ${b.profile.who.toLowerCase()}, I never …”\nPick one and test it on your AI audience.`;
  if (t.includes("plan") || t.includes("week")) return `Plan for next week (${who}):\nMon · Reel: bust one myth\nWed · Carousel: 5 quick tips\nFri · Reel: answer a real question from comments\nSun · Stories: poll + behind the scenes`;
  if (t.includes("idea")) return `5 ideas for ${who}:\n1. The mistake I see every week\n2. What I would do if I started today\n3. 3 tools I use daily\n4. Myth vs fact\n5. A client story in 30 seconds`;
  return `For ${who}: keep one idea per video, name your viewer in the first line and end with one clear action. What exactly do you want to post next?`;
}

export async function POST(req: Request) {
  const b = (await req.json()) as Body;
  const msgs = (b.messages || []).slice(-16);
  const last = msgs[msgs.length - 1]?.text || "";
  if (!last.trim()) return Response.json({ error: "Empty message" }, { status: 400 });
  if (!hasGemini()) return Response.json({ text: offline(last, b), engine: "offline" });

  const system = `You are the AI coach inside Aura, a gamified personal-brand trainer.
You know this creator: ${b.profile.who}, niche: ${b.profile.niche}, audience: ${b.profile.audience}, platforms: ${b.profile.platforms}, goal: ${b.profile.goal || "get clients"}, camera comfort: ${b.profile.camera || "unknown"}.
Progress: level ${b.progress?.level || "Noob"}, ${b.progress?.lessonsDone ?? 0} lessons done${b.progress?.lastScore != null ? `, last AI audience score ${b.progress.lastScore}/10` : ""}.
Rules: be concrete and short (under 120 words unless asked for a list or a plan). Use their niche and audience in every answer. Give ready-to-use hooks, scripts and plans. Plain text, no markdown headers. Answer in the language the user writes in.
You do not set up ads or log into accounts. Targeting is explained as theory only.`;
  try {
    const text = await gemini(system, msgs);
    return Response.json({ text, engine: "gemini" });
  } catch (e) {
    console.error("coach", e);
    return Response.json({ text: offline(last, b), engine: "offline" });
  }
}
