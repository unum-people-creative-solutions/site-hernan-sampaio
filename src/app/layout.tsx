import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LeadProvider } from "@/context/LeadContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Trainer em Paranaguá | Hernan Sampaio - Alta Performance",
  description: "Personal trainer referência em Paranaguá. Consultoria online e presencial focada em biomecânica, hipertrofia e preparação de atletas com Hernan Sampaio.",
  keywords: ["personal trainer paranaguá", "treinamento personalizado", "biomecânica", "hipertrofia", "preparação de atletas", "consultoria fitness", "academia paranaguá"],
  alternates: {
    canonical: "https://hernansampaio.com.br", // URL final a ser confirmada
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <LeadProvider>
          {children}
        </LeadProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness",
              "name": "Hernan Sampaio - Personal Trainer",
              "image": "https://hernansampaio.com.br/familia.png", // Imagem representativa
              "@id": "https://hernansampaio.com.br",
              "url": "https://hernansampaio.com.br",
              "telephone": "+5541999999999", // Ajustar via env se possível
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Academia Aquatikus",
                "addressLocality": "Paranaguá",
                "addressRegion": "PR",
                "postalCode": "83200-000",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -25.5205, // Coordenadas aproximadas de Paranaguá
                "longitude": -48.5093
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "06:00",
                "closes": "22:00"
              },
              "sameAs": [
                "https://instagram.com/hernansampaio",
                "https://instagram.com/hspersonalt"
              ],
              "priceRange": "$$",
              "description": "Personal trainer especialista em biomecânica e hipertrofia em Paranaguá. Consultoria de alta performance e preparação de atletas."
            })
          }}
        />
      </body>
    </html>
  );
}
