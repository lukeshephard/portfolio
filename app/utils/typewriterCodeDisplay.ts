import { TypewriterClass } from 'typewriter-effect';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { wrap } from 'module';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

function replaceConflictingCharacters(code: string) {
    return code
    .replaceAll("<", "‹")
    .replaceAll(">", "›")
}


// Runs typewriter from a random point in the queue
export function typewriterCodeDisplay(typewriter: TypewriterClass) {
    const wrapper = document.getElementsByClassName("Typewriter__wrapper")[0] as HTMLDivElement;

    const highlightedStart = hljs.highlight(replaceConflictingCharacters(availableCode[0].start), {language: "tsx"})
    const highlightedType = hljs.highlight(replaceConflictingCharacters(availableCode[0].type), {language: "tsx"})

    wrapper.innerHTML = highlightedStart.value;

    typewriter.typeString(highlightedType.value);
}


// Code for the typewriter, at the moment only 1 segment
const availableCode = [
{
    start: `return platforms.map(platform => {
            const iconMap: {[key in Platform]: LucideIcon} = {
                "PHONE": Smartphone,
                "TABLET": Tablet,
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

    `,

    type: `function generateLinks(): ReactNode {
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
    }`
}
]


export default typewriterCodeDisplay;
