import type { Metadata, Viewport } from "next";
import { fonts } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shreya Nayak | Systems, Cloud & AI",
    template: "%s | Shreya Nayak",
  },
  description:
    "Shreya Nayak is a Computer Science Engineer building a broader technology foundation across infrastructure, cloud, automation, and AI.",
  openGraph: {
    title: "Shreya Nayak | Systems, Cloud & AI",
    description:
      "The work and technical journey of Shreya Nayak: NIT Goa, Wipro GraphRAG, systems projects, and a new direction through infrastructure and cloud.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreya Nayak | Systems, Cloud & AI",
    description:
      "The work and technical journey of Shreya Nayak: NIT Goa, Wipro GraphRAG, systems projects, and a new direction through infrastructure and cloud.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1720",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fonts} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
