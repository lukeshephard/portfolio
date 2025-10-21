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
        setTypewriterCode(codeList[2])//codeList[Math.floor(Math.random() * codeList.length)]);
    }, [])


    // Cycle through typing code
    useEffect(() => {
        if (!codeElement.current || typewriterCode === null) return;



        const hiddenCodeElement = document.createElement("code")
        hiddenCodeElement.innerHTML = hljs.highlight(typewriterCode, {language: "tsx"}).value.replaceAll("    ", "\t")

        const CURSOR = document.createTextNode("|");
        const CHAR_DELAY = 200;

        codeElement.current.innerHTML = "";

        const pointer = {
            displayedParentNode: codeElement.current as Node,
            hiddenNode: document.createTextNode("") as Node,
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

        // Pastes in code until at least BASE_HEIGHTvh of the screen is filled, with some extra noise added in
        function createStarterCode() {
            if (!codeElement.current) return;

            const BASE_HEIGHT = 0.5;
            const HEIGHT_NOISE = 0.2;
            const LINE_NOISE = Math.floor(Math.random() * 100);
            const START_INDEX = Math.floor(Math.random() * hiddenCodeElement.childNodes.length * 0.4)

            for (let i = 0; i < START_INDEX; i++) {
                hiddenCodeElement.removeChild(hiddenCodeElement.firstChild as ChildNode);
            } 
            pointer.hiddenNode = hiddenCodeElement.childNodes[0];

            let codeElementRect = codeElement.current.getBoundingClientRect();
            let codeElementEnd = codeElementRect.y + codeElementRect.height;

            const minimumHeight = (Math.random() * HEIGHT_NOISE * 10) / 10 + BASE_HEIGHT;
            console.log(minimumHeight)
            while (codeElementEnd < window.innerHeight * minimumHeight) {
                type(pointer, false);

                codeElementRect = codeElement.current.getBoundingClientRect();
                codeElementEnd = codeElementRect.y + codeElementRect.height;
                console.log(codeElementEnd)
            }

            for (let i = 0; i < LINE_NOISE; i++) {
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

    // TEXT SIZES WITH MAX CHARS = 110
    //
    // 1280 -> LG
    // 1536 -> XL
    return (
        <pre className="h-full overflow-hidden">
            <code ref={codeElement} className="select-none pointer-events-none text-md md:text-lg xl:text-2xl 2xl:text-[1.5vw] transition-opacity ease-in-out duration-[3s]">
            
            </code>
        </pre>
    )

}