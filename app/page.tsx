"use client";
import Link from "next/link";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import Hearts from "@/components/Hearts";
import { BLOCKS, LEVELS } from "@/lib/course";

const MENUS = [
  { id: "product", label: "Product", items: [
    { t: "How it works", d: "Quiz, course, AI exam, launch", href: "#how" },
    { t: "The course", d: "7 blocks, 24 lessons", href: "#course" },
    { t: "Trends", d: "What’s hot in your niche", href: "/trends" },
    { t: "AI coach", d: "Ask anything, any time", href: "/coach" },
  ] },
  { id: "who", label: "Who it’s for", items: [
    { t: "Experts", d: "Nutritionists, coaches, therapists", href: "#who" },
    { t: "Freelancers", d: "Designers, developers, writers", href: "#who" },
    { t: "Local business", d: "Cafés, salons, studios", href: "#who" },
  ] },
  { id: "levels", label: "Avatar & levels", items: [
    { t: "Pick your avatar", d: "4 characters or your photo", href: "/avatar" },
    { t: "All 7 levels", d: "From Noob to Pro", href: "#levels" },
  ] },
];

const FAQ = [
  ["Do I need to be on camera?", "No. Block 3 teaches faceless formats too: B-roll, voiceover, carousels."],
  ["What is the AI audience?", "Five AI viewers built from your quiz (a future client, a beginner, an expert, a skeptic and a hater) score every task. 6/10 or more to pass."],
  ["What happens when I lose all lives?", "Your avatar rests. Each life comes back 7 days after you lost it, or you refill now."],
  ["Which platforms?", "Instagram Reels, TikTok and YouTube Shorts. YouTube stats load from a link, Instagram and TikTok numbers you add yourself."],
  ["Do I need an account?", "No sign-up. Your answers, avatar and progress are saved in this browser."],
  ["Is my photo uploaded?", "No. If you use your photo as an avatar, it stays in your browser."],
];

export default function Landing() {
  const [menu, setMenu] = useState<string | null>(null);
  const [faq, setFaq] = useState(1);
  return (
    <div className="page" onClick={() => setMenu(null)}>
      <div className="wrap">
        <header style={{ position: "relative", zIndex: 5, background: "#fff", borderRadius: 20, padding: "14px 20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Link href="/" aria-label="Aura home" style={{ display: "flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="aura." style={{ height: 34, width: "auto" }} />
          </Link>
          <nav aria-label="Main" style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            {MENUS.map((m) => (
              <div key={m.id} style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
                <button type="button" aria-expanded={menu === m.id} onClick={() => setMenu(menu === m.id ? null : m.id)}
                  style={{ minHeight: 44, border: "none", background: menu === m.id ? "var(--lilac)" : "transparent", padding: "10px 14px", borderRadius: 999, fontSize: 15, fontWeight: 500 }}>
                  {m.label} ▾
                </button>
                {menu === m.id && (
                  <div className="fade-in" style={{ position: "absolute", top: 52, left: 0, width: 280, background: "#fff", borderRadius: 18, boxShadow: "0 18px 40px rgba(18,18,18,.16)", padding: 8, display: "flex", flexDirection: "column" }}>
                    {m.items.map((it) => (
                      <Link key={it.t} href={it.href} onClick={() => setMenu(null)} style={{ textDecoration: "none", padding: "12px 14px", borderRadius: 12 }}>
                        <div style={{ fontWeight: 600 }}>{it.t}</div>
                        <div className="small muted">{it.d}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#pricing" style={{ textDecoration: "none", padding: "10px 14px", fontSize: 15 }}>Pricing</a>
            <a href="#faq" style={{ textDecoration: "none", padding: "10px 14px", fontSize: 15 }}>FAQ</a>
          </nav>
          <Link href="/quiz" className="btn">Start free</Link>
        </header>

        <section style={{ background: "var(--pink)", borderRadius: 28, padding: "56px 48px", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 520px", display: "flex", flexDirection: "column", gap: 22, minWidth: 0 }}>
            <span className="pill" style={{ alignSelf: "flex-start", background: "rgba(255,255,255,.7)", letterSpacing: ".06em", textTransform: "uppercase", fontSize: 12 }}>Aurafarm. Be extra.</span>
            <h1 style={{ fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 0.95, fontWeight: 800 }}>Build a personal brand that brings you clients</h1>
            <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: 540 }}>Aura turns personal branding into a game. Learn niche, hooks, filming and growth step by step, test every task on an AI audience, and level up your avatar from Noob to Pro.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/quiz" className="btn">Create my avatar</Link>
              <a href="#how" className="btn white">How it works</a>
            </div>
            <p className="small">No sign-up. Block 1 is free.</p>
          </div>
          <div className="card" style={{ flex: "0 1 400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <b>Your avatar today</b><Hearts n={3} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}><Avatar stage="noob" preset="leo" photo="" size={240} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><b>Level 1 · Noob</b><span>0 XP</span></div>
            <div className="bar"><i style={{ width: "8%" }} /></div>
          </div>
        </section>

        <section id="how" className="card violet" style={{ padding: "56px 48px", gap: 32, borderRadius: 28 }}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <span className="eyebrow">How it works</span>
            <h2 style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>From zero to a working brand in 4 steps</h2>
          </div>
          <div className="grid3">
            {[
              ["1", "Take the quiz", "Who you are, your niche, your dream audience. Two minutes.", "/quiz", "var(--pink)"],
              ["2", "Learn and do", "Short theory, video links, then a real task for your niche.", "/course", "var(--yellow)"],
              ["3", "Pass the AI exam", "Five AI viewers score your task. 6/10 to pass, fail and lose a life.", "/course", "var(--green)"],
              ["4", "Launch for real", "Post on Instagram, TikTok, YouTube and track real numbers.", "/results", "var(--blue)"],
            ].map(([n, t, d, href, c]) => (
              <Link key={n} href={href} className="card" style={{ textDecoration: "none", color: "var(--ink)" }}>
                <span style={{ width: 56, height: 56, borderRadius: 16, background: c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter Tight", fontWeight: 800, fontSize: 26 }}>{n}</span>
                <h3 style={{ fontSize: 22 }}>{t}</h3>
                <p style={{ lineHeight: 1.5 }}>{d}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="course" className="card" style={{ padding: "48px", borderRadius: 28, gap: 24 }}>
          <span className="eyebrow">The course</span>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>7 blocks, 24 lessons, one real launch</h2>
          <div className="grid3">
            {BLOCKS.map((b) => (
              <div key={b.n} style={{ background: "var(--soft)", borderRadius: 18, padding: 18, display: "flex", flexDirection: "column", gap: 8, borderTop: `6px solid ${b.color}` }}>
                <span className="small muted">Block {b.n} · {b.lessons.length} lessons{b.n > 1 ? " · Pro" : " · Free"}</span>
                <b style={{ fontSize: 18 }}>{b.title}</b>
                <span className="small">{b.goal}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="levels" className="card" style={{ padding: "48px", borderRadius: 28, gap: 24 }}>
          <span className="eyebrow">Your avatar grows with you</span>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>Noob today. Pro after 7 blocks.</h2>
          <div className="grid3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
            {LEVELS.map((l) => (
              <div key={l.n} style={{ background: l.n === 7 ? "var(--ink)" : "var(--soft)", color: l.n === 7 ? "#fff" : "var(--ink)", borderRadius: 18, padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                <Avatar stage={l.stage} preset="mia" photo="" size={120} />
                <span className="small" style={{ fontWeight: 600, color: l.n === 7 ? "var(--yellow)" : "var(--violet)" }}>LEVEL {l.n}</span>
                <b>{l.name}</b>
              </div>
            ))}
          </div>
        </section>

        <section id="who" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", textAlign: "center", paddingTop: 20 }}>Made for people with real work</h2>
          <div className="grid3">
            {[
              ["Experts", "Nutritionists, coaches, therapists", "“I’m an expert, but nobody knows me.”", "var(--pink)"],
              ["Freelancers", "Designers, developers, writers", "“I’m good at my job, but I can’t sell myself.”", "var(--blue)"],
              ["Local business", "Cafés, salons, studios", "“No time for content.”", "var(--green)"],
            ].map(([k, t, q, c]) => (
              <Link key={k} href="/quiz" style={{ textDecoration: "none", background: c, borderRadius: 24, padding: 28, minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>
                <span className="small" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{k}</span>
                <h3 style={{ fontSize: 26 }}>{t}</h3>
                <p>{q}</p>
                <b>Start →</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="row" style={{ alignItems: "stretch" }}>
          <div className="card grow" style={{ padding: 40 }}>
            <span className="eyebrow">The rules</span>
            <h2 style={{ fontSize: 40 }}>3 lives. Real stakes.</h2>
            <Hearts n={3} size={40} />
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7 }}>
              <li>Score under 6/10 on the AI exam: lose a life</li>
              <li>Each life comes back 7 days later, or refill now</li>
              <li>Keep your streak alive with a Streak Freeze</li>
            </ul>
          </div>
          <div className="card violet grow" style={{ padding: 40 }}>
            <h2 style={{ fontSize: 40 }}>Not another course</h2>
            <div className="grid2">
              <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 18, padding: 18, lineHeight: 1.9 }}><b>Online courses</b><br />✕ Watch videos<br />✕ Same plan for all<br />✕ No feedback<br />✕ Easy to quit</div>
              <div style={{ background: "#fff", color: "var(--ink)", borderRadius: 18, padding: 18, lineHeight: 1.9 }}><b style={{ color: "var(--violet)" }}>Aura</b><br />✓ Do real tasks<br />✓ Plan for your niche<br />✓ AI audience reacts<br />✓ Lives and streaks</div>
            </div>
          </div>
        </section>

        <section id="pricing" className="card" style={{ padding: 48, borderRadius: 28, gap: 28 }}>
          <h2 style={{ fontSize: 48, textAlign: "center" }}>Simple pricing</h2>
          <div className="grid3">
            <div style={{ background: "var(--soft)", borderRadius: 22, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              <b>Free</b><span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 44 }}>$0</span>
              <p>Quiz, avatar, Block 1 with AI exams. 3 lives.</p>
              <Link href="/quiz" className="btn white" style={{ marginTop: "auto" }}>Start free</Link>
            </div>
            <div style={{ background: "var(--ink)", color: "#fff", borderRadius: 22, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              <b style={{ color: "var(--yellow)" }}>Pro · most popular</b><span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 44 }}>$12<small style={{ fontSize: 18 }}>/mo</small></span>
              <p>All 7 blocks, AI coach, trends, reach tracking.</p>
              <Link href="/pro" className="btn yellow" style={{ marginTop: "auto" }}>Go Pro</Link>
            </div>
            <div style={{ background: "var(--soft)", borderRadius: 22, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              <b>Add-ons</b><span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 44 }}>$1.99+</span>
              <p>Refill lives $4.99 · Streak Freeze $1.99</p>
              <Link href="/pro" className="btn white" style={{ marginTop: "auto" }}>See details</Link>
            </div>
          </div>
        </section>

        <section id="faq" className="card violet" style={{ padding: 48, borderRadius: 28, gap: 24 }}>
          <h2 style={{ fontSize: 48, textAlign: "center" }}>Questions</h2>
          <div className="grid2" style={{ alignItems: "start" }}>
            {FAQ.map(([q, a], i) => (
              <div key={q} style={{ background: "#fff", color: "var(--ink)", borderRadius: 20 }}>
                <button type="button" aria-expanded={faq === i} onClick={() => setFaq(faq === i ? -1 : i)} style={{ width: "100%", border: "none", background: "transparent", padding: "20px 22px", display: "flex", justifyContent: "space-between", gap: 12, textAlign: "left" }}>
                  <b style={{ fontFamily: "Inter Tight", fontSize: 18 }}>{q}</b><span aria-hidden="true">{faq === i ? "−" : "+"}</span>
                </button>
                {faq === i && <p style={{ padding: "0 22px 22px", lineHeight: 1.5 }}>{a}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="card dark" style={{ padding: 48, borderRadius: 28, flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <div style={{ flex: "1 1 460px", display: "flex", flexDirection: "column", gap: 16 }}>
            <span className="eyebrow">Aurafarm. Be extra.</span>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 60px)", lineHeight: 0.98 }}>Ready to meet your avatar?</h2>
            <p style={{ color: "#D9D6E8" }}>Answer 8 quick questions. Get your personal course in 2 minutes.</p>
            <Link href="/quiz" className="btn white" style={{ alignSelf: "flex-start" }}>Start the quiz</Link>
          </div>
          <Avatar stage="pro" preset="zoe" photo="" size={260} />
        </section>

        <footer style={{ background: "var(--ink)", color: "#fff", borderRadius: 28, padding: "40px 48px", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.png" alt="aura." style={{ width: "min(560px, 100%)", height: "auto" }} />
          <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 32, color: "var(--yellow)" }}>Aurafarm. Be extra.</span>
        </footer>
      </div>
    </div>
  );
}
