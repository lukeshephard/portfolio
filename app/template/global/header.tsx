// website-template v1.3

import Link from "next/link";
import { NavLink } from "../link/navLink";
import { NameLink } from "../link/nameLink";
import { Shadows_Into_Light } from "next/font/google";

const shadowsIntoLight = Shadows_Into_Light({
    weight: "400",
    subsets: ["latin"]
})


export default function Header({currentPage}: {currentPage?: string}) {

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pk = require("../../../package.json");
    const repo = pk.name;

    const MAIN_TITLE = "Luke Shephard";
    
    const PAGES = [
        new NavLink("Projects"),
        new NavLink("Contact"),
        new NameLink("View Repository", "https://github.com/lukeshephard/" + repo),
    ]

    const pageLinks = PAGES.map(page => {
        const label = page.getLabel();
        if (currentPage == label) {
            return <div key={"currentPage"} className="underline header linkStyle">{page.generateElement()}</div>
        } 
        return page.generateElement();
    })
    
    return (
        <>
            <header className="flex flex-col text-center lg:flex-row justify p-10 header">
                <div className="header lg:whitespace-nowrap">
                    <Link className={`text-4xl ${shadowsIntoLight.className} linkStyle`} href={"/"}>{MAIN_TITLE}</Link>
                </div>
                <div key={"links"} className="flex flex-col pt-5 space-y-5 justify-around lg:space-y-0 lg:pt-0 lg:flex-row lg:justify-end lg:gap-24 header text-2xl items-center w-full">
                    {pageLinks}
                </div>
            </header>
            <hr />
        </>
    )
}
