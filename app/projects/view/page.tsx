import Footer from "@/app/template/global/footer";
import Header from "@/app/template/global/header";
import { Suspense } from "react";
import ProjectView from "./projectView";

export default function View() {
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