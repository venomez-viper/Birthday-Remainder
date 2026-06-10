import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppWrapper } from "@/components/layout/AppWrapper";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const playfair = Cormorant_Garamond({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-serif" });

const caveat = Caveat({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-handwritten" });

export const metadata: Metadata = {
  title: "Birthday Diary",
  description: "A beautiful diary to remember the birthdays of your loved ones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, playfair.variable, caveat.variable)} suppressHydrationWarning>
      <body className="font-sans antialiased text-foreground bg-background">
        <ThemeProvider attribute="class" defaultTheme="cherry-blossom" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <AppWrapper>{children}</AppWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
