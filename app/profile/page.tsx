"use client";
import Link from "next/link";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Avatar from "@/components/Avatar";
import { LEVELS, levelFromDone } from "@/lib/course";
import { profileSummary, resetAura, useAura } from "@/lib/store";

export default function Profile() {
  const { state, ready } = useAura();
  const [ask, setAsk] = useState(false);
  const [done, setDone] = useState(false);
  const level = levelFromDone(state.done);
  const p = profileSummary(state);
  const rows: [string, string][] = [["I am", p.who], ["Niche", p.niche], ["Audience", p.audience], ["Goal", p.goal], ["Platforms", p.platforms], ["Camera", p.camera]];
  return (
    <div className="page">
      <AppHeader />
      <div className="wrap row">
        <section className="card violet side" style={{ alignItems: "center", textAlign: "center" }}>
          {ready && <Avatar stage={level.stage} size={220} />}
          <h1 style={{ fontSize: 30, marginTop: 8 }}>{state.avatar.name || "My Aura"}</h1>
          <span className="pill" style={{ background: "var(--yellow)" }}>Level {level.n} · {level.name} · {state.pro ? "Pro" : "Free"}</span>
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <Link href="/avatar" className="btn white" style={{ flex: 1 }}>Change avatar</Link>
            {!state.pro && <Link href="/pro" className="btn" style={{ flex: 1 }}>Go Pro</Link>}
          </div>
        </section>
        <div className="grow" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <section className="card">
            <h2 style={{ fontSize: 22 }}>Your path to Pro</h2>
            <div className="grid3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))" }}>
              {LEVELS.map((l) => (
                <div key={l.n} style={{ borderRadius: 16, padding: 10, textAlign: "center", background: l.n === level.n ? "var(--lilac)" : l.n < level.n ? "var(--green-soft)" : "var(--soft)", border: l.n === level.n ? "2px solid var(--violet)" : "2px solid transparent", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <Avatar stage={l.stage} size={72} />
                  <b className="small">{l.n}. {l.name}</b>
                  <span className="small muted">{l.n < level.n ? "Done" : l.n === level.n ? "You are here" : ""}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 22 }}>Your quiz answers</h2>
              <Link href="/quiz" className="btn light">Retake quiz</Link>
            </div>
            <p className="small muted">The AI audience and AI coach use these answers.</p>
            <div className="grid2">
              {rows.map(([k, v]) => <div key={k} style={{ background: "var(--soft)", borderRadius: 14, padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 10 }}><span className="muted">{k}</span><b style={{ textAlign: "right" }}>{v}</b></div>)}
            </div>
          </section>
          <section className="card">
            <h2 style={{ fontSize: 22 }}>Your data</h2>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7 }}>
              <li>No account: answers, avatar and progress live in this browser.</li>
              <li>Your photo is never uploaded.</li>
              <li>Tasks you send to the AI audience are checked by Google Gemini and not stored by Aura.</li>
            </ul>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              {done ? <><b style={{ color: "var(--green-ink)" }}>Everything was deleted.</b><Link href="/quiz" className="btn">Start over</Link></>
                : ask ? <><span style={{ fontWeight: 600 }}>Delete everything in this browser?</span>
                    <button type="button" className="btn" style={{ background: "var(--red-ink)" }} onClick={() => { resetAura(); setAsk(false); setDone(true); }}>Yes, reset</button>
                    <button type="button" className="btn light" onClick={() => setAsk(false)}>Cancel</button></>
                : <button type="button" className="btn light" style={{ background: "var(--pink-soft)" }} onClick={() => setAsk(true)}>Reset my progress</button>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
