'use client'
import { useSearchParams } from "next/navigation"
import { Project } from "../project";
import ProjectInformation from "./projectInformation";
import { useRouter } from "next/navigation";

export default function ProjectView() {
    const router = useRouter()

    const searchParams = useSearchParams();
    const searchName = searchParams.get("name") as string;

    const project = Project.getProjectByName(searchName);

    const projectInformation = project.getName() != "" ? <ProjectInformation project={project}/> : null;

    return (
        <>
            <button className="linkStyle" onClick={() => {router.back()}}>Back</button>
            <div className="pt-5">
                <h1>Project - {project.getName() != "" ? project.getTitle() : "Project not found."}</h1>
                {projectInformation}
            </div>
        </>
    )
}