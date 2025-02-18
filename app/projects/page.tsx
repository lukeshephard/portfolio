'use client'

import Footer from "../template/global/footer"
import Header from "../template/global/header"
import { Project } from "./project";
import ProjectPreview from "./projectPreview";

export default function Page() {
    const projectLabels = Object.values(Project.ALL_PROJECTS()).map(project => <div className="pt-2" key={project.getName()}><ProjectPreview project={project}/></div>)   

    return (
        <>
            <Header currentPage="Projects"/>
            <div className="main">
                <h1>Projects</h1>
                <p>Here are my projects.<br/>Clicking one will give you more information on the project, and ways to view it if it has any.</p>
                <div className="grid grid-cols-3 gap-5 pt-5 text-center">
                    {projectLabels}
                </div>
            </div>
            <Footer/>
        </>
    )
}