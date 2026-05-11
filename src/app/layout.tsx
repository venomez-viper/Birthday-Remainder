import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const playfair = Playfair_Display({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={playfair.className}>
        <AuthProvider>
          <div className="diary-page">
            <div className="absolute top-0 bottom-0 left-8 w-px bg-rose-200 shadow-[2px_0_0_rgba(254,205,211,0.5)] z-0 hidden sm:block"></div>
            <div className="relative z-10 px-4 sm:px-16 py-8">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
