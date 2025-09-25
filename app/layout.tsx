import type { Metadata } from "next";
import "./globals.css";
import ContentWrapper from "./content-wrapper/contentWrapper";
import { ThemeProvider } from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: "400",
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
        className={`${geist.className} antialiased h-screen`}
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
