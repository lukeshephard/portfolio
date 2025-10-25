"use client"

import { useEffect, useRef, useState } from "react";
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import codeList from "./typewriterDemos";

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

enum TypewriterState {
    PLAYING,
    PAUSED,
    COMPLETE,
    HIDDEN
}

export default function CodeTypewriter() {
    const [typewriterCode, setTypewriterCode] = useState<string | null>(null);
    const [typewriterState, setTypewriterState] = useState<TypewriterState>(TypewriterState.HIDDEN);
    const codeElement = useRef<HTMLElement>(null);

    useEffect(() => {
        setTypewriterCode(codeList[Math.floor(Math.random() * codeList.length)]);
        setTypewriterState(TypewriterState.PLAYING);
    }, [])

    useEffect(() => {
        if (!codeElement.current) return;
        if (typewriterState === TypewriterState.COMPLETE) {
            if (window.innerHeight < 200) {
                return;
            }

            setTimeout(() => {
                setTypewriterState(TypewriterState.HIDDEN);
                setTimeout(() => {
                    setTypewriterState(TypewriterState.PLAYING);
                    setTypewriterCode(codeList[Math.floor(Math.random() * codeList.length)]);
                }, 3000)
            }, 5000);
        }

    }, [typewriterState])


    // Cycle through typing code
    useEffect(() => {
        if (!codeElement.current || typewriterCode === null || typewriterState !== TypewriterState.PLAYING) return;

        const hiddenCodeElement = document.createElement("code")
        hiddenCodeElement.innerHTML = hljs.highlight(typewriterCode, {language: "tsx"}).value.replaceAll("    ", "\t")

        const CURSOR = document.createTextNode("|");
        const CHAR_DELAY = 200;

        codeElement.current.innerHTML = "";

        const pointer = {
            displayedParentNode: codeElement.current as Node,
            hiddenNode: document.createTextNode("") as Node,
            currentChar: 0,
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
                if (!codeElement.current) return;

                const complete = type(pointer);

                if (complete) {
                    setTypewriterState(TypewriterState.COMPLETE);
                    console.log("stopped");
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
            const LINE_NOISE = Math.floor(Math.random() * 30);
            const START_INDEX = Math.floor(Math.random() * hiddenCodeElement.childNodes.length * 0.7)

            for (let i = 0; i < START_INDEX; i++) {
                hiddenCodeElement.removeChild(hiddenCodeElement.firstChild as ChildNode);
            } 
            pointer.hiddenNode = hiddenCodeElement.childNodes[0];

            let codeElementRect = codeElement.current.getBoundingClientRect();
            let codeElementEnd = codeElementRect.y + codeElementRect.height;

            const minimumHeight = (Math.random() * HEIGHT_NOISE * 10) / 10 + BASE_HEIGHT;
            let complete = false;
            console.log(minimumHeight)
            while (!complete && codeElementEnd < window.innerHeight * minimumHeight) {
                complete = type(pointer, false);
                

                codeElementRect = codeElement.current.getBoundingClientRect();
                codeElementEnd = codeElementRect.y + codeElementRect.height;
                console.log(codeElementEnd)
            }

            if (complete) {
                setTypewriterState(TypewriterState.COMPLETE);
                return;
            }

            for (let i = 0; i < LINE_NOISE; i++) {
                type(pointer)
            }
        
        }

        // Type the next character / tag, runs on timeouts until all of hiddenCodeElement is typed into codeElement
        // Starts at first child of hiddenCodeElement
        // Decides next node (hiddenNode) to type by doing a depth first search: 1. Itself, 2. First Child, 3.Next sibling, 3. Parent's next sibling
        function type(pointer: {displayedParentNode: Node, hiddenNode: Node, currentChar: number, delay: number}, characterTyping: boolean=true): boolean {
            if (!codeElement.current) return false;

            if (pointer.displayedParentNode.lastChild === CURSOR) {
                pointer.displayedParentNode.removeChild(CURSOR)
            }

            const hiddenParentNode = pointer.hiddenNode.parentNode as Node;
            let hiddenNodeIndex = pointer.displayedParentNode.childNodes.length;
            const displayedParentParentNode = pointer.displayedParentNode.parentNode as Node;

            let newDelay = CHAR_DELAY;

            // If text node, type char by char, otherwise paste the whole tag
            if (pointer.hiddenNode.nodeType === Node.TEXT_NODE) {
                if (characterTyping) {
                    const text = pointer.hiddenNode.textContent as string;
                    let char = text[pointer.currentChar];
                    if (char === "\t") {
                        char = "    ";
                    }
                    hiddenNodeIndex = pointer.displayedParentNode.childNodes.length - 1;

                    if (pointer.currentChar !== text.length) {
                        if (pointer.currentChar === 0) {
                            pointer.displayedParentNode.appendChild(document.createTextNode(char));
                        } else {
                            pointer.displayedParentNode.childNodes[hiddenNodeIndex].textContent += char;
                        }

                        pointer.currentChar += 1;
                        
                        onEnd();
                        return false;
                    }

                    pointer.currentChar = 0
                } else {
                    const textNode = pointer.hiddenNode.cloneNode(false);
                    textNode.textContent = (textNode.textContent as string).replaceAll("\t", "    ")
                    pointer.displayedParentNode.appendChild(textNode);
                    newDelay = 0;
                }

            } else {
                pointer.displayedParentNode.appendChild(pointer.hiddenNode.cloneNode(false));
                newDelay = 0;
            }
                        
            const codeElementRect = codeElement.current.getBoundingClientRect();
            const codeElementEnd = codeElementRect.y + codeElementRect.height;
            if (codeElementEnd > window.innerHeight + window.innerHeight * 0.05) {
                return true;
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
                return true;
            }

            onEnd();

            return false;
        
            function onEnd() {

                if (newDelay !== 0) {
                    pointer.displayedParentNode.appendChild(CURSOR);
                }
                pointer.delay = newDelay;
            }
        }
    }, [typewriterCode, typewriterState])

    // TEXT SIZES WITH MAX CHARS = 110
    //
    // 1280 -> LG
    // 1536 -> XL
    return (
        <pre className="h-full overflow-hidden">
            <code ref={codeElement} className={`select-none pointer-events-none text-md md:text-lg lg:text-2xl 2xl:text-[1.5vw] transition-opacity ease-in-out duration-[3s] ${typewriterState === TypewriterState.HIDDEN ? "opacity-0" : "opacity-100"}`}>
            
            </code>
        </pre>
    )

}