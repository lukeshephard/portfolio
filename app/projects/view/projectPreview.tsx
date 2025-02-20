import { formatDate } from "@/app/utils/textFormat";
import { Project } from "../project";
import ProjectMainImage from "../display/projectMainImage";

export default function ProjectPreview({project}: {project: Project}) { // Show project as a preview box

    return (
        <div className="p-5 h-full bg-darkest-blue hover:bg-darkest-blue-2x active:bg-darkest-blue-3x hover:text-neutral-400 active:text-neutral-600">
            <a href={project.getInformationLink().getLink()}>
                <p className="pb-5 text-2xl underline">{project.getTitle()}</p>
                <p>{project.getSummary()}</p>
                <ProjectMainImage project={project} className="mt-5 max-h-96 w-auto border m-auto"/>

                <p className="mt-5">Latest release: {project.getLatestRelease().getText()}.</p>
                <p className="mt-5">Created {formatDate(project.getCreated())}.</p>
            </a>
        </div>
    )
}