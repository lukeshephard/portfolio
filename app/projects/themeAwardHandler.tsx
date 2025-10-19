// WIP not for stable
"use client"

import { ReactNode, useEffect, useState } from "react";
import ThemeAwarder from "../themes/themeAwarder";

export default function ProjectsThemeAwardHandler() {
    const [throwbackHandler, setThrowbackHandler] = useState<ReactNode | null>(null);

    useEffect(() => {
        // Awards throwback theme when pressing "Portfolio"
        function initThrowback() {
            const portfolioElement = document.getElementById("portfolio");
            if (!portfolioElement) return;
            
            const portfolioTitle = portfolioElement.firstChild as HTMLElement;
            portfolioTitle.className = portfolioTitle.className + " hover:cursor-pointer active:text-link-active";

            setThrowbackHandler(<ThemeAwarder theme='throwback' element={portfolioTitle}/>);
        }

        initThrowback();
    }, [])

    return (
        <>
            {throwbackHandler}
        </>
    )
}