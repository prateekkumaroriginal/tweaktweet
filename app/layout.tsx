import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "TweakTweet - Maximize Your Social Media Engagement",
  description: "TweakTweet helps you craft engaging social media posts designed to maximize reach and interaction. Use AI-powered insights to optimize your content for the best results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <main className="h-full max-w-[1920px]">
          {children}
        </main>
      </body>
    </html>
  );
}
