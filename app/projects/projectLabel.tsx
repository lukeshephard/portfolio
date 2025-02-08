import { Project } from "./project";

export default function ProjectLabel({project}: {project: Project}) { // Display a project on the page
    return (
            project.getIsPrivate() ? null : project.getInformationLink().generateElement()
    )
}