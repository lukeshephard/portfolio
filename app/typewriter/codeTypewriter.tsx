import { useEffect, useRef, useState } from "react";
import 'highlight.js/styles/github-dark.css'; // Needs changing for light mode
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import codeList from "./typewriterDemos";

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

export default function CodeTypewriter() {
    const codeElement = useRef<HTMLElement>(null);

    // Cycle through typing code
    useEffect(() => {

        const hiddenCodeElement = document.createElement("code")
        hiddenCodeElement.innerHTML = hljs.highlight(codeList[0], {language: "tsx"}).value
        // recursivelyType(hiddenCodeElement.childNodes[0])
        console.log(hiddenCodeElement.childNodes)
        console.log(hiddenCodeElement.children[7].childNodes[1].textContent)

        const allNodes: Node[] = [];
        console.log(allNodes)

        const pointer = {
            displayedParentNode: codeElement.current as Node,
            hiddenNode: hiddenCodeElement.childNodes[0],
            finished: false
        }

        const interval = setInterval(() => type(pointer), 75)
        function type(pointer: {displayedParentNode: Node, hiddenNode: Node, finished: boolean}) {
            if (pointer.finished || !codeElement.current) return;
            


            const hiddenParentNode = pointer.hiddenNode.parentNode as Node;
            const hiddenNodeIndex = pointer.displayedParentNode.childNodes.length;

            console.log(pointer.hiddenNode, hiddenNodeIndex);

            const displayedParentParentNode = pointer.displayedParentNode.parentNode as Node;

            pointer.displayedParentNode.appendChild(pointer.hiddenNode.cloneNode(false));


            if (pointer.hiddenNode.hasChildNodes()) { // 1. Next child
                console.log(1)
                pointer.hiddenNode = pointer.hiddenNode.childNodes[0];
                pointer.displayedParentNode = pointer.displayedParentNode.childNodes[hiddenNodeIndex];
                //console.log(pointer.hiddenNode, pointer.displayedParentNode, hiddenNodeIndex)
            } else if (hiddenParentNode.childNodes.length > hiddenNodeIndex + 1) { // 2. Next sibling
                console.log(2)
                pointer.hiddenNode = hiddenParentNode.childNodes[hiddenNodeIndex + 1];
            } else if (pointer.displayedParentNode !== codeElement.current && (hiddenParentNode.parentNode as Node).childNodes.length > displayedParentParentNode.childNodes.length) { // 3. Next parent's sibling
                console.log(3,  displayedParentParentNode.childNodes.length)
                pointer.displayedParentNode = displayedParentParentNode;
                pointer.hiddenNode = (hiddenParentNode.parentNode as Node).childNodes[displayedParentParentNode.childNodes.length]
            } else {
                clearInterval(interval)
            }
            
            // console.log(codeElement.current?.innerHTML)
        }
    }, [])


    return (
        <pre className="h-full overflow-hidden select-none pointer-events-none text-[2.5vh] transition-opacity ease-in-out duration-[3s]">
            <code ref={codeElement}>
            
            </code>
        </pre>
    )

}