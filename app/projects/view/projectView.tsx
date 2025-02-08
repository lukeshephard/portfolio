'use client'
import { useSearchParams } from "next/navigation"
import { Project } from "../project";

export default function ProjectView() {

    const searchParams = useSearchParams();
    const searchName = searchParams.get("name") as string;

    const project = Project.getPorjectByName(searchName)

    return (
        <h1>
        {
            project ? project.getTitle() : "Project not found."
        }
        </h1>
    )
}