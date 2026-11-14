"use client";
import Link from "next/link";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import CoachFab from "@/components/CoachFab";
import { useAura, type Post } from "@/lib/store";

const PL: Record<Post["platform"], [string, string, string]> = { instagram: ["Instagram", "#FF8FCF", "#121212"], tiktok: ["TikTok", "#121212", "#FFFFFF"], youtube: ["YouTube", "#FF3B7F", "#FFFFFF"] };
const fmt = (n: number) => n.toLocaleString("en-US");

export default function Results() {
  const { state, update } = useAura();
  const [filter, setFilter] = useState<"all" | Post["platform"]>("all");
  const [yt, setYt] = useState("");
  const [ytMsg, setYtMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ platform: "instagram" as Post["platform"], title: "", views: "", likes: "" });

  const posts = state.posts.filter((p) => filter === "all" || p.platform === filter);
  const views = posts.reduce((a, p) => a + p.views, 0);
  const likes = posts.reduce((a, p) => a + p.likes, 0);
  const max = Math.max(1, ...posts.map((p) => p.views));
  const add = (p: Omit<Post, "id" | "date">) => update((s) => ({ ...s, posts: [...s.posts, { ...p, id: crypto.randomUUID(), date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) }] }));

  async function fetchYt() {
    if (!yt.trim()) return;
    setLoading(true); setYtMsg("");
    try {
      const r = await fetch(`/api/youtube?url=${encodeURIComponent(yt)}`);
      const d = await r.json();
      if (!r.ok) { setYtMsg(d.error || "Could not load stats."); return; }
      add({ title: d.title, platform: "youtube", views: d.views, likes: d.likes, source: "youtube-api" });
      setYt(""); setYtMsg(`Added: ${fmt(d.views)} views, ${fmt(d.likes)} likes.`);
    } catch { setYtMsg("Could not reach YouTube. Try again."); } finally { setLoading(false); }
  }

  return (
    <div className="page">
      <AppHeader />
      <div className="wrap">
        <section className="card" style={{ padding: 30 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
            <div><span className="eyebrow">Your results</span><h1 style={{ fontSize: "clamp(30px, 4vw, 40px)" }}>How your posts really did</h1></div>
            <div style={{ display: "flex", gap: 6, background: "var(--soft)", padding: 5, borderRadius: 999 }} role="group" aria-label="Platform filter">
              {(["all", "instagram", "tiktok", "youtube"] as const).map((k) => (
                <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)} style={{ border: "none", minHeight: 40, padding: "0 16px", borderRadius: 999, fontWeight: 600, fontSize: 14, background: filter === k ? "var(--ink)" : "transparent", color: filter === k ? "#fff" : "var(--ink)" }}>
                  {k === "all" ? "All" : PL[k][0]}
                </button>
              ))}
            </div>
          </div>
          <div className="grid3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <div style={{ background: "var(--lilac)", borderRadius: 18, padding: 18 }}><span className="small">Views</span><br /><b style={{ fontFamily: "Inter Tight", fontSize: 32 }}>{fmt(views)}</b></div>
            <div style={{ background: "var(--pink-soft)", borderRadius: 18, padding: 18 }}><span className="small">Likes</span><br /><b style={{ fontFamily: "Inter Tight", fontSize: 32 }}>{fmt(likes)}</b></div>
            <div style={{ background: "var(--green-soft)", borderRadius: 18, padding: 18 }}><span className="small">Like rate</span><br /><b style={{ fontFamily: "Inter Tight", fontSize: 32 }}>{views ? ((likes / views) * 100).toFixed(1) + "%" : "–"}</b></div>
            <div style={{ background: "var(--yellow-soft)", borderRadius: 18, padding: 18 }}><span className="small">Posts tracked</span><br /><b style={{ fontFamily: "Inter Tight", fontSize: 32 }}>{posts.length}</b></div>
          </div>
          {posts.length > 0 && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 170, borderBottom: "2px solid var(--line)" }} role="img" aria-label="Views per post">
              {posts.map((p) => (
                <div key={p.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 4, height: "100%" }} title={p.title}>
                  <span className="small" style={{ fontWeight: 600 }}>{fmt(p.views)}</span>
                  <div style={{ width: "100%", maxWidth: 64, height: Math.max(6, (p.views / max) * 130), background: PL[p.platform][1] === "#121212" ? "var(--violet)" : PL[p.platform][1], borderRadius: "10px 10px 0 0" }} />
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="row" style={{ alignItems: "stretch" }}>
          <section className="card violet grow">
            <h2 style={{ fontSize: 22 }}>YouTube Short: real numbers from a link</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <label style={{ flex: "1 1 300px" }}><span className="sr-only">YouTube link</span>
                <input className="input" value={yt} onChange={(e) => setYt(e.target.value)} placeholder="https://youtube.com/shorts/…" style={{ background: "#fff" }} />
              </label>
              <button type="button" className="btn yellow" onClick={fetchYt} disabled={loading}>{loading ? "Loading…" : "Get stats"}</button>
            </div>
            {ytMsg && <span className="small">{ytMsg}</span>}
            <span className="small" style={{ color: "#E4E0FF" }}>Public stats come from the YouTube Data API. No login needed.</span>
          </section>
          <section className="card grow">
            <h2 style={{ fontSize: 22 }}>Instagram or TikTok: add numbers</h2>
            <div style={{ display: "flex", gap: 6 }}>
              {(["instagram", "tiktok", "youtube"] as const).map((k) => (
                <button key={k} type="button" aria-pressed={form.platform === k} className="pill" onClick={() => setForm({ ...form, platform: k })} style={{ border: `2px solid ${form.platform === k ? "var(--violet)" : "var(--line)"}`, background: "#fff", minHeight: 40 }}>{PL[k][0]}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input className="input" style={{ flex: "2 1 200px" }} placeholder="Post name" aria-label="Post name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="input" style={{ flex: "1 1 100px" }} type="number" placeholder="Views" aria-label="Views" value={form.views} onChange={(e) => setForm({ ...form, views: e.target.value })} />
              <input className="input" style={{ flex: "1 1 100px" }} type="number" placeholder="Likes" aria-label="Likes" value={form.likes} onChange={(e) => setForm({ ...form, likes: e.target.value })} />
            </div>
            <button type="button" className="btn" style={{ alignSelf: "flex-start" }} disabled={!form.views}
              onClick={() => { add({ title: form.title || "New post", platform: form.platform, views: Number(form.views), likes: Number(form.likes || 0), source: "manual" }); setForm({ ...form, title: "", views: "", likes: "" }); }}>Add post</button>
            <span className="small muted">Take the numbers from Instagram insights or TikTok analytics.</span>
          </section>
        </div>

        <section className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 22 }}>Every post</h2>
            <Link className="btn light" href={`/coach?q=${encodeURIComponent("Look at my results and tell me what to post next: " + state.posts.map((p) => `${p.title} (${PL[p.platform][0]}): ${p.views} views, ${p.likes} likes`).join("; "))}`}>Ask coach about my results</Link>
          </div>
          {posts.length === 0 ? <p className="muted">No posts yet. Paste a YouTube link or add your Instagram or TikTok numbers above.</p> : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 640 }}>
                <thead><tr style={{ textAlign: "left", color: "var(--muted)", fontSize: 12, textTransform: "uppercase" }}><th style={{ padding: 10 }}>Date</th><th style={{ padding: 10 }}>Post</th><th style={{ padding: 10 }}>Platform</th><th style={{ padding: 10, textAlign: "right" }}>Views</th><th style={{ padding: 10, textAlign: "right" }}>Likes</th><th style={{ padding: 10 }}>Source</th><th /></tr></thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: 10 }}>{p.date}</td><td style={{ padding: 10, fontWeight: 600 }}>{p.title}</td>
                      <td style={{ padding: 10 }}><span className="pill" style={{ background: PL[p.platform][1], color: PL[p.platform][2] }}>{PL[p.platform][0]}</span></td>
                      <td style={{ padding: 10, textAlign: "right" }}>{fmt(p.views)}</td><td style={{ padding: 10, textAlign: "right" }}>{fmt(p.likes)}</td>
                      <td style={{ padding: 10 }} className="small muted">{p.source === "youtube-api" ? "YouTube API" : "Manual"}</td>
                      <td style={{ padding: 10 }}><button type="button" className="pill" style={{ border: "none" }} aria-label={`Remove ${p.title}`} onClick={() => update((s) => ({ ...s, posts: s.posts.filter((x) => x.id !== p.id) }))}>✕</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
      <CoachFab />
    </div>
  );
}
