'use client'
import { useSearchParams } from "next/navigation"
import { Project } from "../project";
import ProjectInformation from "./projectInformation";
import { useRouter } from "next/navigation";
import { NavLink } from "@/app/template/link/navLink";

export default function ProjectView() { // Shows project information page if the search parameter is found, otherwise display not found.
    const router = useRouter()

    const searchParams = useSearchParams();
    const searchName = searchParams.get("name") as string;

    const project = Project.getProjectByName(searchName);

    const projectInformation = project.getName() !== "" ? <ProjectInformation project={project}/> : null;

    return (
        <>
            <button className="linkStyle" onClick={() => {router.back()}}>Back</button>
            <p className="mt-5">{new NavLink("Other Projects", "/projects").generateElement()}</p>
            <div className="pt-5 max-w-[75rem]">
                {project.getName() !== "" ?  projectInformation : <h1>Project Not Found</h1>}
            </div>
        </>
    )
}