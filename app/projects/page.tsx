'use client'

import { Dayjs } from "dayjs";
import Footer from "../template/global/footer"
import Header from "../template/global/header"
import { Project } from "./project";
import ProjectPreview from "./view/projectPreview";
import { ReactElement, useState } from "react";
import MainProjects from "./mainProjects";
import { FormatDate } from "../utils/formatDate";

enum SortMethod { // Enums to store sorting methods and orders
    Title = "Title",
    CreatedDate = "Created Date",
    LatestReleaseDate = "Latest Release Date",
}

enum SortOrder {
    Ascending = "Ascending",
    Descending = "Descending",
}

const projects = Project.ALL_PROJECTS();
const sortedProjectNames = Object.keys(projects);

export default function Page() { // The main project page (aka projects.shephardluke.co.uk)

    const [sortMethod, setSortMethod] = useState(SortMethod.LatestReleaseDate);
    const [sortOrder, setSortOrder] = useState(SortOrder.Descending);

    function getOrderName(order: SortOrder) { // Get the order name so depending on the order, e.g. for characters it shows A-Z but for dates it returns oldest/newest to help the user understand (I get confused with ascending and descending)
        switch (sortMethod) {
            case SortMethod.Title:
                if (order == SortOrder.Ascending) {
                    return "A-Z"
                }
                return "Z-A"
            case SortMethod.CreatedDate:
            case SortMethod.LatestReleaseDate:
                if (order == SortOrder.Ascending) {
                    return "Oldest First"
                }
                return "Newest First"
        }
    }


    function sortDates(dateA: Dayjs, dateB: Dayjs, sortOrder: SortOrder) { // Date sorting function, makes NaN dates go to top
        const ascending = sortOrder === SortOrder.Ascending;

        if (!dateA.isValid()) {
            if (!ascending) {
                return -1
            }
            return 1
        }
        if (!dateB.isValid()) {
            if (!ascending) {
                return 1
            }
            return -1
        }
        
        if (!ascending) {
            return dateB.unix() - dateA.unix()
        }
        return dateA.unix() - dateB.unix()
    }


    switch (sortMethod) { // Sort project names depending on the current method
        case SortMethod.Title:
            sortedProjectNames.sort((a, b) => {
                const titleA = projects[a].getTitle();
                const titleB = projects[b].getTitle();

                if (sortOrder == SortOrder.Descending) {
                    return titleB.localeCompare(titleA)
                }
        
                return titleA.localeCompare(titleB);
            })
            break
        case SortMethod.CreatedDate:
            sortedProjectNames.sort((a, b) => {
                const dateA = projects[a].getCreated();
                const dateB = projects[b].getCreated();
        
                return sortDates(dateA, dateB, sortOrder);
            })
            break
        case SortMethod.LatestReleaseDate:
            sortedProjectNames.sort((a, b) => {
                const dateA = projects[a].getLatestRelease().getDate();
                const dateB = projects[b].getLatestRelease().getDate();
        
                return sortDates(dateA, dateB, sortOrder);
            })
            break
    }

    const projectsSorted = sortedProjectNames.map(project => projects[project]);
    const projectLabels = Object.values(projectsSorted).map(project => <div className="pt-2" key={project.getName()}><ProjectPreview project={project}/></div>)   

    // Create options for the selects depending on what the enums have
    const sortByMethods: ReactElement[] = [];

    for (const method of Object.values(SortMethod)) {
        sortByMethods.push(<option key={method}>{method}</option>)
    }

    const sortByOrders: ReactElement[] = [];

    for (const order of Object.values(SortOrder)) {
        sortByOrders.push(<option value={order} key={order}>{`${order} (${getOrderName(order)})`}</option>)
    }

    return (
        <>
            <Header currentPage="Projects"/>
            <div className="main">
                <h1>Projects</h1>
                <p>Here are my current projects, as of <FormatDate date={Project.getProjectByName("personal-website").getLatestRelease().getDate()}/>.</p>
                <p>Most of these are on my GitHub but some here will be private like university ones.</p>

                <br/>
                <p><MainProjects/></p>
                <br />
                <p>I like to have many main projects as I can switch between them when I get burned out and come back with some fresh ideas.</p>
                <br/>

                <p>Clicking a project will give you more information on the project, and ways to view it if it has any.</p>
                <hr className="mt-5"/>
    
                <div className="pt-5 text-2xl flex flex-col text-center items-center space-y-5 lg:inline-block lg:text-left">
                    <p className="pt-5">Total Projects: {Object.keys(projects).length}</p>
                    <label htmlFor="projectSortBy">Sort By:</label>
                    <select className="ml-5 p-1 mr-5 w-max" defaultValue={sortMethod} id="projectSortByMethod" onChange={() => {setSortMethod((document.getElementById("projectSortByMethod") as HTMLSelectElement).value as SortMethod)}}>
                        {sortByMethods}
                    </select>
                    <select className="ml-5 p-1 w-max mr-5" defaultValue={sortOrder} id="projectSortByOrder" onChange={() => {setSortOrder((document.getElementById("projectSortByOrder") as HTMLSelectElement).value as SortOrder)}}>
                        {sortByOrders}
                    </select>
                </div>

                <p className="pt-10 text-2xl text-center lg:text-left">{projectLabels.length} Results:</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pt-5 text-center">
                    {projectLabels}
                </div>
            </div>
            <Footer/>
        </>
    )
}