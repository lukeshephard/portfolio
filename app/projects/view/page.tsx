import { Suspense } from "react";
import ProjectView from "./projectView";

export default function View() { // Shows a project page, when given the name of the project in the url parameters
    return (
        <>
            <Suspense>
                <ProjectView/>
            </Suspense>
        </>
    )
}