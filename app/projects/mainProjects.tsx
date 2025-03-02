import ProjectLabel from "./display/projectLabel";
import { Project } from "./project";

export default function MainProjects() { // Keep main projects in one place as its used in muliple places
    return (
        <>
            My main projects that I am working on are <ProjectLabel project={Project.getProjectByName("database-demo")}/>, <ProjectLabel project={Project.getProjectByName("personal-website")}/>, <ProjectLabel project={Project.getProjectByName("website-template")}/> and <ProjectLabel project={Project.getProjectByName("tic-tac-toe")}/>.
        </>
    )
}