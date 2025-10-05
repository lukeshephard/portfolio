import type { Metadata } from "next";
import "./globals.css";
import ContentWrapper from "./content-wrapper/contentWrapper";
import { ThemeProvider } from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Geist } from "next/font/google";
import Script from "next/script";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lukeshephard.com"),

  title: {
    default: "Luke Shephard - Software Engineer (Web Development)",
    template: "%s | Luke Shephard - Software Engineer (Web Development)",
  },
  description: "Portfolio of Luke Shephard, a Software Engineer specialising in web development. View projects and contact information.",

  openGraph: {
    type: "website",
    url: "https://lukeshephard.com",
    siteName: "Luke Shephard Portfolio",
    title: "Luke Shephard - Software Engineer (Web Development)",
    description: "Portfolio of Luke Shephard, a Software Engineer specialising in web development. View projects and contact information.",
    images: [
      {
        url: "og-image.png",
        width: 1200,
        height: 630,
        alt: "Luke Shephard Portfolio"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Luke Shephard - Software Engineer (Web Development)",
    description: "Portfolio of Luke Shephard, a Software Engineer specialising in web development. View projects and contact information.",
    images: ["og/image-png"],
  },

  icons: {
    icon: [
      { url: "/icons/favicon.svg", type:"image/svg+xml"},
    ]
  },

  alternates: {
    canonical: "/"
  },
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
              
              <Script
                id="id-json"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify([
                    {
                      "@context": "https://schema.org",
                      "@type": "Person",
                      name: "Luke Shephard",
                      url: "https://lukeshephard.com",
                      description: "Software engineer specialising in web development.",
                      email: "mailto:luke@lukeshephard.com",
                      jobTitle: "Final-Year Computer Science Student",
                      knowsAbout: ["Software Engineering", "Web Development", "React", "Next.js", "JavaScript", "TypeScript"],
                      affiliation: {
                        "@type": "CollegeOrUniversity",
                        "name": "Queen Mary University of London",
                        "sameAs": "https://www.qmul.ac.uk/"
                      },
                      sameAs: [
                        "https://github.com/lukeshephard",
                        "https://www.linkedin.com/in/luke-shephard",
                      ]
                    },
                    {
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      name: "Luke Shephard Portfolio",
                      url: "https://lukeshephard.com",
                    }
                  ])
                }}
              />
            </ContentWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}