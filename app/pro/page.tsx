"use client";
import Link from "next/link";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Avatar from "@/components/Avatar";
import { useAura } from "@/lib/store";

export default function Pro() {
  const { state, ready, update } = useAura();
  const [paying, setPaying] = useState(false);
  const start = () => { setPaying(true); setTimeout(() => { update((s) => ({ ...s, pro: true })); setPaying(false); }, 1000); };
  return (
    <div className="page" style={{ background: "var(--ink)" }}>
      <AppHeader />
      <div className="wrap" style={{ color: "#fff" }}>
        <section style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between", padding: "24px 8px" }}>
          <div style={{ flex: "1 1 480px", display: "flex", flexDirection: "column", gap: 14 }}>
            <span className="pill" style={{ alignSelf: "flex-start", background: "var(--yellow)" }}>{state.pro ? "Welcome to Pro" : "Free until Beginner"}</span>
            <h1 style={{ fontSize: "clamp(44px, 6vw, 68px)", lineHeight: 0.95 }}>{state.pro ? "Blocks 2–7 unlocked" : "Keep leveling up"}</h1>
            <p style={{ color: "#D9D6E8", fontSize: 18, lineHeight: 1.5, maxWidth: 560 }}>Pro opens content creation, filming, platforms, growth, brand building and the real launch, plus the AI coach and reach tracking.</p>
          </div>
          {ready && <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}><Avatar stage="beginner" size={120} /><span style={{ fontSize: 32, color: "var(--yellow)" }}>→</span><Avatar stage="pro" size={200} /></div>}
        </section>
        <div className="row" style={{ alignItems: "stretch" }}>
          <div className="card" style={{ flex: "1 1 320px", background: "#2A2633", color: "#fff" }}>
            <b>Free</b><span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 44 }}>$0</span>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, color: "#D9D6E8" }}><li>Quiz and avatar</li><li>Block 1: Foundation, 4 lessons</li><li>AI audience on every task</li><li>3 lives</li></ul>
          </div>
          <div className="card" style={{ flex: "1 1 420px", border: "4px solid var(--yellow)" }}>
            <b style={{ color: "var(--violet)" }}>Pro · most popular</b><span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 44 }}>$12<small style={{ fontSize: 18 }}>/mo</small></span>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}><li>All 7 blocks, 24 lessons</li><li>AI coach that knows your niche</li><li>Trends and reach tracking on 3 platforms</li><li>1 free life refill and 2 streak freezes a month</li></ul>
            {state.pro
              ? <Link href="/course" className="btn" style={{ background: "var(--green)", color: "var(--ink)" }}>You’re Pro ✓ Continue</Link>
              : <button type="button" className="btn" onClick={start} disabled={paying}>{paying ? "Processing demo payment…" : "Start Pro · $12/mo"}</button>}
            <span className="small muted">Demo checkout for the hackathon: no card is charged. Stripe goes here in production.</span>
          </div>
        </div>
        <section className="card" style={{ background: "#2A2633", color: "#fff" }}>
          <h2>Add-ons</h2>
          <div className="grid3">
            <Link href="/lives" className="card" style={{ textDecoration: "none" }}><b>Refill lives · $4.99</b><span className="small muted">All 3 lives back now.</span></Link>
            <Link href="/lives" className="card" style={{ textDecoration: "none" }}><b>Streak Freeze · $1.99</b><span className="small muted">Skip a day, keep the streak.</span></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
