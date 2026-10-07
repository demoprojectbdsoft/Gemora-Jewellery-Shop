import type { Metadata, Viewport } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

// 1. Initialize Primary Font (Open Sans)
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// 2. Initialize Secondary Font (Poppins)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Viewport configuration for standalone PWA & responsive displays
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0284c7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Gemora - Luxury Fine Jewellery & Diamonds",
    template: "%s | Gemora",
  },
  description: "Gemora Fine Jewellery — Handcrafted diamond rings, necklaces, luxury bracelets, gold earrings, bridal collections, and bespoke gemstones.",
  manifest: "/manifest.webmanifest",
  applicationName: "Gemora",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Gemora",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Gemora - Luxury Fine Jewellery & Diamonds",
    description: "Handcrafted diamond rings, gold necklaces, bridal sets, and precious gemstones.",
    siteName: "Gemora",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openSans.variable} ${poppins.variable}`}
    >
      <body className="font-sans bg-background text-foreground antialiased">
        <Providers>
          {children}
          <ToastContainer autoClose={2000} />
        </Providers>
      </body>
    </html>
  );
}