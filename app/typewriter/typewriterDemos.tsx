// Code for the typewriter, at the moment only 1 segment
const codeList = [
`import { BookUser, Ghost, LucideIcon, Moon, RotateCcw, Sun, SunMoon } from "lucide-react";

export type ThemeGroup = {
    name: string,
    themes: string[];
}

export type Theme = {
    name: string;
    icon: LucideIcon;
}

// List of all themes
export const themes: {[name: string]: Theme} = {
    "system": {
        name: "System (Light/Dark)",
        icon: SunMoon,
    },
    "light": {
        name: "Light",
        icon: Sun,
    },
    "dark": {
        name: "Dark",
        icon: Moon,
    },
    "lukeShephard": {
        name: "Luke Shephard",
        icon: BookUser,
    },
    "throwback": {
        name: "Throwback",
        icon: RotateCcw
    },
    "halloween": {
        name: "Halloween",
        icon: Ghost,
    }
}

export const DEFAULT_THEME = "lukeShephard";

// Seasonal theme detection goes here
export function getSeasonalTheme(): string | null {
    const date = new Date();

    // Halloween 15-31 October inclusive
    if (date.getUTCMonth() === 9) {
        const day = date.getUTCDate();
        if (day >= 15) {
            return "halloween"
        }
    }

    return null;
}

// Starter inventory - WIP
export function createInventory() {
    return ["lukeShephard", "system", "light", "dark", "halloween"];
};

export default themes;`,
`"use client"

import Platform from "../utils/platform";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { FolderCode, House, Laptop, LucideIcon, Smartphone, Tablet } from "lucide-react";
import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import ExportedImage from "next-image-export-optimizer";

export default function ProjectCard({id, title, platforms, imagesData, description, devInfo, links}: {id:string, title: string, platforms: Platform[], description: string, imagesData: {name: string, alt:string}[], devInfo: string, links?: {website?: string, repository?: string}}) {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | undefined>()

    // Default selected platform depending on window width, matches tailwind values and website style
    useEffect(() => {
        if (platforms.includes(Platform.Phone) && window.innerWidth < 640) {
            setSelectedPlatform(Platform.Phone);
        } else if (platforms.includes(Platform.Tablet) && window.innerWidth < 1024) {
            setSelectedPlatform(Platform.Tablet);
        } else if (platforms.includes(Platform.Laptop)) {
            setSelectedPlatform(Platform.Laptop);
        } else {
            setSelectedPlatform(platforms[0]);
        }
    }, [platforms])

    // Creates a button for each supported platform
    function generatePlatformIcons(): ReactNode {
        if (selectedPlatform === undefined) {
            return null;
        }
        return platforms.map(platform => {
            const iconMap: {[key in Platform]: LucideIcon} = {
                "PHONE": Smartphone,
                "TABLET": Tablet,
                "LAPTOP": Laptop,
            }

            const currentPlatform = iconMap[platform]

            return React.createElement(currentPlatform, {
                key: title + platform,
                size: 48,
                className: \`\${currentPlatform === iconMap[selectedPlatform] ? "text-link border-[4px] p-[5px]" : "text-text border-1 border-[2px] p-[7px]"} hover:text-link-hover active:text-link-active rounded-lg\`,
                onClick: () => setSelectedPlatform(platform)
            })
        })
    }

    // Returns a p tag with the supplied links
    function generateLinks(): ReactNode {
        if (links === undefined) {
            return null;
        }

        const linksList = []

        if (links.website) {
            linksList.push(<a href={links.website} target="_blank" className="flex gap-1"><House className="my-auto"/>Homepage</a>)
        }

        if (links.repository) {
            linksList.push(<a href={links.repository} target="_blank" rel="noopener noreferrer" className="flex gap-1"><FolderCode className="my-auto"/>Repository</a>)
        }

        let fullText = <>{linksList[0]}</>;

        for (let i = 1; i < linksList.length; i++) {
            fullText = <>{fullText} | {linksList[i]}</>
        }
        
        return <p className="flex gap-3">{fullText}</p>

    }

    const imageSlides = selectedPlatform !== undefined ? imagesData.map(imageData => <SwiperSlide key={imageData.name}><ExportedImage width={1920} height={1080} sizes="(max-width: 768px) 100vw, 50vw" className="mx-auto w-full h-auto max-h-120 object-contain" src={\`/images/projects/\${id}/\${imageData.name}/\${selectedPlatform.toLowerCase()}.png\`} alt={\`\${imageData.alt}\`}/></SwiperSlide>) : null

    return (
        <div className={"w-full py-10 flex flex-col items-center gap-y-10"} id={id}>
            <h2 className="text-5xl text-text-title no-underline">{title}</h2>
            {generateLinks()}
            <p className="p-3 md:w-2/3 lg:w-1/3 md:p-0">{description}</p>
            <div className="w-full p-3 md:w-1/2 md:max-h-120 md:p-0">
                <Swiper
                modules={[Navigation, Pagination, A11y]}
                navigation
                pagination={{clickable: true}}
                style={{
                    "--swiper-pagination-bullet-size": "0.75rem",
                    "--swiper-pagination-bullet-horizontal-gap": "0.4rem",
                } as CSSProperties}
                slidesPerView={1}>
                    {imageSlides}
                </Swiper>
            </div>
            <div>
                <p>View on supported platforms:</p>
                <p className="my-auto flex justify-center gap-3 pt-3">{generatePlatformIcons()}</p>
            </div>
            <p className="p-3 md:w-2/3 lg:w-1/3 md:p-0">{devInfo}</p>
        </div>
    )
}`,


`import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Geist } from "next/font/google";
import { DEFAULT_THEME, getSeasonalTheme } from "./themes/themes";
import { ThemeProvider } from "next-themes";
import ContentWrapper from "./content-wrapper/contentWrapper";
import Script from "next/script";

const geist = Geist({
  subsets: ["latin"],
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
  const seasonalTheme= getSeasonalTheme();

  return (
    <html lang="en" suppressHydrationWarning className="md:scroll-pt-18">
      <body
        className={\`\${geist.className} antialiased h-screen\`}
      >
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
          <ThemeProvider storageKey="next-theme" defaultTheme={seasonalTheme ? seasonalTheme : DEFAULT_THEME}>
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
}`,


`import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { Metadata } from 'next';
import CardArray from "../card/cardArray";
import ProjectCard from "../card/projectCard";
import Platform from "../utils/platform";
import Card from '../card/card';
import ProjectsThemeAwardHandler from './themeAwardHandler';

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of Luke Shephard's software engineering work.",
  alternates: {
    canonical: "/projects"
  },
}

export default function Projects() {
  return (
      <>
        {/* THEME INVENTORY TEST */}
        {/* <ProjectsThemeAwardHandler/> */}
        
        <div className="flex flex-col items-center text-text text-lg">
          <CardArray>
            <Card title='My Projects' mainTitle>
              <p>These are my best projects. You can find more projects on my <a target="_blank" rel="noopener noreferrer" href="https://github.com/lukeshephard">GitHub</a>.</p>
            </Card>
            <ProjectCard
              id="qmtrack"
              title="QMTrack"
              platforms={[Platform.Phone, Platform.Tablet, Platform.Laptop]}
              description={\`A prototype web app allowing students and staff to manage various services for Queen Mary University of London (QMUL), all in one place.
                The main purpose of this app is to bring separate QMUL services together in an easy-to-use way for students and staff.\`}

              imagesData={[
                {name: "dashboard", alt:"Dashboard page showing the user's available activities and a service status list."},
                {name: "navbar", alt:"Dashboard page with the left navbar fully extended to show all the services the user can choose from."},
                {name: "ec-claims", alt: "Extenuating Circumstances claims page, showing a list of the current user's active claims."},
                {name: "submit-issue-report", alt:\`Submit Issue Report page allowing the user to select the category of the report and type a summary of their issue.
                  There is also a button to attach any evidence and then a button to submit the report.\`},
                {name: "update-service-status", alt: "Service Status page allowing the user to change the status of any of the university services or post a maintence date."},
                {name: "login", alt:"Login page with email and password inputs, with an image of Queen Mary University of London in the background."},
              ]}

              devInfo={\`This was conceptualized and delivered over 12 weeks in a group of 6 for my software engineering project university module and achieved a 83%.
                The frontend was built with Vite and React and the backend was built with FastAPI, split into 3 people for each end. 
                My role was the Lead Frontend Developer, so I was responsible for overseeing the frontend team and ensuring we had a robust user interface.\`}
            />

            <ProjectCard
              id="portfolio"
              title="Portfolio"
              links={{
                website: "https://lukeshephard.com",
                repository: "https://github.com/lukeshephard/portfolio"
              }}
              platforms={[Platform.Phone, Platform.Tablet, Platform.Laptop]}
              description={\`This very website. It was made with the goal of not only having something that I can show on my CV, but also to be a way for me to grow and improve my web development skills.\`}
              imagesData={[
                {name: "homepage", alt: \`The homepage, showing a hero section in the center with "Luke Shephard" in large with a button to view projects.\`},
                {name: "projects", alt: "The projects page, showing the project \"QMTrack\" with a description and a desktop image of the dashboard."},
                {name: "socials", alt: "The socials page, showing different links for email, GitHub and LinkedIn."},
                {name: "homepage-light", alt: \`The homepage in the "light" theme, showing a hero section in the center with "Luke Shephard" in large with a button to view projects.\`},
                {name: "homepage-dark", alt: \`The homepage in the "dark" theme, showing a hero section in the center with "Luke Shephard" in large with a button to view projects.\`},
              ]}
              devInfo="A static website built with Next.js (App Router) and React, hosted on Cloudflare Workers. I have been (and still am) working on this website on and off since August 2024, the same time I started to teach myself React. As my web development experience has grown, I have made great improvements in understanding what makes a good UI."
            />

            <ProjectCard
              id="outfit-weather"
              title="OutFit Weather"
              platforms={[Platform.Phone, Platform.Tablet, Platform.Laptop]}
              description={\`A weather app aimed for fitness enthusiasts. The user can choose their desired sport and they get data and tips personalised for them. The app has a tab for the current day, or a calander tab for the next 15 days.\`}
              imagesData={[
                {name: "today", alt: \`The today tab, showing the weather for London. It shows that is it cloudy with various other information like pressure and himidity. There are 3 tips for the user, giving running advice.\`},
                {name: "search", alt: "The today tab, showing the user using the search bar to search \"Reykjavík\"."},
                {name: "today2", alt: "The today tab, showing the weather for Reykjavík. It shows that is it snowing with various other information like pressure and himidity. There are 3 tips for the user, giving running advice."},
                {name: "calendar", alt: "The current tab, showing the weather for the next week in Reykjavík. There is information for the day and night temperature, and detailed hourly temperatures. There is also various other information like pressure and humidity."},
                {name: "settings", alt: "The settings tab, showing each setting the user can customize. There are settings for preffered outdoor activity, day/night theme, colour theme, temperature units, 24-hour time and an option to clear saved data."}
              ]}
              devInfo="Concieved, researched and delivered over 12 weeks in a group of 5 for my Graphical User Interfaces module and achieved a 92%. It is a react application created with Create React App. While I helped out with all aspects of development, my main focuses were on handling the calling and caching of the various APIs we used and making sure each page kept a consistent style."
            />

            <ProjectCard
              id="little-man-computer"
              title="Little Man Computer"
              links={{
                website: "https://little-man-computer.lukeshephard.com",
                repository: "https://github.com/lukeshephard/little-man-computer"
              }}
              platforms={[Platform.Laptop]}
              description={\`An educational web page designed to help students learn von Neumann architecture, using the Little Man Computer (LMC) model. Users can create their own programs then see an animation of how the program would be running on a CPU.\`}
              imagesData={[
                {name: "running", alt: \`A program running with the title "Square the input", partway through an animation.\`},
                {name: "blank", alt: "Default page, showing text boxes on the left for user input and on the right showing registers and RAM. There is no program running."}
              ]}
              devInfo="I researched, designed and developed this for my Computer Science A-Level final project and achieved an A*. I researched existing LMC websites and made my own design, going for a more modern look while focusing on making it educational. It is written in JavaScript using the p5.js library."
            />
          </CardArray>
        </div>
      </>
  );
}`,


`import { Box, Modal } from "@mui/material";
import { Info } from "lucide-react";
import { useState } from "react";

export default function InfoModal({message}: {message: string}) { // Display an info message
    const [open, setOpen] = useState(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "0.375rem",
        width: 400,
        bgcolor: "#0d3273",
        color: "white",
        border: "1px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="bg-transparent color-white cursor-pointer border-none">
            <button onClick={event => {event.preventDefault();setOpen(true)}}>
                <Info className="icon" />
            </button>

            <div>
                <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal">
                        <header className="modal-header">
                            <h1 className="text-4xl">{message}</h1>
                        </header>
                        <div className="button-group">
                            <button
                            className="cancel-button"
                            onClick={event => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                            >
                            Okay
                            </button>
                        </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}`
]

export default codeList