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
  icons: {
    icon: [
      { rel: "icon", url: "/icons/favicon-light.svg", media: "(prefers-color-scheme: light)"},
      { rel: "icon", url: "/icons/favicon-dark.svg", media: "(prefers-color-scheme: dark)"}
    ]
  }
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
