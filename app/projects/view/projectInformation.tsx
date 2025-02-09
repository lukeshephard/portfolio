import { Project } from "../project";

export default function ProjectInformation({project}: {project: Project}) {
    const websiteLink = project.getWebsiteLink().generateElement()
    const githubLink = project.getGithubLink().generateElement()
    return (
        <>
            <p>{websiteLink}</p>
            <p>{githubLink}</p>
        </>
    )
}