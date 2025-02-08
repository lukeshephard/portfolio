import { Project } from "../project";

export default function ProjectInformation({project}: {project: Project}) {
    return (
        <p>{project.getIsPrivate()}</p>
    )
}