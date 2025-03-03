// website-template v1.3

import Link from "next/link";
import { NavLink } from "../link/navLink";
import { NameLink } from "../link/nameLink";

export default function Header({currentPage}: {currentPage?: string}) {

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pk = require("../../../package.json");
    const repo = pk.name;

    const MAIN_TITLE = "Luke Christopher Shephard";
    
    const PAGES = [
        new NavLink("Home", "/"),
        new NavLink("Projects"),
        new NavLink("Socials"),
        new NameLink("View on GitHub", "https://github.com/shephardluke/" + repo),
    ]

    const pageLinks = PAGES.map(page => {
        const label = page.getLabel();
        if (currentPage == label) {
            return <div key={"currentPage"} className="underline header linkStyle">{page.generateElement()}</div>
        } 
        return page.generateElement();
    })

    return ( // ADDED HEADER INSTEAD OF DIV
        <header className="flex flex-col text-center lg:flex-row justify p-10 header">
            <div className="header lg:whitespace-nowrap">
                <Link className="text-4xl" href={"/"}>{MAIN_TITLE}</Link>
            </div>
            <div key={"links"} className="flex flex-col pt-5 space-y-5 lg:space-y-0 lg:pt-0 lg:flex-row justify-around header text-2xl items-center w-full">
                {pageLinks}
            </div>
        </header>
    )
}
