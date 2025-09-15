import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ContentWrapper from "./content-wrapper/contentWrapper";
import { ThemeProvider } from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

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
  title: "Luke Shephard",
  description: "Luke Shephard's Personal Website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
          <ThemeProvider defaultTheme="luke_shephard">
            <ContentWrapper>
              {children}
            </ContentWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
