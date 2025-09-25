'use client'

import { ReactNode } from "react";
import { Archive, ArchiveRestore, BookMarked, BookOpen, Code, CodeXml, User, UserSearch } from "lucide-react";
import NavbarItem from "./navbarItem";
import Link from "next/link";
import { Shadows_Into_Light } from "next/font/google";
import ThemeButton from "./themeButton";

const shadowsIntoLight = Shadows_Into_Light({
    weight: "400",
    subsets: ["latin"]
})

export default function ContentWrapper({children}: {children: ReactNode}) { // An element to add the header to each page
    return (
        <>
            {/* Header */}
            <header className="fixed z-10 left-0 top-0 w-full bg-background">
                <div className="flex flex-col lg:flex-row lg:h-18 justify-between p-3">
                    <p className={`text-2xl text-center lg:text-left lg:text-3xl my-auto ${shadowsIntoLight.className}`}><Link href="/" className="block no-underline text-logo hover:text-logo-hover active:text-logo-active">Luke Shephard</Link></p>
                
                    {/* Navbar */}
                    <div className="flex flex-col py-6 justify-center mx-auto text-xl gap-6 lg:flex-row lg:py-0 lg:m-0 lg:gap-12">
                        <nav className="my-auto">
                            <ul className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                                <NavbarItem name="About" icon={<User/>} activeIcon={<UserSearch/>} customLink=""/>
                                <NavbarItem name="Projects" icon={<Archive/>} activeIcon={<ArchiveRestore/>}/>
                                <NavbarItem name="Experience" icon={<Code/>} activeIcon={<CodeXml/>}/>
                                <NavbarItem name="Education" icon={<BookMarked/>} activeIcon={<BookOpen/>}/>
                            </ul>
                        </nav>
                        <ThemeButton/>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="pt-18 w-full m-auto text-center ">
                <hr className="text-text-title"/>
                {children}
            </main>
        </>
    )
}