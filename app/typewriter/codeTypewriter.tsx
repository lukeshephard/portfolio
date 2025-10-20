import { useEffect, useRef, useState } from "react";
import 'highlight.js/styles/github-dark.css'; // Needs changing for light mode
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import codeList from "./typewriterDemos";

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

export default function CodeTypewriter() {
    const [typewriterCode, setTypewriterCode] = useState<string | null>(null);
    const codeElement = useRef<HTMLElement>(null);

    useEffect(() => {
        setTypewriterCode(codeList[0]);
    }, [])


    // Cycle through typing code
    useEffect(() => {
        if (!codeElement.current || typewriterCode === null) return;

        const hiddenCodeElement = document.createElement("code")
        hiddenCodeElement.innerHTML = hljs.highlight(typewriterCode, {language: "tsx"}).value.replaceAll("    ", "\t")


        const CURSOR = document.createTextNode("|");
        const CHAR_DELAY = 50;

        codeElement.current.innerHTML = "";

        const pointer = {
            displayedParentNode: codeElement.current as Node,
            hiddenNode: hiddenCodeElement.childNodes[0],
            currentChar: 0,
        }

        setTimeout(() => type(pointer), CHAR_DELAY)

        function onComplete() {
            console.log("COMPLETE")
        }
    
        // Type the next character / tag, runs on timeouts until all of hiddenCodeElement is typed into codeElement
        // Starts at first child of hiddenCodeElement
        // Decides next node (hiddenNode) to type by doing a depth first search: 1. Itself, 2. First Child, 3.Next sibling, 3. Parent's next sibling
        function type(pointer: {displayedParentNode: Node, hiddenNode: Node, currentChar: number}) {
            if (!codeElement.current) return;

            if (pointer.displayedParentNode.lastChild === CURSOR) {
                pointer.displayedParentNode.removeChild(CURSOR)
            }
            
            const hiddenParentNode = pointer.hiddenNode.parentNode as Node;
            let hiddenNodeIndex = pointer.displayedParentNode.childNodes.length;
            const displayedParentParentNode = pointer.displayedParentNode.parentNode as Node;

            let delay = CHAR_DELAY;

            // If text node, type char by char, otherwise paste the whole tag
            if (pointer.hiddenNode.nodeType === Node.TEXT_NODE) {
                const text = pointer.hiddenNode.textContent as string;
                hiddenNodeIndex = pointer.displayedParentNode.childNodes.length - 1;

                if (pointer.currentChar !== text.length) {
                    if (pointer.currentChar === 0) {
                         pointer.displayedParentNode.appendChild(document.createTextNode(text[pointer.currentChar]));
                    } else {
                        pointer.displayedParentNode.childNodes[hiddenNodeIndex].textContent += text[pointer.currentChar];
                    }

                    pointer.currentChar += 1;
                    if (text[pointer.currentChar] === "\t") {
                        delay = 0;
                    }
                    
                    onEnd();
                    return;
                }

                pointer.currentChar = 0
            } else {
                pointer.displayedParentNode.appendChild(pointer.hiddenNode.cloneNode(false));
                delay = 0;
            }

            // The cycle goes -> 
            if (pointer.hiddenNode.hasChildNodes()) { 
                pointer.hiddenNode = pointer.hiddenNode.childNodes[0];
                pointer.displayedParentNode = pointer.displayedParentNode.childNodes[hiddenNodeIndex];
            } else if (hiddenParentNode.childNodes.length > hiddenNodeIndex + 1) {
                pointer.hiddenNode = hiddenParentNode.childNodes[hiddenNodeIndex + 1];
            } else if (pointer.displayedParentNode !== codeElement.current && (hiddenParentNode.parentNode as Node).childNodes.length > displayedParentParentNode.childNodes.length) {
                pointer.displayedParentNode = displayedParentParentNode;
                pointer.hiddenNode = (hiddenParentNode.parentNode as Node).childNodes[displayedParentParentNode.childNodes.length]
            } else {
                onComplete();
                return;
            }

            onEnd();
        
            function onEnd() {
                if (delay !== 0) {
                    pointer.displayedParentNode.appendChild(CURSOR);
                }
                setTimeout(() => type(pointer), delay);
            }
        }
    }, [typewriterCode])

    return (
        <pre className="h-full overflow-hidden select-none pointer-events-none text-[2.5vh] transition-opacity ease-in-out duration-[3s]">
            <code ref={codeElement}>
            
            </code>
        </pre>
    )

}