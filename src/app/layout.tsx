import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Krishna Inamdar | Walmart Account Manager & Analytics Leader",
  description:
    "Walmart Account Manager at L&R Distributors. Background in data analysis, regional distribution, and e-commerce marketplaces across the Northeast — SQL, Excel, and national retail partnerships.",
  keywords: [
    "Krishna Inamdar",
    "Walmart Account Manager",
    "L&R Distributors",
    "Wholesale Distribution",
    "Data Analyst",
    "SQL",
    "E-commerce",
    "Marketplace Manager",
    "POOLCORP",
    "Jersey City",
    "National Accounts",
    "Retail Partnerships",
  ],
  authors: [{ name: "Krishna Inamdar", url: "https://www.linkedin.com/in/krishnainamdar25/" }],
  metadataBase: new URL("https://krishna-inamdar-portfolio.vercel.app"),
  alternates: {
    canonical: "https://krishna-inamdar-portfolio.vercel.app",
  },
  openGraph: {
    title: "Krishna Inamdar | Walmart Account Manager & Analytics Leader",
    description:
      "Wholesale and retail leader spanning data analytics, e-commerce marketplaces, regional distribution, and Walmart national account management.",
    type: "website",
    locale: "en_US",
    url: "https://krishna-inamdar-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Inamdar | Walmart Account Manager & Analytics Leader",
    description:
      "From SQL-driven insights to Walmart-scale wholesale execution in the Northeast.",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
