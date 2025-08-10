import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ContentWrapper from "./content-wrapper/contentWrapper";
import { ThemeProvider } from "next-themes";

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
  title: "Luke Christopher Shephard",
  description: "Luke Christopher Shephard's personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
