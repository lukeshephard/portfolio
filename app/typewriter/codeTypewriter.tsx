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
        setTypewriterCode(codeList[Math.floor(Math.random() * codeList.length)]);
    }, [])


    // Cycle through typing code
    useEffect(() => {
        if (!codeElement.current || typewriterCode === null) return;



        const hiddenCodeElement = document.createElement("code")
        hiddenCodeElement.innerHTML = hljs.highlight(typewriterCode, {language: "tsx"}).value.replaceAll("    ", "\t")

        const CURSOR = document.createTextNode("|");
        const CHAR_DELAY = 150;

        codeElement.current.innerHTML = "";

        const pointer = {
            displayedParentNode: codeElement.current as Node,
            hiddenNode: hiddenCodeElement.childNodes[0],
            currentChar: 0,
            complete: false,
            delay: CHAR_DELAY
        }

            
        startTypewriter()


        function startTypewriter() {
            createStarterCode();
            createTimeout();
        }


        // Continues typing until bottom of page or all text is typed, whichever is first
        function createTimeout() {
            setTimeout(() => {
                type(pointer);
                if (!codeElement.current) return;

                    const codeElementRect = codeElement.current.getBoundingClientRect();
                    const codeElementEnd = codeElementRect.y + codeElementRect.height;

                if (pointer.complete || codeElementEnd > window.innerHeight + window.innerHeight * 0.05) {
                    console.log("END")
                } else {
                    createTimeout();
                }
            }, pointer.delay)
        }

        // Pastes in code until at least 40% of the screen is filled, with some extra noise added in
        function createStarterCode() {
            if (!codeElement.current) return;
            let codeElementRect = codeElement.current.getBoundingClientRect();
            let codeElementEnd = codeElementRect.y + codeElementRect.height;
            const minimumHeight = Math.random() * 2 / 10 + 0.6;
            console.log(minimumHeight)
            while (codeElementEnd < window.innerHeight * minimumHeight) {
                type(pointer, false);

                codeElementRect = codeElement.current.getBoundingClientRect();
                codeElementEnd = codeElementRect.y + codeElementRect.height;
                console.log(codeElementEnd)
            }

            for (let i = 0; i < 100; i++) {
                type(pointer)
            }
        }

        // Type the next character / tag, runs on timeouts until all of hiddenCodeElement is typed into codeElement
        // Starts at first child of hiddenCodeElement
        // Decides next node (hiddenNode) to type by doing a depth first search: 1. Itself, 2. First Child, 3.Next sibling, 3. Parent's next sibling
        function type(pointer: {displayedParentNode: Node, hiddenNode: Node, currentChar: number, complete: boolean, delay: number}, characterTyping: boolean=true) {
            if (!codeElement.current) return;

            if (pointer.displayedParentNode.lastChild === CURSOR) {
                pointer.displayedParentNode.removeChild(CURSOR)
            }
            
            const hiddenParentNode = pointer.hiddenNode.parentNode as Node;
            let hiddenNodeIndex = pointer.displayedParentNode.childNodes.length;
            const displayedParentParentNode = pointer.displayedParentNode.parentNode as Node;

            let newDelay = CHAR_DELAY;

            // If text node, type char by char, otherwise paste the whole tag
            if (pointer.hiddenNode.nodeType === Node.TEXT_NODE && characterTyping) {
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
                        newDelay = 0;
                    }
                    
                    onEnd();
                    return;
                }

                pointer.currentChar = 0
            } else {
                pointer.displayedParentNode.appendChild(pointer.hiddenNode.cloneNode(false));
                newDelay = 0;
            }

            // Go to next stage in the DFS
            if (pointer.hiddenNode.hasChildNodes()) { 
                pointer.hiddenNode = pointer.hiddenNode.childNodes[0];
                pointer.displayedParentNode = pointer.displayedParentNode.childNodes[hiddenNodeIndex];
            } else if (hiddenParentNode.childNodes.length > hiddenNodeIndex + 1) {
                pointer.hiddenNode = hiddenParentNode.childNodes[hiddenNodeIndex + 1];
            } else if (pointer.displayedParentNode !== codeElement.current && (hiddenParentNode.parentNode as Node).childNodes.length > displayedParentParentNode.childNodes.length) {
                pointer.displayedParentNode = displayedParentParentNode;
                pointer.hiddenNode = (hiddenParentNode.parentNode as Node).childNodes[displayedParentParentNode.childNodes.length]
            } else {
                pointer.complete = true;
                return;
            }

            onEnd();
        
            function onEnd() {

                if (newDelay !== 0) {
                    pointer.displayedParentNode.appendChild(CURSOR);
                }
                pointer.delay = newDelay;
            }
        }
    }, [typewriterCode])

    return (
        <pre className="h-full overflow-hidden">
            <code ref={codeElement} className="select-none pointer-events-none text-2xl transition-opacity ease-in-out duration-[3s]">
            
            </code>
        </pre>
    )

}