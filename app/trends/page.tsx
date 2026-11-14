"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import CoachFab from "@/components/CoachFab";
import { TRENDS } from "@/lib/trends";
import { profileSummary, useAura } from "@/lib/store";

type Short = { id: string; title: string; channel: string; thumb: string; views: number; likes: number; url: string };
const NICHE_KEYS: [string, string][] = [["nutrition", "Nutrition"], ["fitness", "Fitness"], ["beauty", "Beauty"], ["food", "Food & café"], ["general", "Any niche"]];

export default function Trends() {
  const { state, ready, update } = useAura();
  const [niche, setNiche] = useState<string>("");
  const [platform, setPlatform] = useState("All");
  const [shorts, setShorts] = useState<Short[]>([]);
  const [live, setLive] = useState<boolean | null>(null);
  const key = niche || (TRENDS[state.answers.niche || ""] ? state.answers.niche! : "general");
  const t = TRENDS[key];

  useEffect(() => {
    if (!ready) return;
    setLive(null);
    fetch(`/api/trends?q=${encodeURIComponent(t.keyword)}`).then((r) => r.json()).then((d) => { setShorts(d.items || []); setLive(!!d.live); }).catch(() => setLive(false));
  }, [ready, t.keyword]);

  const toggleSave = (id: string) => update((s) => ({ ...s, saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] }));
  const fmt = (n: number) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "K" : String(n);
  const p = profileSummary(state);

  return (
    <div className="page">
      <AppHeader />
      <section className="wrap card dark" style={{ padding: 36, borderRadius: 28 }}>
        <span className="pill" style={{ alignSelf: "flex-start", background: "var(--yellow)", color: "var(--ink)" }}>Trending this week</span>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 0.98 }}>What’s hot in your niche right now</h1>
        <p style={{ color: "#D9D6E8" }}>For {p.audience.toLowerCase()}. Save an idea or ask the coach to turn it into a script.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {NICHE_KEYS.map(([k, l]) => (
            <button key={k} type="button" aria-pressed={key === k} onClick={() => setNiche(k)} className="pill" style={{ border: `2px solid ${key === k ? "var(--yellow)" : "rgba(255,255,255,.3)"}`, background: "transparent", color: "#fff", minHeight: 40 }}>{l}</button>
          ))}
          <span style={{ width: 16 }} />
          {["All", "TikTok", "Instagram", "YouTube"].map((x) => (
            <button key={x} type="button" aria-pressed={platform === x} onClick={() => setPlatform(x)} className="pill" style={{ background: platform === x ? "#fff" : "rgba(255,255,255,.12)", color: platform === x ? "var(--ink)" : "#fff", border: "none", minHeight: 40 }}>{x}</button>
          ))}
        </div>
      </section>

      <div className="wrap row">
        <main className="grow" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <section className="card">
            <h2 style={{ fontSize: 24 }}>Rising formats</h2>
            <div className="grid2">
              {t.formats.filter((f) => platform === "All" || f[0] === platform).map(([where, name, growth, how], i) => {
                const id = `${key}:${name}`;
                const saved = state.saved.includes(id);
                return (
                  <div key={name} style={{ background: ["#E2E9FF", "#FFE3F1", "#E6F8D6", "#FFF6D1"][i % 4], borderRadius: 18, padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span className="pill" style={{ background: "#fff" }}>{where}</span><b style={{ color: "var(--green-ink)", fontSize: 18 }}>{growth}</b></div>
                    <b style={{ fontSize: 19, fontFamily: "Inter Tight" }}>{name}</b>
                    <span className="small" style={{ lineHeight: 1.5 }}>{how}</span>
                    <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                      <button type="button" className="btn white" style={{ flex: 1 }} aria-pressed={saved} onClick={() => toggleSave(id)}>{saved ? "Saved ✓" : "Save idea"}</button>
                      <Link className="btn" style={{ flex: 1 }} href={`/coach?q=${encodeURIComponent(`Write me a 25-second script in the "${name}" format for my niche.`)}`}>Make a script</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {(platform === "All" || platform === "YouTube") && (
            <section className="card">
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <h2 style={{ fontSize: 24 }}>Top Shorts this week</h2>
                <span className="small muted">{live ? `Live from YouTube · “${t.keyword}”` : live === false ? "Live data needs YOUTUBE_API_KEY" : "Loading…"}</span>
              </div>
              {shorts.length > 0 ? (
                <div className="grid3">
                  {shorts.slice(0, 8).map((s) => (
                    <a key={s.id} href={s.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {s.thumb && <img src={s.thumb} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 14 }} />}
                      <b className="small" style={{ lineHeight: 1.35 }}>{s.title}</b>
                      <span className="small muted">{s.channel} · {fmt(s.views)} views · {fmt(s.likes)} likes</span>
                    </a>
                  ))}
                </div>
              ) : live === false ? (
                <p className="small muted">Add a YouTube Data API key in Vercel to see real top Shorts here. Meanwhile, use the formats and hooks above.</p>
              ) : live ? <p className="small muted">No Shorts found this week for this keyword.</p> : null}
            </section>
          )}
        </main>

        <aside className="side" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <section className="card pink">
            <h2 style={{ fontSize: 22 }}>Hooks people use this week</h2>
            {t.hooks.map(([h, meta]) => (
              <div key={h} style={{ background: "#fff", borderRadius: 16, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                <b style={{ fontFamily: "Inter Tight", fontSize: 17 }}>“{h}”</b>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="small muted">{meta}</span>
                  <Link className="pill" style={{ background: "var(--lilac)", textDecoration: "none" }} href={`/coach?q=${encodeURIComponent(`Adapt this trending hook to my niche: "${h}"`)}`}>Adapt to me</Link>
                </div>
              </div>
            ))}
          </section>
          <section className="card">
            <h2 style={{ fontSize: 20 }}>Rising hashtags</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.tags.map(([tag, g]) => <span key={tag} className="pill">{tag} <span style={{ color: "var(--green-ink)" }}>{g}</span></span>)}
            </div>
            <p className="small muted" style={{ lineHeight: 1.5 }}>Instagram and TikTok trends are picked weekly by the Aura team. YouTube Shorts load live.</p>
          </section>
        </aside>
      </div>
      <CoachFab />
    </div>
  );
}
