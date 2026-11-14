"use client";
import Link from "next/link";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Avatar from "@/components/Avatar";
import CoachFab from "@/components/CoachFab";
import { ALL_LESSONS, BLOCKS, FREE_BLOCKS, LEVELS, levelFromDone } from "@/lib/course";
import { profileSummary, useAura } from "@/lib/store";

export default function Course() {
  const { state, ready } = useAura();
  const level = levelFromDone(state.done);
  const next = ALL_LESSONS.find((l) => !state.done.includes(l.id));
  const [open, setOpen] = useState<number | null>(null);
  const openBlock = open ?? (next?.block || 1);
  const p = profileSummary(state);
  const scores = Object.values(state.scores);
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "–";
  const nextLevel = LEVELS[Math.min(level.n, 6)];
  const blockOfNext = BLOCKS.find((b) => b.n === (next?.block || 1));
  const leftInBlock = blockOfNext ? blockOfNext.lessons.filter((l) => !state.done.includes(l.id)).length : 0;

  return (
    <div className="page">
      <AppHeader />
      <div className="wrap row">
        <aside className="card violet side" style={{ maxWidth: 320 }}>
          <span className="eyebrow">{state.avatar.name || "My Aura"}</span>
          <div style={{ display: "flex", justifyContent: "center", background: "rgba(255,255,255,.14)", borderRadius: 18, padding: 14 }}>
            {ready && <Avatar stage={level.stage} size={200} />}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h2 style={{ fontSize: 26 }}>{level.name}</h2><span className="small">Level {level.n} of 7</span></div>
          <div className="bar" style={{ background: "rgba(255,255,255,.2)" }}><i style={{ width: `${(state.done.length / ALL_LESSONS.length) * 100}%`, background: "var(--yellow)" }} /></div>
          {level.n < 7 && <span className="small">{leftInBlock} lessons to {nextLevel.name}</span>}
          <div style={{ background: "#fff", color: "var(--ink)", borderRadius: 18, padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
            <div><b style={{ fontSize: 22, fontFamily: "Inter Tight" }}>{state.done.length}</b><br />Lessons passed</div>
            <div><b style={{ fontSize: 22, fontFamily: "Inter Tight" }}>{avg}</b><br />Avg AI score</div>
            <div><b style={{ fontSize: 22, fontFamily: "Inter Tight" }}>{state.streak.count}</b><br />Day streak</div>
            <div><b style={{ fontSize: 22, fontFamily: "Inter Tight" }}>{state.xp}</b><br />XP</div>
          </div>
          <Link href="/avatar" className="btn white">Edit avatar</Link>
        </aside>

        <main className="card grow" style={{ padding: 30 }}>
          <span className="eyebrow">Your challenge course · {p.niche}</span>
          <h1 style={{ fontSize: "clamp(30px, 3.4vw, 40px)" }}>From Noob to Pro in 7 blocks</h1>
          {!state.quizDone && ready && (
            <Link href="/quiz" className="pill" style={{ background: "var(--yellow-soft)", alignSelf: "flex-start", textDecoration: "none" }}>Take the 2-minute quiz so the AI audience knows your niche →</Link>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {BLOCKS.map((b) => {
              const locked = b.n > FREE_BLOCKS && !state.pro;
              const doneCount = b.lessons.filter((l) => state.done.includes(l.id)).length;
              const complete = doneCount === b.lessons.length;
              const isOpen = openBlock === b.n;
              return (
                <div key={b.n} style={{ borderRadius: 18, background: complete ? "var(--green-soft)" : isOpen ? "var(--lilac)" : "var(--soft)", border: isOpen ? "2px solid var(--violet)" : "2px solid transparent" }}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? 0 : b.n)} style={{ width: "100%", border: "none", background: "transparent", display: "flex", alignItems: "center", gap: 16, padding: 16, textAlign: "left" }}>
                    <span style={{ width: 44, height: 44, flex: "none", borderRadius: 14, background: complete ? "var(--green-ink)" : locked ? "#ECEAF3" : b.color, color: complete ? "#fff" : "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                      {complete ? "✓" : locked ? "🔒" : b.n}
                    </span>
                    <span style={{ flex: 1 }}>
                      <b style={{ fontSize: 17 }}>{b.n}. {b.title}</b><br />
                      <span className="small muted">{b.goal} · {doneCount}/{b.lessons.length} done</span>
                    </span>
                    {locked && <span className="pill" style={{ background: "var(--ink)", color: "var(--yellow)" }}>PRO</span>}
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 16px 16px 76px", display: "flex", flexDirection: "column", gap: 8 }}>
                      {locked && (
                        <Link href="/pro" className="pill" style={{ background: "var(--yellow)", textDecoration: "none", alignSelf: "flex-start" }}>Free until Beginner. Unlock with Pro →</Link>
                      )}
                      {b.lessons.map((l) => {
                        const d = state.done.includes(l.id);
                        const isNext = next?.id === l.id;
                        return (
                          <Link key={l.id} href={locked ? "/pro" : `/lesson/${l.id}`} style={{ textDecoration: "none", display: "flex", justifyContent: "space-between", gap: 10, background: "#fff", borderRadius: 12, padding: "12px 14px", fontSize: 15, border: isNext && !locked ? "2px solid var(--pink)" : "2px solid transparent" }}>
                            <span><b style={{ color: d ? "var(--green-ink)" : "var(--muted)" }}>{d ? "✓" : l.id}</b>&nbsp; {l.title}</span>
                            <span className="small muted">{d ? `${state.scores[l.id] ?? ""}/10` : isNext ? "Up next" : `${l.minutes} min`}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>

        <aside className="side" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {next ? (
            <div className="card pink">
              <span className="eyebrow" style={{ color: "var(--ink)" }}>Up next · Lesson {next.id}</span>
              <h2 style={{ fontSize: 28, lineHeight: 1.05 }}>{next.title}</h2>
              <p style={{ lineHeight: 1.5 }}>{next.task}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="pill" style={{ background: "rgba(255,255,255,.7)" }}>+80 XP</span>
                <span className="pill" style={{ background: "rgba(255,255,255,.7)" }}>Pass at 6/10</span>
                <span className="pill" style={{ background: "rgba(255,255,255,.7)" }}>Fail = −1 life</span>
              </div>
              <Link href={next.block > FREE_BLOCKS && !state.pro ? "/pro" : `/lesson/${next.id}`} className="btn">Start lesson</Link>
            </div>
          ) : (
            <div className="card pink"><h2>All 24 lessons done</h2><p>You are a Pro. Track your launch in Results.</p><Link href="/results" className="btn">Open results</Link></div>
          )}
          <Link href="/trends" className="card" style={{ textDecoration: "none" }}>
            <b style={{ fontSize: 17 }}>Trending in your niche →</b>
            <span className="small muted">Top Shorts this week, formats and hooks</span>
          </Link>
          {!state.pro && (
            <div className="card dark">
              <b style={{ fontSize: 17 }}>Blocks 2–7 are Pro</b>
              <p className="small" style={{ color: "#D9D6E8", lineHeight: 1.5 }}>Keep going after Beginner for $12/mo. Includes the AI coach and reach tracking.</p>
              <Link href="/pro" className="btn yellow">See Pro</Link>
            </div>
          )}
        </aside>
      </div>
      <CoachFab />
    </div>
  );
}
