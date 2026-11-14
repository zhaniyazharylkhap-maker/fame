"use client";
import { useAura } from "@/lib/store";

export const PRESETS = [
  { id: "mia", name: "Mia", bg: "#FFE3F1" },
  { id: "kai", name: "Kai", bg: "#E6F8D6" },
  { id: "zoe", name: "Zoe", bg: "#FFF6D1" },
  { id: "leo", name: "Leo", bg: "#E2E9FF" },
];
const RING: Record<string, string> = { noob: "#C9C4DE", beginner: "#A6E36B", creator: "#9DB8FF", advanced: "#FFA36B", brand: "#FF8FCF", growth: "#2F9E44", pro: "#FFD43B", sleep: "#C9C4DE" };
const LABEL: Record<string, string> = { noob: "NOOB", beginner: "BEGINNER", creator: "CREATOR", advanced: "ADVANCED", brand: "BRAND", growth: "GROWTH", pro: "PRO", sleep: "RESTING" };

export default function Avatar({ stage = "noob", size = 160, preset, photo, alt }: { stage?: string; size?: number; preset?: string; photo?: string | null; alt?: string }) {
  const { state } = useAura();
  const p = preset || state.avatar.preset || "mia";
  const ph = photo === undefined ? state.avatar.photo : photo || "";
  const label = alt || `Avatar, ${LABEL[stage]?.toLowerCase() || stage} level`;
  if (ph) {
    return (
      <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ph} alt={label} width={size} height={size} className="avatar-img" style={{ width: size, height: size, border: `${Math.max(3, Math.round(size / 22))}px solid ${RING[stage] || RING.noob}` }} />
        {size >= 90 && (
          <span style={{ position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)", background: RING[stage], border: "2px solid #121212", borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 800, whiteSpace: "nowrap" }}>
            {LABEL[stage]}
          </span>
        )}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/avatars/${p}-${stage}.jpg`} alt={label} width={size} height={size} className="avatar-img" style={{ width: size, height: size, flex: "none" }} />
  );
}
