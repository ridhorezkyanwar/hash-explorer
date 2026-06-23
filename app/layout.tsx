import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cryptographic Hash Explorer | Ridho Rezky Anwar",
  description: "Visualize SHA-1, SHA-256, SHA-384, SHA-512 with avalanche effect demonstration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black antialiased">{children}</body>
    </html>
  );
}