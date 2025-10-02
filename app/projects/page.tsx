import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { Metadata } from 'next';
import CardArray from "../card/cardArray";
import ProjectCard from "../card/projectCard";
import Platform from "../utils/platform";
import Card from '../card/card';

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
          <div className="flex flex-col items-center text-text text-lg">
            <CardArray>
              <Card title='My Projects' mainTitle>
                <p>These are my best projects. You can find more projects on my <a target="_blank" rel="noopener noreferrer" href="https://github.com/lukeshephard">GitHub</a>.</p>
              </Card>
              <ProjectCard
                id="qmtrack"
                title="QMTrack"
                platforms={[Platform.Phone, Platform.Tablet, Platform.Laptop]}
                description={`A prototype web app allowing students and staff to manage various services for Queen Mary University of London (QMUL), all in one place.
                  The main purpose of this app is to bring separate QMUL services together in an easy-to-use way for students and staff.`}

                imagesData={[
                  {name: "dashboard", alt:"Dashboard page showing the user's available activities and a service status list."},
                  {name: "navbar", alt:"Dashboard page with the left navbar fully extended to show all the services the user can choose from."},
                  {name: "ec-claims", alt: "Extenuating Circumstances claims page, showing a list of the current user's active claims."},
                  {name: "submit-issue-report", alt:`Submit Issue Report page allowing the user to select the category of the report and type a summary of their issue.
                    There is also a button to attach any evidence and then a button to submit the report.`},
                  {name: "update-service-status", alt: "Service Status page allowing the user to change the status of any of the university services or post a maintence date."},
                  {name: "login", alt:"Login page with email and password inputs, with an image of Queen Mary University of London in the background."},
                ]}

                devInfo={`This was conceptualized and delivered over 12 weeks in a group of 6 for my software engineering project university module and achieved a 83%.
                  The frontend was built with Vite and React and the backend was built with FastAPI, split into 3 people for each end. 
                  My role was the Lead Frontend Developer, so I was responsible for overseeing the frontend team and ensuring we had a robust user interface.`}
              />

              <ProjectCard
                id="portfolio"
                title="Portfolio"
                platforms={[Platform.Phone, Platform.Tablet, Platform.Laptop]}
                description={`This very website. It was made with the goal of not only having something that I can show on my CV, but also to be a way for me to grow and improve my web development skills.`}
                imagesData={[
                  {name: "homepage", alt: `The homepage, showing a hero section in the center with "Luke Shephard" in large with a button to view projects.`},
                  {name: "projects", alt: "The projects page, showing the project \"QMTrack\" with a description and a desktop image of the dashboard."},
                  {name: "homepage-light", alt: `The homepage in the "light" theme, showing a hero section in the center with "Luke Shephard" in large with a button to view projects.`},
                ]}
                devInfo="A static website built with Next.js (App Router) and React, hosted on Cloudflare Workers. I have been (and still am) working on this website on and off since August 2024, the same time I started to teach myself React. As my web development experience has grown, I have made great improvements in understanding what makes a good UI."
              />

              <ProjectCard
                id="outfit-weather"
                title="OutFit Weather"
                platforms={[Platform.Phone, Platform.Tablet, Platform.Laptop]}
                description={`A weather app aimed for fitness enthusiasts. The user can choose their desired sport and they get data and tips personalised for them. The app has a tab for the current day, or a calander tab for the next 15 days.`}
                imagesData={[
                  {name: "today", alt: `The today tab, showing the weather for London. It shows that is it cloudy with various other information like pressure and himidity. There are 3 tips for the user, giving running advice.`},
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
                description={`An educational web page designed to help students learn von Neumann architecture, using the Little Man Computer (LMC) model. Users can create their own programs then see an animation of how the program would be running on a CPU.`}
                imagesData={[
                  {name: "running", alt: `A program running with the title "Square the input", partway through an animation.`},
                  {name: "blank", alt: "Default page, showing text boxes on the left for user input and on the right showing registers and RAM. There is no program running."}
                ]}
                devInfo="I researched, designed and developed this for my Computer Science A-Level final project and achieved an A*. I researched existing LMC websites and made my own design, going for a more modern look while focusing on making it educational. It is written in JavaScript using the p5.js library."
              />
            </CardArray>
          </div>
      </>
  );
}