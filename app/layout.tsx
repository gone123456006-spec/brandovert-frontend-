import type { Metadata } from "next";
import { Anton, Fraunces, Plus_Jakarta_Sans, Geist_Mono, Poppins } from "next/font/google";
import { site } from "@/lib/site";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { AudioUnlock } from "@/components/site/count-up";
import { SiteHeader } from "@/components/site/site-header";
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
    default: `${site.name} | Web, App, SaaS & Digital Marketing Company`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${anton.variable} ${geistMono.variable} ${poppins.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Skip to content
        </a>
        <ServiceEnquiryProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppFloat />
          <WelcomePopup />
          <AudioUnlock />
        </ServiceEnquiryProvider>
      </body>
    </html>
  );
}
