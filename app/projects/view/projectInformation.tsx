import { Project } from "../project";

export default function ProjectInformation({project}: {project: Project}) {
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

    let lastEdited: string;
    if (isNaN(project.getLastEdited().getTime())) {
        lastEdited = "Unknown";
    } else {
        lastEdited = project.getLastEdited().toString()
    }
    return (
        <>
            <p className="text-2xl">{project.getSummary()}</p>
            {linkElement}
            <p className="pt-5">{project.getDescription()}</p>
            <p className="pt-5 text-gray-400">Page last edited: {lastEdited}</p>
        </>
    )
}