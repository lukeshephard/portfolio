'use client'

import Footer from "../template/global/footer"
import Header from "../template/global/header"
import { Project } from "./project";
import ProjectLabel from "./projectLabel";

export default function Page() {
    const projectLabels = Object.values(Project.ALL_PROJECTS()).map(project => <ProjectLabel project={project} key={project.getName()}/>)   

    return (
        <>
            <Header currentPage="Projects"/>
            <div className="main text-2xl">
                <h1>Projects</h1>
                {projectLabels}
            </div>
            <Footer/>
        </>
    )
}