import { FormatDate } from "@/app/utils/formatDate";
import { Project } from "../project";
import ProjectMainImage from "../display/projectMainImage";

export default function ProjectPreview({project}: {project: Project}) { // Show project as a preview box

    return (
        <article className="p-5 h-full bg-darkest-blue hover:text-neutral-400 active:text-neutral-600">
            <a href={project.getInformationLink().getLink()}>
                <h3 className="pb-5 text-2xl">{project.getTitle()}</h3>
                <p>{project.getSummary()}</p>
                <ProjectMainImage project={project} className="mt-5 max-h-96 w-auto border m-auto"/>

                <p className="mt-5">Latest release: {project.getLatestRelease().getText()}.</p>
                <p className="mt-5">Created <FormatDate date={project.getCreated()}/>.</p>
            </a>
        </article>
    )
}