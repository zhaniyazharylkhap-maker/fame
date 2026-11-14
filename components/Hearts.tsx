export default function Hearts({ n, size = 20 }: { n: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 4 }} role="img" aria-label={`${n} of 3 lives`}>
      {[0, 1, 2].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-8-5.3-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.7-8 11-8 11z" fill={i < n ? "#FF3B7F" : "none"} stroke="#FF3B7F" strokeWidth="2" />
        </svg>
      ))}
    </span>
  );
}
