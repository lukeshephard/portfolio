// Code for the typewriter, at the moment only 1 segment
const codeList = [
`export default function ContentWrapper({children}: {children: ReactNode}) { // An element to add the header to each page
    return (
        <>
            {/* Header */}
            <header className="md:fixed md:z-10 md:left-0 md:top-0 w-full bg-background/75 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:h-18 justify-between p-3">
                    <p className={\`\${shadowsIntoLight.className} my-auto\`}>
                        <Link href="/" className={
                            \`flex gap-6 mx-auto text-2xl justify-center md:text-left md:text-3xlmy-auto block no-underline
                            text-logo hover:text-logo-hover active:text-logo-active\`}>
                        Luke Shephard
                        </Link>
                    </p>
                
                    {/* Navbar */}
                    <div className="flex flex-col py-6 justify-center mx-auto text-xl gap-6 md:flex-row md:py-0 md:m-0 md:gap-12">
                        <nav className="my-auto">
                            <ul className="flex flex-col gap-6 md:flex-row md:gap-12">
                                <NavbarItem name="Projects" icon={<Archive/>} activeIcon={<ArchiveRestore/>}/>
                                <NavbarItem name="Experience" icon={<Code/>} activeIcon={<CodeXml/>}/>
                                <NavbarItem name="Education" icon={<BookMarked/>} activeIcon={<BookOpen/>}/>
                            </ul>
                        </nav>
                        <ThemeButton/>
                    </div>
                </div>
            </header>
            <hr className="md:hidden pb-9"/>
            {/* Main content */}
            <main className={\`md:pt-18 w-full m-auto text-center\`}>
                {/* <hr className="text-text-title"/> */}
                {children}
            </main>
        </>
    )
}`,
]

export default codeList