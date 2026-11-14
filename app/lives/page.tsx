"use client";
import Link from "next/link";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import Hearts from "@/components/Hearts";
import { livesLeft, nextLifeIn, useAura } from "@/lib/store";

export default function Lives() {
  const { state, ready, update } = useAura();
  const [paying, setPaying] = useState(false);
  const lives = livesLeft(state);
  const next = nextLifeIn(state);
  const empty = lives === 0;
  const refill = () => {
    setPaying(true);
    setTimeout(() => { update((s) => ({ ...s, livesLost: [] })); setPaying(false); }, 900);
  };
  return (
    <div className="page" style={{ background: empty ? "var(--pink)" : "var(--green)", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ maxWidth: 1080, width: "100%", padding: 48, flexDirection: "row", flexWrap: "wrap", gap: 40, alignItems: "center", borderRadius: 32 }}>
        <div style={{ flex: "0 1 360px", background: "var(--lilac)", borderRadius: 26, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          {ready && <Avatar stage={empty ? "sleep" : "beginner"} size={280} />}
          <b>{state.avatar.name || "My Aura"} {empty ? "is resting" : "is ready"}</b>
        </div>
        <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 20 }}>
          <Hearts n={lives} size={40} />
          <h1 style={{ fontSize: "clamp(40px, 5vw, 60px)", lineHeight: 0.98 }}>{empty ? "Out of lives" : `${lives} of 3 lives`}</h1>
          <p className="muted" style={{ fontSize: 18 }}>
            {next ? <>Next life comes back in <b style={{ color: "var(--ink)" }}>{next}</b>. Your streak and XP are safe.</> : "All lives are full. Go pass a lesson."}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {lives < 3 && <button type="button" className="btn" onClick={refill} disabled={paying}>{paying ? "Processing demo payment…" : "Refill 3 lives · $4.99"}</button>}
            <Link href="/course" className="btn light">{empty ? "Wait, it’s free" : "Back to course"}</Link>
          </div>
          {lives < 3 && <span className="small muted">Demo checkout for the hackathon: no card is charged.</span>}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, background: "var(--yellow-soft)", borderRadius: 18, padding: "14px 16px" }}>
            <span>🔥 {state.streak.count}-day streak · {state.freezes} Streak Freeze left</span>
            {state.freezes > 0 && <button type="button" className="btn" onClick={() => update((s) => ({ ...s, freezes: s.freezes - 1, streak: { ...s.streak, last: new Date().toISOString().slice(0, 10) } }))}>Use a freeze today</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
