import Image from "next/image";
import { Project } from "../project";

export default function ProjectMainImage({project, className}: {project: Project, className?: string}) {
    return (
        project.getMainImagePath() != "" ?
        <Image
            src={project.getMainImagePath()}
            width={0}
            height={0}
            className={className}
            alt={`The main picture of my ${project.getTitle()} project.`}
        />
        :
        null
    )
}