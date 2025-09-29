import { TypewriterClass } from 'typewriter-effect';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { wrap } from 'module';
import { Dispatch, SetStateAction } from 'react';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

function replaceConflictingCharacters(code: string) {
    return code
    .replaceAll("&lt;", "‹")
    .replaceAll("&gt;", "›")
}

function setStartCode(code: string) {
    const wrapper = document.getElementsByClassName("Typewriter__wrapper")[0] as HTMLDivElement;
    wrapper.innerHTML = replaceConflictingCharacters(code);
}


// Runs typewriter from a random point in the queue
export function typeCode(typewriter: TypewriterClass, code: string, startOn: string) {
    const highlightedCode = hljs.highlight(code, {language: "tsx"});
    const safeCode = replaceConflictingCharacters(highlightedCode.value);
    console.log(safeCode)

    const startCharacter = safeCode.indexOf(startOn);
    setStartCode(safeCode.substring(0, startCharacter));

    typewriter.typeString(safeCode.substring(startCharacter));
}


// Code for the typewriter, at the moment only 1 segment
const availableCode = [
`export default function ContentWrapper({children}: {children: ReactNode}) { // An element to add the header to each page
    const path = usePathname();

    return (
        <>
            {/* Header */}
            <header className="fixed z-10 left-0 top-0 w-full bg-background/75 backdrop-blur-md">
                <div className="flex flex-col lg:flex-row lg:h-18 justify-between p-3">
                    <p className={\`\${shadowsIntoLight.className}\`}><Link href="/" className="flex gap-6 text-2xl text-center lg:text-left lg:text-3xl my-auto block no-underline hover:[&>*]:text-logo-hover active:[&>*]:text-logo-active"><span className="text-logo">LS</span><span className="text-text-title">Luke Shephard</span></Link></p>
                
                    {/* Navbar */}
                    <div className="flex flex-col py-6 justify-center mx-auto text-xl gap-6 lg:flex-row lg:py-0 lg:m-0 lg:gap-12">
                        <nav className="my-auto">
                            <ul className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                                {/* <NavbarItem name="About" icon={<User/>} activeIcon={<UserSearch/>} customLink=""/> */}
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
            <main className={\`\${path === "/" ? "" : "pt-18"} w-full m-auto text-center\`}>
                {/* <hr className="text-text-title"/> */}
                {children}
            </main>
        </>
    )
}`,

`
                "LAPTOP": Laptop,
                "DESKTOP": Monitor
            }

            const currentPlatform = iconMap[platform]

            return React.createElement(currentPlatform, {
                key: title + platform,
                size: 48,
                className: \`\${currentPlatform === iconMap[selectedPlatform] ? "text-link" : "text-text"} hover:text-link-hover active:text-link-active border-1 rounded-lg p-2\`,
                onClick: () => setSelectedPlatform(platform)
            })
        })
    }

    function generateLinks(): ReactNode {
        if (links === undefined) {
            return null;
        }

        const linksList = []

        if (links.website) {
            linksList.push(<a href={links.website} target="_blank" className="flex gap-3 no-underline hover:underline"><House className="my-auto"/>Homepage</a>)
        }

        if (links.repository) {
            linksList.push(<a href={links.repository} target="_blank" className="flex gap-3 no-underline hover:underline"><FolderCode className="my-auto"/>Repository</a>)
        }

        let fullText = <>{linksList[0]}</>;

        for (let i = 1; i < linksList.length; i++) {
            fullText = <>{fullText} | {linksList[i]}</>
        }
        
        return <p className="flex gap-3">{fullText}</p>
    }`
]


export default availableCode;
