"use client";

// All user data lives in this browser (no sign-up). One JSON object in localStorage.
import { useCallback, useEffect, useState } from "react";

export type Answers = {
  who?: string;
  age?: string;
  niche?: string;
  nicheCustom?: string;
  goal?: string;
  audience?: string[];
  platforms?: string[];
  time?: string;
  camera?: string;
};
export type Post = { id: string; date: string; title: string; platform: "instagram" | "tiktok" | "youtube"; views: number; likes: number; source: "youtube-api" | "manual" };
export type ChatMsg = { role: "user" | "model"; text: string };
export type AuraState = {
  answers: Answers;
  quizDone: boolean;
  avatar: { preset: string; photo: string; name: string };
  done: string[];
  scores: Record<string, number>;
  drafts: Record<string, string>;
  livesLost: number[];
  xp: number;
  streak: { count: number; last: string };
  freezes: number;
  pro: boolean;
  posts: Post[];
  chat: ChatMsg[];
  saved: string[];
};

const KEY = "aura.v1";
const WEEK = 7 * 24 * 3600 * 1000;

export const DEFAULT_STATE: AuraState = {
  answers: {},
  quizDone: false,
  avatar: { preset: "mia", photo: "", name: "" },
  done: [],
  scores: {},
  drafts: {},
  livesLost: [],
  xp: 0,
  streak: { count: 0, last: "" },
  freezes: 1,
  pro: false,
  posts: [],
  chat: [],
  saved: [],
};

function read(): AuraState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

function write(s: AuraState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // storage full or blocked: keep working in memory
  }
  window.dispatchEvent(new Event("aura:update"));
}

export function useAura() {
  const [state, setState] = useState<AuraState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
    const sync = () => setState(read());
    window.addEventListener("aura:update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("aura:update", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (s: AuraState) => AuraState) => {
    const next = fn(read());
    write(next);
    setState(next);
  }, []);

  return { state, ready, update };
}

export function resetAura() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event("aura:update"));
}

// ---- derived values ----

export function livesLeft(s: AuraState, now = Date.now()) {
  const active = s.livesLost.filter((t) => now - t < WEEK);
  return Math.max(0, 3 - active.length);
}

export function nextLifeIn(s: AuraState, now = Date.now()) {
  const active = s.livesLost.filter((t) => now - t < WEEK).sort((a, b) => a - b);
  if (!active.length) return null;
  const ms = active[0] + WEEK - now;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  return `${d}d ${h}h`;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function bumpStreak(s: AuraState): AuraState["streak"] {
  const t = today();
  if (s.streak.last === t) return s.streak;
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return { count: s.streak.last === y ? s.streak.count + 1 : 1, last: t };
}

export const NICHES: Record<string, string> = {
  nutrition: "Nutrition & health",
  fitness: "Fitness",
  design: "Design & creative",
  food: "Food & café",
  beauty: "Beauty",
  career: "Career & business",
};
export const AUDIENCES: Record<string, string> = {
  moms: "Busy moms 30–40",
  office: "Office workers",
  students: "Students",
  owners: "Small business owners",
  beginners: "Total beginners",
  seniors: "Adults 55+",
};
export const WHO: Record<string, string> = {
  expert: "Expert",
  freelancer: "Freelancer",
  business: "Local business",
  creator: "New creator",
};

export function profileSummary(s: AuraState) {
  const a = s.answers;
  return {
    who: WHO[a.who || ""] || "Expert",
    niche: a.nicheCustom || NICHES[a.niche || ""] || "Nutrition & health",
    audience: (a.audience || []).map((x) => AUDIENCES[x] || x).join(", ") || "Busy moms 30–40",
    goal: a.goal || "clients",
    platforms: (a.platforms || ["instagram"]).join(", "),
    camera: a.camera || "shy",
    age: a.age || "",
  };
}
