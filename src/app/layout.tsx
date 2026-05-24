import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toshi",
  description: "Modern payments. No gatekeepers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
