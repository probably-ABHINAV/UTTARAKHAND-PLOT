import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Property in Uttrakhand - Premium Hill Station Land Plots",
  description: "Leading property developer offering premium land plots in Uttrakhand's pristine hill stations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
