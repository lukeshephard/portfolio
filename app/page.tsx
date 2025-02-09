import { Project } from "./projects/project";
import ProjectLabel from "./projects/projectLabel";
import Footer from "./template/global/footer";
import Header from "./template/global/header";
import { NameLink } from "./template/link/nameLink";
import { NavLink } from "./template/link/navLink";

export default function Page() {
  const projectLink = new NavLink("projects").generateElement();
  const contactLink = new NavLink("contact", "/socials/").generateElement();

  const codeStatsLink = new NameLink("coding statistics", "https://codestats.net/users/ShephardLuke").generateElement();

  return (
    <>
      <Header currentPage="Home"/>
      <div className="main">
        <div>
          <h1>Home</h1>
          <p>
            Hi, I&#39;m Luke! Welcome to my little corner of the internet...
            <br />
            At the moment this is mostly to just organise my {projectLink} and write about them.
            <br />
            I have some {contactLink} information though too if needed.
          </p>
        </div>
        <div className="pt-10">
          <h2>About me</h2>
          <ul>
            <li>I am currently studying Computer Science in my second year at Queen Mary University of London.</li>
            <li>I am 20 years old.</li>
            <li>Here are my cool {codeStatsLink}.</li>
            <li>Programming projects are my favourite pass time (if you couldn&#39;t tell haha).</li>
          </ul>
        </div>
        <div className="pt-10">
          <h2>Highlighted Projects</h2>
          <ul>
            <li>My main project right now is <ProjectLabel project={Project.getProjectByName("database-demo")}/>.</li>
            <li>Currently I have a few less focused side projects: <ProjectLabel project={Project.getProjectByName("advent-of-code-2024")}/>, <ProjectLabel project={Project.getProjectByName("website-template")}/> and <ProjectLabel project={Project.getProjectByName("tic-tac-toe")}/>.</li>
            <li>One of my biggest projects is my A Level coursework I did in 2023, which is <ProjectLabel project={Project.getProjectByName("little-man-computer")}/>.</li>
          </ul>
        </div>
      </div>
      <Footer/>
    </>
  );
}
