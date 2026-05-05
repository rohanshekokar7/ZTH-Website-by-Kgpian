import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/SmoothScroll";

/* ── Single font instance — self-hosted by Next.js, no external network
   requests at runtime. Replaces the redundant Google Fonts <link> tags
   that were downloading Inter + Space Grotesk twice. ─────────────── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',                    // Prevents FOIT (flash of invisible text)
  preload: true,                      // Injects preload <link> for the font file
});

export const metadata: Metadata = {
  title: "Zth — End-to-End Startup Fundraising Infrastructure",
  description:
    "Prepare, refine, and raise capital with AI tools, expert services, and investor connections. Zth is the complete fundraising platform for ambitious founders.",
  keywords: [
    "startup fundraising",
    "pitch deck",
    "investor mock room",
    "seed funding",
    "startup tools",
    "venture capital",
    "founder tools",
    "pre-seed funding",
  ],
  openGraph: {
    title: "Zth — Startup Fundraising Platform",
    description:
      "Prepare, refine, and raise capital with AI tools, expert services, and investor connections.",
    url: "https://zth.co",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zth — Startup Fundraising Platform",
    description: "Prepare, refine, and raise capital",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ── Removed external Google Fonts <link> tags ──
            Next.js `Inter()` above self-hosts the font files, injects
            preload hints, and applies font-display:swap automatically.
            This eliminates 3 render-blocking network requests and
            ~100ms of font download latency. ──────────────────────── */}
      </head>
      <body>
        {/* <SmoothScroll> */}
          <ThemeProvider>{children}</ThemeProvider>
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
