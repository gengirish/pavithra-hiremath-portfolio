import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const THEME_INIT = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light"||t==="dark"){document.documentElement.classList.toggle("dark",t==="dark");}else{document.documentElement.classList.toggle("dark",window.matchMedia("(prefers-color-scheme: dark)").matches);}}catch(e){}})();`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const siteUrl = "https://pavithra-hiremath-portfolio.vercel.app";

export const metadata: Metadata = {
  title: "Pavithra H M | L&D Leader, Business Development & Public-Sector Training",
  description:
    "15+ years in Learning & Development, program management, and business development — Accenture, JDA, Social Alpha–Tata Trusts, ER HR Solutions, and Master Trainer for Karnataka CeG. MBA (VTU), IIMB PGDM, pursuing Applied AI at IIT Madras.",
  keywords: [
    "Pavithra H M",
    "Pavithra HM",
    "Learning and Development",
    "L&D",
    "Business Development",
    "ER HR Solutions",
    "CeG Karnataka",
    "Social Alpha",
    "Tata Trusts",
    "JDA Software",
    "Accenture",
    "Bengaluru",
    "Organisational Development",
    "Master Trainer",
  ],
  authors: [{ name: "Pavithra H M", url: "https://www.linkedin.com/in/pavithra-hm-782b11186/" }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Pavithra H M | L&D & Business Development Leader",
    description:
      "Portfolio spanning enterprise L&D, social-impact incubation, HR business development, and statewide CMS training — grounded in MBA and executive programmes at IIMB and IIT Madras.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavithra H M | L&D & Business Development Leader",
    description:
      "From Accenture and JDA to Social Alpha, ER HR Solutions, and CeG — learning, transformation, and growth at scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
