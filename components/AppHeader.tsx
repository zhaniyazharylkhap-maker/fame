"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { livesLeft, nextLifeIn, useAura } from "@/lib/store";
import { levelFromDone } from "@/lib/course";
import Hearts from "./Hearts";
import Avatar from "./Avatar";

const NAV = [
  { href: "/course", label: "Course" },
  { href: "/trends", label: "Trends" },
  { href: "/results", label: "Results" },
  { href: "/coach", label: "AI coach" },
  { href: "/profile", label: "Profile" },
];

export default function AppHeader() {
  const path = usePathname();
  const { state, ready } = useAura();
  const lives = livesLeft(state);
  const next = nextLifeIn(state);
  const level = levelFromDone(state.done);
  return (
    <header className="wrap" style={{ background: "#fff", borderRadius: 20, padding: "12px 20px", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <Link href="/" aria-label="Aura home" style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="aura." height={32} style={{ height: 32, width: "auto" }} />
        </Link>
        <nav aria-label="App" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {NAV.map((n) => {
            const on = path?.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} aria-current={on ? "page" : undefined} style={{ textDecoration: "none", padding: "10px 14px", borderRadius: 999, fontSize: 14, fontWeight: on ? 700 : 500, background: on ? "var(--lilac)" : "transparent" }}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {ready && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <Link href="/lives" className="pill" style={{ background: "var(--pink-soft)", textDecoration: "none" }}>
            <Hearts n={lives} /> {next ? `+1 in ${next}` : "Full"}
          </Link>
          <span className="pill" style={{ background: "var(--yellow-soft)" }}>🔥 {state.streak.count}-day streak</span>
          <span className="pill">{state.xp} XP</span>
          <Link href="/profile" aria-label={`Level ${level.n}, ${level.name}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Avatar stage={level.stage} size={40} />
          </Link>
        </div>
      )}
    </header>
  );
}
