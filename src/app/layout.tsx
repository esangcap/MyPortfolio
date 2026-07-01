import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eric Sangcap | Full-Stack Web Developer",
  description:
    "Portfolio for Eric Sangcap, a full-stack web developer specializing in Shopify, WordPress, React, Next.js, and AI automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
