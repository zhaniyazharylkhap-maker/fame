"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import { AUDIENCES, NICHES, WHO, useAura, type Answers } from "@/lib/store";

type Q = { id: keyof Answers; short: string; title: string; sub: string; multi?: boolean; custom?: boolean; options: [string, string, string][] };
const QS: Q[] = [
  { id: "who", short: "Who are you", title: "Who are you?", sub: "This decides your course and the tone of your content.", options: [["expert", "An expert", "Coach, nutritionist, therapist"], ["freelancer", "A freelancer", "Designer, developer, writer"], ["business", "A local business", "Café, salon, studio"], ["creator", "A new creator", "Starting from zero"]] },
  { id: "age", short: "Age", title: "How old are you?", sub: "We match examples and formats to you.", options: [["25–34", "25–34", ""], ["35–44", "35–44", ""], ["45–54", "45–54", ""], ["18–24", "18–24", ""], ["55+", "55+", ""]] },
  { id: "niche", short: "Niche", title: "What do you want to be known for?", sub: "Your lessons, tasks and AI audience are built around it.", custom: true, options: [["nutrition", "Nutrition & health", "Dietitians, nutritionists"], ["fitness", "Fitness", "Trainers, yoga, pilates"], ["design", "Design & creative", "Designers, photographers"], ["food", "Food & café", "Cafés, bakeries"], ["beauty", "Beauty", "Salons, makeup, nails"], ["career", "Career & business", "Consultants, managers"]] },
  { id: "goal", short: "Main goal", title: "What is your main goal?", sub: "Your tasks and calendar push toward it.", options: [["clients", "Get clients", "Turn followers into bookings"], ["followers", "Grow followers", "Reach more people"], ["product", "Launch a product", "Course, guide, service"], ["local", "Be known in my city", "Local customers"]] },
  { id: "audience", short: "Audience", title: "Who do you want to reach?", sub: "Pick up to 3. Your AI viewers will be these people.", multi: true, options: Object.entries(AUDIENCES).map(([k, v]) => [k, v, ""] as [string, string, string]) },
  { id: "platforms", short: "Platforms", title: "Where will you post?", sub: "Pick all that apply.", multi: true, options: [["instagram", "Instagram Reels", ""], ["tiktok", "TikTok", ""], ["youtube", "YouTube Shorts", "Stats load from a link"]] },
  { id: "time", short: "Time per day", title: "How much time do you have per day?", sub: "Tasks are sized to fit.", options: [["10", "10 minutes", ""], ["20", "20 minutes", ""], ["30", "30 minutes", "Recommended"], ["60", "1 hour", "Fast track"]] },
  { id: "camera", short: "Camera", title: "How do you feel about the camera?", sub: "No wrong answer. Faceless formats count too.", options: [["love", "I love it", "Talking-head videos"], ["shy", "A bit shy", "Start with voiceover"], ["faceless", "Faceless only", "B-roll, carousels"]] },
];

export default function Quiz() {
  const router = useRouter();
  const { state, update } = useAura();
  const [step, setStep] = useState(0);
  const a = state.answers;
  const q = QS[step];

  const pick = (v: string) =>
    update((s) => {
      const ans = { ...s.answers };
      if (q.multi) {
        const cur = ((ans[q.id] as string[]) || []).slice();
        const i = cur.indexOf(v);
        if (i >= 0) cur.splice(i, 1);
        else if (q.id === "platforms" || cur.length < 3) cur.push(v);
        (ans as Record<string, unknown>)[q.id] = cur;
      } else (ans as Record<string, unknown>)[q.id] = v;
      return { ...s, answers: ans };
    });
  const isOn = (v: string) => (q.multi ? ((a[q.id] as string[]) || []).includes(v) : a[q.id] === v);
  const answered = (x: Q) => { const v = a[x.id]; return Array.isArray(v) ? v.length > 0 : !!v; };
  const finish = () => { update((s) => ({ ...s, quizDone: true })); router.push("/avatar"); };

  const summary = [
    ["I am", WHO[a.who || ""]],
    ["Niche", a.nicheCustom || NICHES[a.niche || ""]],
    ["Audience", (a.audience || []).map((x) => AUDIENCES[x]).join(", ")],
    ["Platforms", (a.platforms || []).join(", ")],
  ].filter(([, v]) => v);

  return (
    <div className="page" style={{ background: "var(--violet)" }}>
      <header className="wrap" style={{ background: "#fff", borderRadius: 20, padding: "14px 20px", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Link href="/"><img src="/logo.png" alt="aura." style={{ height: 32 }} /></Link>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontWeight: 600, fontSize: 14 }}>
          <span>Question {step + 1} of {QS.length}</span>
          <div className="bar" style={{ width: 260 }} role="progressbar" aria-valuenow={step + 1} aria-valuemax={QS.length}><i style={{ width: `${((step + 1) / QS.length) * 100}%` }} /></div>
        </div>
        <Link href="/" className="btn light">Save &amp; exit</Link>
      </header>
      <div className="wrap row" style={{ alignItems: "stretch" }}>
        <aside className="card" style={{ flex: "1 1 240px", maxWidth: 280, gap: 4 }}>
          <span className="eyebrow" style={{ marginBottom: 8 }}>About you</span>
          {QS.map((x, i) => (
            <button key={x.id} type="button" onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}
              style={{ border: "none", textAlign: "left", display: "flex", gap: 10, alignItems: "center", padding: "10px 12px", borderRadius: 14, background: i === step ? "var(--lilac)" : "transparent", fontWeight: i === step ? 600 : 400, color: i === step || answered(x) ? "var(--ink)" : "#5F5B6E" }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: i === step ? "var(--violet)" : answered(x) ? "var(--green)" : "transparent", color: i === step ? "#fff" : "var(--ink)", border: i === step || answered(x) ? "none" : "2px solid #D9D6E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                {i === step ? i + 1 : answered(x) ? "✓" : ""}
              </span>
              {x.short}
            </button>
          ))}
        </aside>
        <main className="card grow fade-in" key={step} style={{ padding: 44, gap: 24 }}>
          <span className="pill" style={{ alignSelf: "flex-start", background: "var(--pink-soft)" }}>Step {step + 1} · {q.short}</span>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 46px)", lineHeight: 1.02 }}>{q.title}</h1>
          <p className="muted" style={{ fontSize: 17 }}>{q.sub}</p>
          <div className="grid3">
            {q.options.map(([v, label, hint]) => (
              <button key={v} type="button" className={`choice ${isOn(v) ? "on" : ""}`} aria-pressed={isOn(v)} onClick={() => pick(v)}>
                <b>{label}</b>{hint && <span>{hint}</span>}
              </button>
            ))}
          </div>
          {q.custom && (
            <label className="field">Or describe it in your words
              <input className="input" value={a.nicheCustom || ""} placeholder="e.g. Meal plans for busy moms"
                onChange={(e) => update((s) => ({ ...s, answers: { ...s.answers, nicheCustom: e.target.value } }))} />
            </label>
          )}
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            {step === 0 ? <Link href="/" className="btn light">Back</Link> : <button type="button" className="btn light" onClick={() => setStep(step - 1)}>Back</button>}
            {q.multi && <span className="small muted">You can pick more than one</span>}
            {step < QS.length - 1
              ? <button type="button" className="btn" onClick={() => setStep(step + 1)} disabled={!answered(q) && !(q.custom && a.nicheCustom)}>Next</button>
              : <button type="button" className="btn" onClick={finish} disabled={!answered(q)}>Pick my avatar</button>}
          </div>
        </main>
        <aside className="card pink" style={{ flex: "1 1 280px", maxWidth: 340 }}>
          <span className="eyebrow" style={{ color: "var(--ink)" }}>Your profile so far</span>
          <div style={{ background: "rgba(255,255,255,.55)", borderRadius: 18, padding: 16, display: "flex", justifyContent: "center" }}>
            <Avatar stage="noob" size={170} />
          </div>
          {summary.map(([k, v]) => (
            <div key={k} style={{ background: "#fff", borderRadius: 14, padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 10, fontSize: 14 }}>
              <span className="muted">{k}</span><b style={{ textAlign: "right" }}>{v}</b>
            </div>
          ))}
          <p className="small" style={{ marginTop: "auto", lineHeight: 1.5 }}>Your answers build five AI viewers who react like your real clients. They stay in this browser.</p>
        </aside>
      </div>
    </div>
  );
}
