'use client'
import { useSearchParams } from "next/navigation"
import { Project } from "../project";
import ProjectInformation from "./projectInformation";

export default function ProjectView() {

    const searchParams = useSearchParams();
    const searchName = searchParams.get("name") as string;

    const project = Project.getProjectByName(searchName);

    const projectInformation = project ? <ProjectInformation project={project}/> : null;

    return (
        <>
            <h1>{project ? project.getTitle() : "Project not found."}</h1>
            {projectInformation}
        </>
    )
}