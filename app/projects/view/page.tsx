import Footer from "@/app/template/global/footer";
import Header from "@/app/template/global/header";
import { Suspense } from "react";
import ProjectView from "./projectView";

export default function View() { // Shows a project page, when given the name of the project in the url parameters
    return (
        <>
            <Header/>
            <div className="main">
                <Suspense>
                    <ProjectView/>
                </Suspense>
            </div>
            <Footer/>
        </>
    )
}