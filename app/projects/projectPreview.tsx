import { Project } from "./project";
import ProjectMainImage from "./projectMainImage";

export default function ProjectPreview({project}: {project: Project}) { // Show project as a preview
    return (
        <div className="p-5 hover:border-neutral-400 bg-darkest-blue">
            <a href={project.getInformationLink().getLink()}>
                <p className="pb-3 text-2xl">{project.getTitle()}</p>
                <p>{project.getSummary()}</p>
                <ProjectMainImage project={project} className="mt-3 max-h-96 w-auto border m-auto"/>
            </a>
        </div>
    )
}