"use client";
import Link from "next/link";

export default function CoachFab({ q }: { q?: string }) {
  return (
    <Link
      href={q ? `/coach?q=${encodeURIComponent(q)}` : "/coach"}
      className="btn violet"
      style={{ position: "fixed", right: 24, bottom: 24, zIndex: 50, boxShadow: "0 12px 30px rgba(90,60,240,0.35)", minHeight: 56, padding: "0 22px" }}
    >
      💬 Ask AI coach
    </Link>
  );
}
