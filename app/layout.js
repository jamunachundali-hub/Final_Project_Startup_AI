import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Startup AI | VC-Grade Business Intelligence",
  description: "Transform your startup idea into a structured business plan with AI-powered market analysis, pitch deck drafting, and competitive intelligence.",
  keywords: ["startup", "business analysis", "AI consultant", "pitch deck builder", "market research"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
