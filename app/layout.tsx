import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antipatron",
  description: "Una experiencia narrativa web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
