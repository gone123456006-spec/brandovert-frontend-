import type { Metadata } from "next";
import { Anton, Fraunces, Plus_Jakarta_Sans, Geist_Mono, Poppins } from "next/font/google";
import { site } from "@/lib/site";
import { defaultTitle, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { AudioUnlock } from "@/components/site/count-up";
import { SiteHeader } from "@/components/site/site-header";
import { SiteChrome } from "@/components/site/site-chrome";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { WelcomePopup } from "@/components/site/welcome-popup";
import { ServiceEnquiryProvider } from "@/components/site/service-enquiry";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Only for client text logos that are set in Poppins.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600", "700"],
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [...site.keywords],
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: site.url,
    languages: { "en-IN": site.url, en: site.url },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / NEXT_PUBLIC_BING_SITE_VERIFICATION after Search Console setup.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? {
        verification: {
          ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
            ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
            : {}),
          ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
            ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
            : {}),
        },
      }
    : {}),
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    title: defaultTitle,
    description: site.description,
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: ["/brand/og.png"],
  },
  other: {
    "geo.region": "IN-BR",
    "geo.placename": "Patna",
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${anton.variable} ${geistMono.variable} ${poppins.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Skip to content
        </a>
        <ServiceEnquiryProvider>
          <SiteChrome>
            <AnnouncementBar />
            <SiteHeader />
          </SiteChrome>
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteChrome>
            <SiteFooter />
            <WhatsAppFloat />
            <WelcomePopup />
            <AudioUnlock />
          </SiteChrome>
        </ServiceEnquiryProvider>
      </body>
    </html>
  );
}
