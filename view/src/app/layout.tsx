import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConvexClientProvider } from "../providers/convex-client-provider";
import { DataStoreProvider } from "@/providers/data-store-providers";
import "./globals.css";
import { CSPostHogProvider } from "@/providers/ph-client-provider";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Estoy.Link",
  description: "Contá tu historia...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <CSPostHogProvider>
            <DataStoreProvider>
              <PostHogPageView />
              {children}
            </DataStoreProvider>
          </CSPostHogProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
