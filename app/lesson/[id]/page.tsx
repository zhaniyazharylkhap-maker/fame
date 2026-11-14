"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Avatar from "@/components/Avatar";
import CoachFab from "@/components/CoachFab";
import Hearts from "@/components/Hearts";
import { ALL_LESSONS, FREE_BLOCKS, PASS_MARK, findLesson, levelFromDone } from "@/lib/course";
import type { ExamResult } from "@/lib/exam";
import { bumpStreak, livesLeft, profileSummary, useAura } from "@/lib/store";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = findLesson(String(id));
  const { state, ready, update } = useAura();
  const [checked, setChecked] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [levelUp, setLevelUp] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (!lesson) {
    return (
      <div className="page"><AppHeader /><div className="wrap card"><h1>Lesson not found</h1><Link href="/course" className="btn">Back to course</Link></div></div>
    );
  }
  const idx = ALL_LESSONS.findIndex((l) => l.id === lesson.id);
  const nextLesson = ALL_LESSONS[idx + 1];
  const locked = lesson.block > FREE_BLOCKS && !state.pro;
  const lives = livesLeft(state);
  const draft = state.drafts[lesson.id] ?? "";
  const passed = result ? result.score >= PASS_MARK : false;

  async function runExam() {
    if (!lesson || !draft.trim() || lives === 0) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, answer: draft, profile: profileSummary(state) }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Exam failed");
      const r: ExamResult = await res.json();
      setResult(r);
      const before = levelFromDone(state.done);
      update((s) => {
        if (r.score >= PASS_MARK) {
          const done = s.done.includes(lesson.id) ? s.done : [...s.done, lesson.id];
          return { ...s, done, scores: { ...s.scores, [lesson.id]: r.score }, xp: s.xp + (s.done.includes(lesson.id) ? 10 : 80), streak: bumpStreak(s) };
        }
        return { ...s, livesLost: [...s.livesLost, Date.now()] };
      });
      if (r.score >= PASS_MARK) {
        const after = levelFromDone(state.done.includes(lesson.id) ? state.done : [...state.done, lesson.id]);
        if (after.n > before.n) setLevelUp(after.name);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <AppHeader />
      <div className="wrap" style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
        <Link href="/course" className="btn white">← Course</Link>
        <span style={{ fontWeight: 600 }}>Block {lesson.block} · Lesson {lesson.id} · {lesson.minutes} min</span>
        <span className="pill" style={{ background: "#fff" }}>Pass at {PASS_MARK}/10</span>
      </div>

      {locked ? (
        <div className="wrap card dark" style={{ padding: 40 }}>
          <span className="eyebrow">Pro lesson</span>
          <h1 style={{ fontSize: 40 }}>{lesson.title}</h1>
          <p style={{ color: "#D9D6E8" }}>Block 1 is free. Blocks 2–7 open with Pro.</p>
          <Link href="/pro" className="btn yellow" style={{ alignSelf: "flex-start" }}>Unlock with Pro</Link>
        </div>
      ) : (
        <div className="wrap row">
          <main className="grow" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <section className="card" style={{ padding: 36 }}>
              <span className="eyebrow">Lesson {lesson.id}</span>
              <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1 }}>{lesson.title}</h1>
              {lesson.theory.map((t, i) => <p key={i} style={{ fontSize: 17, lineHeight: 1.6 }}>{t}</p>)}
              <div style={{ background: "var(--yellow-soft)", borderRadius: 18, padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                <b>Key points</b>
                {lesson.keyPoints.map((k) => <span key={k}>✓ {k}</span>)}
              </div>
            </section>

            <section className="card">
              <b style={{ fontSize: 18 }}>Watch</b>
              <div className="grid3">
                {lesson.videos.map((v) => (
                  <a key={v.url} href={v.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "var(--ink)", color: "#fff", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 8, minHeight: 110, justifyContent: "space-between" }}>
                    <span style={{ fontSize: 22 }} aria-hidden="true">▶</span>
                    <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{v.title}</span>
                    <span className="small" style={{ color: "#D9D6E8" }}>Opens YouTube</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="card">
              <b style={{ fontSize: 18 }}>Practice</b>
              {lesson.practice.map((p, i) => (
                <label key={p} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 15 }}>
                  <input type="checkbox" checked={checked.includes(i)} onChange={() => setChecked(checked.includes(i) ? checked.filter((x) => x !== i) : [...checked, i])} style={{ width: 20, height: 20 }} />
                  {p}
                </label>
              ))}
            </section>

            <section className="card" style={{ border: "3px solid var(--violet)" }}>
              <span className="eyebrow">Your task · checked by the AI audience</span>
              <h2 style={{ fontSize: 24, lineHeight: 1.2 }}>{lesson.task}</h2>
              <details>
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>See an example</summary>
                <p style={{ whiteSpace: "pre-wrap", background: "var(--soft)", borderRadius: 14, padding: 14, marginTop: 8, lineHeight: 1.5 }}>{lesson.example}</p>
              </details>
              <label className="field">
                <span className="sr-only">Your answer</span>
                <textarea className="textarea" rows={6} value={draft} placeholder={lesson.placeholder}
                  onChange={(e) => update((s) => ({ ...s, drafts: { ...s.drafts, [lesson.id]: e.target.value } }))} />
              </label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                {ready && lives === 0 ? (
                  <Link href="/lives" className="btn" style={{ background: "var(--red)" }}>Out of lives · refill</Link>
                ) : (
                  <button type="button" className="btn violet" onClick={runExam} disabled={loading || !draft.trim()}>
                    {loading ? <><span className="spinner" /> 5 AI viewers are watching…</> : result ? "Retest with AI audience" : "Send to the AI audience"}
                  </button>
                )}
                <Link href={`/coach?q=${encodeURIComponent(`Help me with lesson ${lesson.id} (${lesson.title}): ${lesson.task}`)}`} className="btn light">Ask AI coach</Link>
                <span className="small muted" style={{ display: "flex", alignItems: "center", gap: 6 }}><Hearts n={lives} size={16} /> Fail = −1 life</span>
              </div>
              {error && <p style={{ color: "var(--red-ink)", fontWeight: 600 }}>{error}</p>}
            </section>

            {result && (
              <section className="card fade-in" style={{ background: passed ? "var(--green-soft)" : "var(--pink-soft)", padding: 30 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: "1 1 360px" }}>
                    <span className="pill" style={{ alignSelf: "flex-start", background: "var(--ink)", color: passed ? "var(--green)" : "var(--pink)" }}>
                      {passed ? "PASSED · +80 XP" : "NOT PASSED · −1 LIFE"}
                    </span>
                    <h2 style={{ fontSize: 32 }}>{result.verdict}</h2>
                    {result.engine === "offline" && <span className="small muted">Quick offline check. Add GEMINI_API_KEY for the full AI audience.</span>}
                  </div>
                  <div style={{ width: 140, height: 140, borderRadius: "50%", background: "#fff", border: "3px solid var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 48 }}>{result.score}</span>
                    <span className="small" style={{ fontWeight: 700 }}>PASS AT {PASS_MARK}</span>
                  </div>
                </div>
                <div className="grid2">
                  {result.personas.map((p) => (
                    <div key={p.name} style={{ background: "#fff", borderRadius: 16, padding: 14, display: "flex", flexDirection: "column", gap: 4 }}>
                      <span className="small" style={{ fontWeight: 700 }}>{p.name.toUpperCase()} · {p.stayed ? "WATCHED" : "SCROLLED"}</span>
                      <span className="small muted">{p.role}</span>
                      <span style={{ lineHeight: 1.45 }}>“{p.reaction}”</span>
                    </div>
                  ))}
                </div>
                <div className="grid2">
                  <div style={{ background: "#fff", borderRadius: 16, padding: 16 }}><b>What worked</b>{result.strengths.map((s) => <p key={s} className="small" style={{ marginTop: 6 }}>✓ {s}</p>)}</div>
                  <div style={{ background: "#fff", borderRadius: 16, padding: 16 }}><b>Fix this</b>{result.fixes.map((s) => <p key={s} className="small" style={{ marginTop: 6 }}>→ {s}</p>)}</div>
                </div>
                {result.improved && (
                  <div style={{ background: "var(--yellow-soft)", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    <b>Coach’s stronger version</b>
                    <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{result.improved}</p>
                    {!passed && <button type="button" className="btn light" style={{ alignSelf: "flex-start" }} onClick={() => update((s) => ({ ...s, drafts: { ...s.drafts, [lesson.id]: result.improved } }))}>Use it as a starting point</button>}
                  </div>
                )}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {passed && nextLesson && <Link href={`/lesson/${nextLesson.id}`} className="btn">Next lesson: {nextLesson.title}</Link>}
                  {passed && !nextLesson && <Link href="/results" className="btn">Go to your launch results</Link>}
                  {!passed && <button type="button" className="btn" onClick={() => { setResult(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Rewrite and retest</button>}
                  <Link href="/course" className="btn light">Back to course</Link>
                </div>
              </section>
            )}
          </main>

          <aside className="side" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="card violet" style={{ alignItems: "center", textAlign: "center" }}>
              {ready && <Avatar stage={result && !passed ? "sleep" : levelFromDone(state.done).stage} size={200} />}
              <b style={{ fontSize: 18 }}>{levelUp ? `Level up! You’re now ${levelUp}` : `Level ${levelFromDone(state.done).n} · ${levelFromDone(state.done).name}`}</b>
              <span className="small">Result of this lesson: {lesson.result}</span>
            </div>
            <div className="card">
              <b>Who checks your task</b>
              <span className="small muted" style={{ lineHeight: 1.5 }}>Five AI viewers built from your quiz: a future client from {profileSummary(state).audience}, a beginner, an expert in {profileSummary(state).niche.toLowerCase()}, a skeptic and a hater who scrolls fast.</span>
            </div>
          </aside>
        </div>
      )}
      <CoachFab q={`Help me with lesson ${lesson.id}: ${lesson.title}`} />
    </div>
  );
}
