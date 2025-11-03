"use client"

import { createElement, useEffect, useRef, useState } from "react";
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import codeList from "./typewriterDemos";
import { geistMono } from "../fonts";
import { ReceiptTurkishLiraIcon } from "lucide-react";

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
    const [typewriterState, setTypewriterState] = useState<TypewriterState>(TypewriterState.COMPLETE);
    const hiddenCodeElement = useRef<HTMLElement | null>(null);
    const codeElement = useRef<HTMLElement>(null);
    const pointer = useRef<{displayedParentNode: Node, hiddenNode: Node, currentChar: number, delay: number, cursor: Node} | null>(null);

    const CHAR_DELAY = 200;
    const HIDDEN_TIME = 1500; // MUST MATCH ELEMENT TRANSITION TIME IN CSS

    useEffect(() => {
        if (!codeElement.current) return;
        codeElement.current.innerHTML = hljs.highlight(codeList[Math.floor(Math.random() * codeList.length)], {language: "tsx"}).value.replaceAll("    ", "\t");
        const a = Math.floor(Math.random() * codeElement.current.childNodes.length * 0.5);
        console.log(a, codeElement.current.childNodes.length)
        for (let i = 0; i < a; i++) {
            codeElement.current.removeChild(codeElement.current.firstChild as Node)
        }
        hiddenCodeElement.current = document.createElement("code")
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
                    if (!codeElement.current) return;
                    codeElement.current.innerHTML = "";
                    pointer.current = {
                        displayedParentNode: codeElement.current as Node,
                        hiddenNode: document.createTextNode("") as Node,
                        currentChar: 0,
                        delay: CHAR_DELAY,
                        cursor: document.createTextNode("|")
                    }
                    setTypewriterState(TypewriterState.PLAYING);
                    setTypewriterCode(codeList[Math.floor(Math.random() * codeList.length)]);
                }, HIDDEN_TIME)
            }, 5000);
        }

    }, [typewriterState])


    // Cycle through typing code
    useEffect(() => {
        if (!codeElement.current || !hiddenCodeElement.current || typewriterCode === null) return;
        if (typewriterState !== TypewriterState.PLAYING && typewriterState !== TypewriterState.PAUSED) {return;}

        console.log(typewriterCode, typewriterState, pointer.current?.displayedParentNode.childNodes.length)
        startTypewriter()

        function startTypewriter() {
            console.log("a")
            if (pointer.current === null) return;
                console.log("b")
            if (pointer.current.displayedParentNode.childNodes.length === 0) {
                createStarterCode();
            }
            if (typewriterState === TypewriterState.PLAYING) {
                createTimeout();
            }
        }


        // Continues typing until bottom of page or all text is typed, whichever is first
        function createTimeout() {
            if (pointer.current === null) return;
            setTimeout(() => {
                if (!codeElement.current) return;

                const complete = type();

                if (complete) {
                    setTypewriterState(TypewriterState.COMPLETE);
                    console.log("stopped");
                } else if (typewriterState === TypewriterState.PLAYING) {
                    createTimeout();
                }
            }, pointer.current.delay)
        }

        // Pastes in code until at least BASE_HEIGHTvh of the screen is filled, with some extra noise added in
        function createStarterCode() {
            if (!codeElement.current || !hiddenCodeElement.current|| typewriterCode === null || pointer.current === null) return;

            const BASE_HEIGHT = 0.3;
            const HEIGHT_NOISE = 0.2;
            const LINE_NOISE = Math.floor(Math.random() * 30);
        
            hiddenCodeElement.current = document.createElement("code")
            hiddenCodeElement.current.innerHTML = hljs.highlight(typewriterCode, {language: "tsx"}).value.replaceAll("    ", "\t")

            const START_INDEX = Math.floor(Math.random() * hiddenCodeElement.current.childNodes.length * 0.7)

            for (let i = 0; i < START_INDEX; i++) {
                hiddenCodeElement.current.removeChild(hiddenCodeElement.current.firstChild as ChildNode);
            } 
            pointer.current.hiddenNode = hiddenCodeElement.current.childNodes[0];

            let codeElementRect = codeElement.current.getBoundingClientRect();
            let codeElementEnd = codeElementRect.y + codeElementRect.height;

            const minimumHeight = (Math.random() * HEIGHT_NOISE * 10) / 10 + BASE_HEIGHT;
            let complete = false;
            console.log(minimumHeight)
            while (!complete && codeElementEnd < window.innerHeight * minimumHeight) {
                complete = type();
                

                codeElementRect = codeElement.current.getBoundingClientRect();
                codeElementEnd = codeElementRect.y + codeElementRect.height;
            }

            if (complete) {
                setTypewriterState(TypewriterState.COMPLETE);
                return;
            }

            for (let i = 0; i < LINE_NOISE; i++) {
                type()
            }
        
        }

        // Type the next character / tag, runs on timeouts until all of hiddenCodeElement is typed into codeElement
        // Starts at first child of hiddenCodeElement
        // Decides next node (hiddenNode) to type by doing a depth first search: 1. Itself, 2. First Child, 3.Next sibling, 3. Parent's next sibling
        function type(characterTyping: boolean=true): boolean {
            if (!codeElement.current || pointer.current === null) return false;

            if (pointer.current.displayedParentNode.lastChild === pointer.current.cursor) {
                pointer.current.displayedParentNode.removeChild(pointer.current.cursor)
            }

            const hiddenParentNode = pointer.current.hiddenNode.parentNode as Node;
            let hiddenNodeIndex = pointer.current.displayedParentNode.childNodes.length;
            const displayedParentParentNode = pointer.current.displayedParentNode.parentNode as Node;

            let newDelay = CHAR_DELAY;

            // If text node, type char by char, otherwise paste the whole tag
            if (pointer.current.hiddenNode.nodeType === Node.TEXT_NODE) {
                if (characterTyping) {
                    const text = pointer.current.hiddenNode.textContent as string;
                    let char = text[pointer.current.currentChar];
                    if (char === "\t") {
                        char = "    ";
                    }
                    hiddenNodeIndex = pointer.current.displayedParentNode.childNodes.length - 1;

                    if (pointer.current.currentChar !== text.length) {
                        if (pointer.current.currentChar === 0) {
                            pointer.current.displayedParentNode.appendChild(document.createTextNode(char));
                        } else {
                            pointer.current.displayedParentNode.childNodes[hiddenNodeIndex].textContent += char;
                        }

                        pointer.current.currentChar += 1;
                        
                        onEnd();
                        return false;
                    }

                    pointer.current.currentChar = 0
                } else {
                    const textNode = pointer.current.hiddenNode.cloneNode(false);
                    textNode.textContent = (textNode.textContent as string).replaceAll("\t", "    ")
                    pointer.current.displayedParentNode.appendChild(textNode);
                    newDelay = 0;
                }

            } else {
                pointer.current.displayedParentNode.appendChild(pointer.current.hiddenNode.cloneNode(false));
                newDelay = 0;
            }
                        
            const codeElementRect = codeElement.current.getBoundingClientRect();
            const codeElementEnd = codeElementRect.y + codeElementRect.height;
            if (codeElementEnd > window.innerHeight + window.innerHeight * 0.05) {
                return true;
            }

            // Go to next stage in the DFS
            if (pointer.current.hiddenNode.hasChildNodes()) { 
                pointer.current.hiddenNode = pointer.current.hiddenNode.childNodes[0];
                pointer.current.displayedParentNode = pointer.current.displayedParentNode.childNodes[hiddenNodeIndex];
            } else if (hiddenParentNode.childNodes.length > hiddenNodeIndex + 1) {
                pointer.current.hiddenNode = hiddenParentNode.childNodes[hiddenNodeIndex + 1];
            } else if (pointer.current.displayedParentNode !== codeElement.current && (hiddenParentNode.parentNode as Node).childNodes.length > displayedParentParentNode.childNodes.length) {
                pointer.current.displayedParentNode = displayedParentParentNode;
                pointer.current.hiddenNode = (hiddenParentNode.parentNode as Node).childNodes[displayedParentParentNode.childNodes.length]
            } else {
                return true;
            }

            onEnd();

            return false;
        
            function onEnd() {
                if (pointer.current === null) return;
                if (newDelay !== 0) {
                    pointer.current.displayedParentNode.appendChild(pointer.current.cursor);
                }
                pointer.current.delay = newDelay;
            }
        }
    }, [typewriterCode, typewriterState, pointer])

    return (
      <div className={`absolute w-screen h-full top-0  z-0  text-left self-start overflow-y-scroll saturate-75 contrast-75 blur-[2px] lg:blur-[2.5px] 2xl:blur-[0.15vw]}`}>
        <pre className="h-full overflow-hidden">
            <code ref={codeElement} className={`select-none pointer-events-none text-md md:text-lg lg:text-2xl 2xl:text-[1.5vw] transition-opacity ease-in-out duration-[1.5s] ${typewriterState === TypewriterState.HIDDEN ? "opacity-0" : "opacity-100"}`}></code>
        </pre>
      </div>
    )

}