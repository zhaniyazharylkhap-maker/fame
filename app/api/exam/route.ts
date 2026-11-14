import { findLesson, PASS_MARK } from "@/lib/course";
import { gemini, hasGemini, parseJson } from "@/lib/gemini";
import { offlineScore, type ExamResult } from "@/lib/exam";

type Body = {
  lessonId: string;
  answer: string;
  profile: { who: string; niche: string; audience: string; platforms: string; age?: string };
};

export async function POST(req: Request) {
  const body = (await req.json()) as Body;
  const lesson = findLesson(body.lessonId);
  const answer = (body.answer || "").slice(0, 4000);
  if (!lesson || !answer.trim()) return Response.json({ error: "Missing lesson or answer" }, { status: 400 });
  const minLines = Math.max(1, (lesson.placeholder.match(/\n/g) || []).length + 1);

  if (!hasGemini()) return Response.json(offlineScore(answer, minLines));

  const p = body.profile;
  const system = `You are the AI audience of Aura, a personal-brand trainer for US adults.
You simulate 5 viewers built from the creator's profile and judge their homework like real people scrolling a feed.
Creator: ${p.who}, niche: ${p.niche}. Target audience: ${p.audience}. Platforms: ${p.platforms}.
Viewers: 1) Future client (from the target audience) 2) Beginner 3) Expert in the niche 4) Skeptic 5) Hater who scrolls fast.
Be honest and specific. A generic, vague or greeting-first answer must score below ${PASS_MARK}. A specific, audience-focused answer that follows the rubric scores ${PASS_MARK} or more.
Reply ONLY with JSON:
{"score": number 0-10 with one decimal, "verdict": "one short sentence",
 "personas": [{"name": "Future client", "role": "short description", "reaction": "1-2 sentences in first person, casual", "stayed": true|false}, ... 5 items],
 "strengths": ["max 3 short points"], "fixes": ["max 3 short, concrete fixes"],
 "improved": "a rewritten, stronger version of the creator's answer, same format"}`;
  const prompt = `Lesson ${lesson.id}: ${lesson.title}
Task: ${lesson.task}
Rubric: ${lesson.rubric}
Creator's answer:
"""${answer}"""`;
  try {
    const out = parseJson<Omit<ExamResult, "engine">>(await gemini(system, [{ role: "user", text: prompt }], true));
    const score = Math.max(0, Math.min(10, Number(out.score) || 0));
    return Response.json({ ...out, score: Math.round(score * 10) / 10, engine: "gemini" } satisfies ExamResult);
  } catch (e) {
    console.error("exam", e);
    return Response.json(offlineScore(answer, minLines));
  }
}
