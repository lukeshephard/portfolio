import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Project } from "../project";
import ProjectMainImage from "../display/projectMainImage";
import { FormatDate } from "@/app/utils/formatDate";

export default function ProjectInformation({project}: {project: Project}) { // Displaying the actual information for a project in a nice format
    const websiteLink = project.getWebsiteLink()
    const githubLink = project.getGithubLink()

    const links = []

    if (websiteLink.isEnabled()) {
        links.push(<li key={websiteLink.getLabel()}>{websiteLink.generateElement()}</li>)
    }
    if (githubLink.isEnabled()) {
        links.push(<li key={githubLink.getLabel()}>{githubLink.generateElement()}</li>);
    }

    let linkElement = <div className="pt-5">
        View the project:
        <ul className="pl-5">
            {links}
        </ul>
    </div>;

    if (links.length == 0) {
        linkElement = <p className="pt-5">This project cannot be viewed as it has no website and is in a private repository.</p>
    }
    
    dayjs.extend(relativeTime)

    const releaseVersion = <span>, released  <FormatDate date={project.getLatestRelease().getDate()}/></span>

    return (
        <>
            <p className="text-2xl">{project.getSummary()}</p>
            <br/>
            
            <p>Latest Release: {project.getLatestReleaseLink().generateElement()}{project.getLatestRelease().getDate().isValid() ? releaseVersion : null}.</p>
            
            {linkElement}

            <ProjectMainImage project={project} className="mt-5 w-max lg:w-3/5 h-auto border"/>

            {project.getDescription() != "" ? <p className="pt-5">{project.getDescription()}</p> : null}

            {project.getLanguages().length > 0 ? <p className="pt-5">Languages: {project.getLanguages().toString()}</p> : null}

            {project.getCreated().isValid() ? <p className="pt-5" suppressHydrationWarning>I created this project <FormatDate date={project.getCreated()}/>.</p> : null}
        </>
    )
}