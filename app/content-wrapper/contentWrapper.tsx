'use client'

import { ReactNode } from "react";
import { Archive, ArchiveRestore, BookMarked, BookOpen, Code, CodeXml, User, UserRound, UserRoundSearch, UserSearch } from "lucide-react";
import NavbarItem from "./navbarItem";
import Link from "next/link";
import { Shadows_Into_Light } from "next/font/google";
import ThemeButton from "./themeButton";
import { usePathname } from "next/navigation";

const shadowsIntoLight = Shadows_Into_Light({
    weight: "400",
    subsets: ["latin"]
})

export default function ContentWrapper({children}: {children: ReactNode}) { // An element to add the header to each page
    const path = usePathname();

    return (
        <>
            {/* Header */}
            <header className="lg:fixed lg:z-10 lg:left-0 lg:top-0 w-full bg-background/75 backdrop-blur-md">
                <div className="flex flex-col lg:flex-row lg:h-18 justify-between p-3">
                    <p className={`${shadowsIntoLight.className} my-auto`}><Link href="/" className="flex gap-6 mx-auto text-2xl justify-center lg:text-left lg:text-3xl my-auto block no-underline hover:[&>*]:text-logo-hover active:[&>*]:text-logo-active">Luke Shephard</Link></p>
                
                    {/* Navbar */}
                    <div className="flex flex-col py-6 justify-center mx-auto text-xl gap-6 lg:flex-row lg:py-0 lg:m-0 lg:gap-12">
                        <nav className="my-auto">
                            <ul className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                                {/* <NavbarItem name="About" icon={<User/>} activeIcon={<UserSearch/>} customLink=""/> */}
                                <NavbarItem name="Projects" icon={<Archive/>} activeIcon={<ArchiveRestore/>}/>
                                <NavbarItem name="Socials" icon={<UserRound/>} activeIcon={<UserRoundSearch/>}/>
                            </ul>
                        </nav>
                        <ThemeButton/>
                    </div>
                </div>
            </header>
            <hr className="lg:hidden pb-9"/>
            {/* Main content */}
            <main className={`lg:pt-18 w-full m-auto px-3 text-center`}>
                {/* <hr className="text-text-title"/> */}
                {children}
            </main>
        </>
    )
}