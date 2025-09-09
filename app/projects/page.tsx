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
              title="QMTrack"
              platforms={[Platform.Phone, Platform.Tablet, Platform.Computer, Platform.TV]}
              description="A prototype web app allowing students and staff to manage various services for Queen Mary University of London (QMUL), all in one place. The main purpose of this app is to bring separate QMUL services together in an easy-to-use way for students and staff."
              imagesData={[
                {fileName: "dashboard", alt:"Dashboard page showing the user's available activities and a service status list."},
                {fileName: "login", alt:"Login page with email and password inputs, with an image of Queen Mary University of London in the background."},
                {fileName: "ec-claims", alt: "Extenuating Circumstances (EC) claims page, showing a list of the current user's active claims."},
                {fileName: "update-service-status", alt: "Service Status page allowing the user to change the status of any of the university services or post a maintence date."},
              ]}
              devInfo="This was made over 12 weeks in a group of 6 for a university module. The frontend was built with Vite and React and the backend was built with FastAPI, split into 3 people for each end. My role was the Lead Frontend Developer, so I was responsible for overseeing the frontend team and ensuring we had a robust user interface."
              />
            </CardArray>
          </div>
      </>
  );
}
