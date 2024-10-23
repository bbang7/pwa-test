import React from "react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

import RootLayoutClient from "./RootLayoutClient";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PWAtest",
  description: "this is pwa test",
  manifest: "/web.manifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
