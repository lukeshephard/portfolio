import { Project } from "./projects/project";
import ProjectLabel from "./projects/display/projectLabel";
import Header from "./template/global/header";
import { NameLink } from "./template/link/nameLink";
import { NavLink } from "./template/link/navLink";
import MainProjects from "./projects/mainProjects";

export default function Page() { // The website home page
  const FAVOURITE_PROJECT = "personal-website";

  const projectLink = new NavLink("projects").generateElement();

  const codeStatsLink = new NameLink("coding statistics", "https://codestats.net/users/ShephardLuke").generateElement();

  return (
    <>
      <Header currentPage="Home"/>
      
      <main>
        <h1>Home</h1>
        <section>
          <p>Hi, I&#39;m Luke! Welcome to my little corner of the internet...</p>
          <p>This website currently is just a place to organise my {projectLink} and write about them.</p>
        </section>

        <section className="pt-10">
          <h2>About me</h2>
          <ul>
            <li>I am 20 years old.</li>
            <li>I am currently studying Computer Science in my second year at Queen Mary University of London.</li>
            <li>Here are my {codeStatsLink}.</li>
            <li>Programming projects are my favourite pastime.</li>
          </ul>
        </section>

        <section className="pt-10">
          <h2>Highlighted Projects</h2>
          <ul>
            <li>My favourite project is currently <ProjectLabel project={Project.getProjectByName(FAVOURITE_PROJECT)}/>.</li>
            <li><MainProjects/></li>
            <li>My A-Level coursework I did in 2023 is <ProjectLabel project={Project.getProjectByName("little-man-computer")}/>.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
