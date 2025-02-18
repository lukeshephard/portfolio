import { Project } from "./project";

export default function ProjectLabel({project}: {project: Project}) { // Display a project on the page as a link
    return (
        project.getInformationLink().generateElement()
    )
}