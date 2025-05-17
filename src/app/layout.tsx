import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/ThemeContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UncleKenny | Professional Cinematographer",
  description: "Portfolio of UncleKenny, a professional cinematographer creating cinematic storytelling through film, commercials, music videos, and documentaries.",
  keywords: "cinematographer, filmmaker, director of photography, video production, film, commercial, music video, Nigeria, Lagos",
  authors: [{ name: "UncleKenny Studios" }],
  creator: "UncleKenny",
  publisher: "UncleKenny Studios",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.unclekenny.studios',
    siteName: 'UncleKenny Studios',
    title: 'UncleKenny | Professional Cinematographer',
    description: 'Cinematic storytelling through film. Portfolio showcasing video production, commercials, music videos, and more.',
    images: [
      {
        url: '/Portfolio Assets/kenny_1_cover.jpg', 
        width: 1200,
        height: 630,
        alt: 'UncleKenny Studios',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UncleKenny | Professional Cinematographer',
    description: 'Cinematic storytelling through film. Portfolio showcasing video production, commercials, music videos, and more.',
    images: ['/Portfolio Assets/kenny_1_cover.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  category: 'Creative Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${playfair.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
