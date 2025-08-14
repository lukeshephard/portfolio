'use client'

import { ReactNode } from "react";
import { Archive, ArchiveRestore, BookOpen, BookUser, User, UserSearch } from "lucide-react";
import NavbarItem from "./navbarItem";
import Link from "next/link";
import { Shadows_Into_Light } from "next/font/google";
import ThemeButton from "./themeButton";
import RepositoryLink from "./repositoryLink";

const shadowsIntoLight = Shadows_Into_Light({
    weight: "400",
    subsets: ["latin"]
})

export default function ContentWrapper({children}: {children: ReactNode}) { // An element to add the header to each page
    return (
        <>
            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:h-18 justify-between px-[2.5rem] p-3">
                <p className={`text-2xl text-center lg:text-left lg:text-3xl my-auto ${shadowsIntoLight.className}`}><Link href="/" className="block no-underline text-logo hover:text-logo-hover active:text-logo-active">Luke Shephard</Link></p>
                
                {/* Navbar */}
                <div className="flex flex-col py-6 justify-center mx-auto text-xl gap-6 lg:flex-row lg:py-0 lg:m-0 lg:my-auto lg:gap-12">
                    <nav className="my-auto">
                        <ul className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                            <NavbarItem name="About" icon={<User/>} activeIcon={<UserSearch/>} customLink=""/>
                            <NavbarItem name="Projects" icon={<Archive/>} activeIcon={<ArchiveRestore/>}/>
                            <NavbarItem name="Socials" icon={<BookUser/>} activeIcon={<BookOpen/>}/>
                        </ul>
                    </nav>
                    <ThemeButton/>
                    <div className="flex">
                        <RepositoryLink/>
                    </div>

                </div>
            </header>
            <hr className="text-text-title"/>

            {/* Main content */}
            <main className="w-full m-auto">
                {children}
            </main>
        </>
    )
}