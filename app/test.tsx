'use client'

import { ThemeProvider } from "next-themes";
import ContentWrapper from "./content-wrapper/contentWrapper";
import { ReactNode, useEffect, useState } from "react";
import { DEFAULT_THEME, getSeasonalTheme } from "./themes/themes";
import Script from "next/script";
import { useLocalStorage } from "usehooks-ts";

export default function Test({children}: {children: ReactNode}) {
    const [enableSeasonalThemes] = useLocalStorage("enableSeasonalThemes", true)
    console.log(enableSeasonalThemes)
    const seasonalTheme = getSeasonalTheme();

    return (
        <ThemeProvider defaultTheme={DEFAULT_THEME} forcedTheme={(enableSeasonalThemes && seasonalTheme ? seasonalTheme : undefined)}>
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
    )
}