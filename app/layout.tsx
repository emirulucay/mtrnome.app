import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Providers } from "@/app/store/provider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simply beautiful, awesome and open-source metronome app.",
  description: "Simple metronome for musicians with great user experience and gorgeus interface.",
  openGraph: {
    type: "website",
    title: "Simply beautiful, awesome and open-source metronome app.",
    url: "https://mtrnome.app",
    description: "Simple metronome for musicians with great user experience and gorgeus interface.",
    images: "/og.jpg",
  },
  alternates: {
    canonical: "https://mtrnome.app",
  },
  applicationName: "mtrnome.app",
  robots: {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
    },
  },
  twitter: {
    images: "/og.jpg",
    title: "Simply beautiful, awesome and open-source metronome app.",
    description: "Simple metronome for musicians with great user experience and gorgeus interface.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
