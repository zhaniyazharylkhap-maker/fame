"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import Avatar from "@/components/Avatar";
import { levelFromDone } from "@/lib/course";
import { profileSummary, useAura } from "@/lib/store";

const QUICK = ["Write 3 hooks for my next Reel", "Plan my next week of posts", "Give me 5 content ideas", "Why did my last post get few views?"];

function Chat() {
  const { state, ready, update } = useAura();
  const params = useSearchParams();
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const p = profileSummary(state);
  const level = levelFromDone(state.done);

  useEffect(() => { const q = params.get("q"); if (q) setDraft(q); }, [params]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [state.chat.length, busy]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    const msgs = [...state.chat, { role: "user" as const, text: t }];
    update((s) => ({ ...s, chat: msgs }));
    setDraft("");
    setBusy(true);
    try {
      const scores = Object.values(state.scores);
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs, profile: p, progress: { level: level.name, lessonsDone: state.done.length, lastScore: scores[scores.length - 1] } }),
      });
      const d = await res.json();
      setNote(d.engine === "offline" ? "Quick offline answers. Add GEMINI_API_KEY for the full AI coach." : "");
      update((s) => ({ ...s, chat: [...msgs, { role: "model", text: d.text || d.error || "Try again." }] }));
    } catch {
      update((s) => ({ ...s, chat: [...msgs, { role: "model", text: "Connection problem. Try again." }] }));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="wrap row" style={{ alignItems: "stretch" }}>
      <aside className="card violet side" style={{ maxWidth: 340 }}>
        <span className="eyebrow">Your AI coach knows</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[p.who, p.niche, p.audience, p.platforms, `Level ${level.n} · ${level.name}`, `${state.done.length} lessons done`].map((c) => (
            <span key={c} className="pill" style={{ background: "rgba(255,255,255,.16)", color: "#fff" }}>{c}</span>
          ))}
        </div>
        <p className="small" style={{ lineHeight: 1.5, color: "#E4E0FF" }}>Change these any time by retaking the quiz in Profile.</p>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {QUICK.map((q) => <button key={q} type="button" className="btn white" style={{ justifyContent: "flex-start", fontSize: 14 }} onClick={() => send(q)}>{q}</button>)}
          {state.chat.length > 0 && <button type="button" className="btn" style={{ background: "rgba(255,255,255,.16)" }} onClick={() => update((s) => ({ ...s, chat: [] }))}>Clear chat</button>}
        </div>
      </aside>
      <main className="card grow" style={{ minHeight: "70vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {ready && <Avatar stage="pro" preset="leo" photo="" size={52} alt="AI coach" />}
          <div><h1 style={{ fontSize: 24 }}>AI coach</h1><span className="small muted">Ask anything about your brand, any time</span></div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", minHeight: 300, padding: "8px 0" }} aria-live="polite">
          {ready && state.chat.length === 0 && (
            <div className="bubble ai">Hi! I know you work in {p.niche.toLowerCase()} for {p.audience.toLowerCase()}. Ask me for hooks, a script, a posting plan or why a post flopped.</div>
          )}
          {state.chat.map((m, i) => <div key={i} className={`bubble ${m.role === "user" ? "me" : "ai"}`}>{m.text}</div>)}
          {busy && <div className="bubble ai muted">Coach is typing…</div>}
          <div ref={endRef} />
        </div>
        {note && <span className="small muted">{note}</span>}
        <form onSubmit={(e) => { e.preventDefault(); send(draft); }} style={{ display: "flex", gap: 8 }}>
          <label style={{ flex: 1 }}><span className="sr-only">Message the AI coach</span>
            <input className="input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask anything about your brand" style={{ borderRadius: 999 }} />
          </label>
          <button type="submit" className="btn violet" disabled={busy || !draft.trim()}>Send</button>
        </form>
      </main>
    </div>
  );
}

export default function CoachPage() {
  return (
    <div className="page">
      <AppHeader />
      <Suspense fallback={null}><Chat /></Suspense>
    </div>
  );
}
