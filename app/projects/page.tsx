'use client'

import { Dayjs } from "dayjs";
import Footer from "../template/global/footer"
import Header from "../template/global/header"
import { Project } from "./project";
import ProjectPreview from "./view/projectPreview";
import { formatDate } from "../utils/textFormat";

export default function Page() {
    const projects = Project.ALL_PROJECTS();

    
    function sortDates(dateA: Dayjs, dateB: Dayjs) { // Date sorting function, makes NaN dates go to top
        if (!dateA.isValid()) {
            return -1
        }
        if (!dateB.isValid()) {
            return 1
        }

        return dateB.unix() - dateA.unix()
    
    }

    //const projectNamesByCreatedDescending  = Object.keys(projects).sort((a, b) => projects[b].getCreated().unix() - projects[a].getCreated().unix())
    const projectNamesByReleaseDescending  = Object.keys(projects).sort((a, b) => { //
        const dateA = projects[a].getLatestRelease().getDate()
        const dateB = projects[b].getLatestRelease().getDate()

        return sortDates(dateA, dateB)
    })

    const projectsSorted = projectNamesByReleaseDescending.map(project => projects[project]);
    const projectLabels = Object.values(projectsSorted).map(project => <div className="pt-2" key={project.getName()}><ProjectPreview project={project}/></div>)   

    return (
        <>
            <Header currentPage="Projects"/>
            <div className="main">
                <h1>Projects</h1>
                <p>Here are my current projects, updated {formatDate(Project.getProjectByName("personal-website").getLatestRelease().getDate())}.<br/>Most of these are on my GitHub but some here will be private like university ones.<br/><br/>Clicking a project will give you more information on the project, and ways to view it if it has any.</p>
                <div className="grid grid-cols-3 gap-5 pt-5 text-center">
                    {projectLabels}
                </div>
            </div>
            <Footer/>
        </>
    )
}