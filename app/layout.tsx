import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura · Aurafarm. Be extra.",
  description: "A personal brand trainer. Learn, test every post on an AI audience, level up your avatar from Noob to Pro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
