import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";


const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Playfair Display — premium editorial serif for all headings */}
        {/* Inter — clean geometric sans-serif for all body/UI text     */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

