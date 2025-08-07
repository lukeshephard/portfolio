import { ReactNode } from "react";
import { ArchiveRestore, BookUser, Code, UserSearch } from "lucide-react";
import NavbarItem from "./navbarItem";
import Link from "next/link";
import { Shadows_Into_Light } from "next/font/google";

const shadowsIntoLight = Shadows_Into_Light({
    weight: "400",
    subsets: ["latin"]
})

export default function ContentWrapper({children}: {children: ReactNode}) { // An element to add the header to each page
    return (
        <>
            {/* Header */}
            <header className="flex flex-col lg:flex-row justify-between px-[2.5rem] p-3">
                <p className={`text-2xl text-center lg:text-left lg:text-3xl text-blue-primary ${shadowsIntoLight.className}`}><Link href="/" className="block text-white no-underline">Luke Christopher Shephard</Link></p>
                
                {/* Navbar */}
                <div className="flex flex-col py-6 justify-center mx-auto text-xl gap-6 lg:flex-row lg:py-0 lg:m-0 lg:my-auto lg:gap-12">
                    <nav className="mt-auto mb-auto">
                        <ul className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                            <NavbarItem name="About" icon={<UserSearch/>} customLink=""/>
                            <NavbarItem name="Projects" icon={<ArchiveRestore/>}/>
                            <NavbarItem name="Socials" icon={<BookUser/>}/>
                        </ul>
                    </nav>

                    <a href="https://github.com/ShephardLuke/personal-website" target="_blank" className="m-auto"><Code className="size-9"/></a>
                </div>
            </header>


            {/* Main content */}
            <main className="w-full m-auto">
                {children}
            </main>
        </>
    )
}