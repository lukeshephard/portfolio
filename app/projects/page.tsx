'use client'

import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Card from "../card/card";
import CardArray from "../card/cardArray";
import ProjectCard from "../card/projectCard";
import Platform from "../utils/platform";

export default function Projects() {
  return (
      <>
          <div className="flex flex-col items-center text-text text-lg">
            <CardArray>
              <Card title="Projects">
              </Card>

              <ProjectCard
              id="qmtrack"
              title="QMTrack"
              platforms={[Platform.Phone, Platform.Tablet, Platform.Laptop, Platform.Desktop]}
              description={`A prototype web app allowing students and staff to manage various services for Queen Mary University of London (QMUL), all in one place.
                The main purpose of this app is to bring separate QMUL services together in an easy-to-use way for students and staff.`}

              imagesData={[
                {name: "dashboard", alt:"Dashboard page showing the user's available activities and a service status list."},
                {name: "navbar", alt:"Dashboard page with the left navbar fully extended to show all the services the user can choose from."},
                {name: "ec-claims", alt: "Extenuating Circumstances (EC) claims page, showing a list of the current user's active claims."},
                {name: "submit-issue-report", alt:`Submit Issue Report page allowing the user to select the category of the report and type a summary of their issue.
                  There is also a button to attach any evidence and then a button to submit the report.`},
                {name: "update-service-status", alt: "Service Status page allowing the user to change the status of any of the university services or post a maintence date."},
                {name: "login", alt:"Login page with email and password inputs, with an image of Queen Mary University of London in the background."},
              ]}

              devInfo={`This was researched, designed and developed over 12 weeks in a group of 6 for my software engineering project university module.
                The frontend was built with Vite and React and the backend was built with FastAPI, split into 3 people for each end. 
                My role was the Lead Frontend Developer, so I was responsible for overseeing the frontend team and ensuring we had a robust user interface.`}
              />

              <ProjectCard
              id="little-man-computer"
              title="Little Man Computer"
              platforms={[Platform.Laptop, Platform.Desktop]}
              description={`An educational web page designed to help students learn von Neumann architecture, using the Little Man Computer (LMC) model. Users can create their own programs then see an animation of how the program would be running on a CPU.`}
              imagesData={[
                {name: "running", alt: `A program running with the title "Square the input", partway through an animation.`},
                {name: "blank", alt: "Default page, showing text boxes on the left for user input and on the right showing registers and RAM. There is no program running."}
              ]}
              devInfo="Made for my Computer Science A-Level final project. I researched existing LMC websites and made my own design, going for a more modern look while focusing on making it educational. It is written in JavaScript using the p5.js library."
              />
            </CardArray>
          </div>
      </>
  );
}
