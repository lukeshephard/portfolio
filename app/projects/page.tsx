'use client'

import Footer from "../template/global/footer"
import Header from "../template/global/header"
import { Project } from "./project";
import ProjectDisplay from "./projectDisplay";

export default function Page() {
    const projectDisplays = Project.ALL_PROJECTS().map(project => <ProjectDisplay project={project} key={project.getName()}/>)   

    return (
        <>
            <Header currentPage="Projects"/>
            <div className="main text-2xl">
                <h1>Projects</h1>
                {projectDisplays}
            </div>
            <Footer/>
        </>
    )
}