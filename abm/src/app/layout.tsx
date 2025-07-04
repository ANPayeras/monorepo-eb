import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { DataStoreProvider } from "@/providers/data-store-providers";
import ConvexClerkProvider from "@/providers/convex-clerk-provider";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <ConvexClerkProvider>
          <DataStoreProvider>
            {children}
            <Toaster />
          </DataStoreProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
