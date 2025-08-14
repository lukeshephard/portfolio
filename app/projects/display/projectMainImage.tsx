import Image from "next/image";
import { Project } from "../project";

export default function ProjectMainImage({project, className}: {project: Project, className?: string}) { // Display the main image of a project
    return (
        project.getMainImagePath() != "" ?
        <Image
            src={project.getMainImagePath()}
            width={1920}
            height={1080}
            className={className}
            alt={`The main picture of my ${project.getTitle()} project.`}
        />
        :
        null
    )
}