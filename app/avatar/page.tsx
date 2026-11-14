"use client";
import Link from "next/link";
import { useRef } from "react";
import Avatar, { PRESETS } from "@/components/Avatar";
import { useAura } from "@/lib/store";

function toSquare(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = reject;
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = 320; c.height = 320;
        const s = Math.min(img.width, img.height);
        c.getContext("2d")!.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 320, 320);
        resolve(c.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = r.result as string;
    };
    r.readAsDataURL(file);
  });
}

export default function AvatarPage() {
  const { state, update } = useAura();
  const fileRef = useRef<HTMLInputElement>(null);
  const av = state.avatar;
  const usePhoto = !!av.photo;
  const name = av.name || "My Aura";

  return (
    <div className="page">
      <div className="wrap row" style={{ alignItems: "stretch" }}>
        <main className="card grow" style={{ padding: 44, gap: 22, borderRadius: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="pill" style={{ background: "var(--lilac)" }}>Last step · Your avatar</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/"><img src="/logo.png" alt="aura." style={{ height: 28 }} /></Link>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 4.5vw, 52px)", lineHeight: 1 }}>Pick the one that feels like you</h1>
          <p className="muted" style={{ fontSize: 17 }}>Choose a character or use your own photo. It gets new gear with every level.</p>
          <div className="grid3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
            {PRESETS.map((p) => {
              const on = !usePhoto && av.preset === p.id;
              return (
                <button key={p.id} type="button" aria-pressed={on} onClick={() => update((s) => ({ ...s, avatar: { ...s.avatar, preset: p.id, photo: "" } }))}
                  style={{ border: `3px solid ${on ? "var(--violet)" : "transparent"}`, background: p.bg, borderRadius: 22, padding: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <Avatar stage="beginner" preset={p.id} photo="" size={130} />
                  <b>{p.name}</b>
                </button>
              );
            })}
            <button type="button" onClick={() => fileRef.current?.click()}
              style={{ border: `3px ${usePhoto ? "solid var(--violet)" : "dashed #C9C4DE"}`, background: usePhoto ? "var(--lilac)" : "#fff", borderRadius: 22, padding: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 190 }}>
              {usePhoto ? <Avatar stage="beginner" size={110} /> : <span style={{ fontSize: 34 }} aria-hidden="true">📷</span>}
              <b>{usePhoto ? "Your photo · change" : "Upload my photo"}</b>
              <span className="pill" style={{ background: "var(--green-soft)" }}>Stays on your device</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="sr-only" aria-label="Upload a photo"
              onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; const url = await toSquare(f); update((s) => ({ ...s, avatar: { ...s.avatar, photo: url } })); }} />
          </div>
          {usePhoto && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--soft)", borderRadius: 18, padding: "12px 16px" }}>
              <span className="small">Your level shows as a colored frame and badge.</span>
              <button type="button" className="btn light" style={{ marginLeft: "auto", background: "var(--pink-soft)" }} onClick={() => update((s) => ({ ...s, avatar: { ...s.avatar, photo: "" } }))}>Remove photo</button>
            </div>
          )}
          <label className="field">Name your avatar
            <input className="input" maxLength={24} value={av.name} placeholder="My Aura" onChange={(e) => update((s) => ({ ...s, avatar: { ...s.avatar, name: e.target.value } }))} />
          </label>
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
            <Link href="/quiz" className="btn light">Back</Link>
            <Link href="/course" className="btn">Build my course</Link>
          </div>
        </main>
        <aside className="card violet side" style={{ padding: 32, borderRadius: 28 }}>
          <span className="eyebrow">How {name} will grow</span>
          <div className="grid2" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            {[["noob", "Noob", "Day 1"], ["creator", "Creator", "Glasses, ring light"], ["growth", "Growth", "Shades, the chart"], ["pro", "Pro", "The crown"]].map(([st, l, g]) => (
              <div key={st} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "rgba(255,255,255,.14)", borderRadius: 18, padding: 12 }}>
                <Avatar stage={st} size={120} />
                <b>{l}</b><span className="small" style={{ color: "#D9D6E8" }}>{g}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "auto", lineHeight: 1.5 }}>Finish a block of lessons to reach the next level. Your photo is never uploaded.</p>
        </aside>
      </div>
    </div>
  );
}
