import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { useEffect, useState } from "react";
import availableCode, { typeCode } from './typewriterCodeDisplay';
import 'highlight.js/styles/github-dark.css'; // Needs changing for light mode

enum TypewriterState {
    running,
    fadeOut,
}

export default function CodeTypewriter() {
    const [typewriter, setTypewriter] = useState<TypewriterClass | undefined>();
    const [typewriterState, setTypewriterState] = useState(TypewriterState.running);
    const [typewriterPlaying, setTypewriterPlaying] = useState(true);
    
    const [typewriterHidden, setTypewriterHidden] = useState(true);

    // Should match duration time
    const TYPEWRITER_FADE_TIME = 3000;

    // Pausing and playing the typewriter
    useEffect(() => {
        if (typewriter === undefined) {
        return;
        }

        if (typewriterPlaying) {
        console.log("ran")
        const cursors = document.getElementsByClassName("Typewriter__cursor__disabled");
        if (cursors.length > 0) {
            typewriter.start();
            cursors[0].className = "Typewriter__cursor"
        }
        } else {
        const cursors = document.getElementsByClassName("Typewriter__cursor");
        if (cursors.length > 0) {
            typewriter.stop();
            cursors[0].className = "Typewriter__cursor__disabled"
        }
        }
    }, [typewriter, typewriterPlaying])


    // Cycle through typing code
    useEffect(() => {
        if (typewriter === undefined) {
            return;
        }

        switch (typewriterState) {
            case TypewriterState.running:
                setTypewriterHidden(false);
                typeCode(typewriter, availableCode[0], "<span class=\"hljs-tag\">‹<span class=\"hljs-name\">main")
                // typeCode(typewriter, availableCode[1], "<span class=\"hljs-keyword\">function</span>")

                typewriter.pauseFor(5000);
                typewriter.callFunction(() => {
                    setTypewriterState(TypewriterState.fadeOut)
                })
                break;
            case TypewriterState.fadeOut:
                setTypewriterHidden(true);
                typewriter.pauseFor(TYPEWRITER_FADE_TIME);
                typewriter.callFunction(() => {
                    setTypewriterState(TypewriterState.running);
                })
                break;
        }
    }, [typewriter, typewriterState])


    return (
        <code className={`select-none pointer-events-none text-[2.5vh] transition-opacity ease-in-out duration-[3s] ${typewriterHidden ? "opacity-0" : "opacity-100"}`}>
            <Typewriter
                options={{
                cursor: "▮",
                }}
                onInit={(typewriter) => {
                typewriter.start()
                setTypewriter(typewriter)
                }}
            />
        </code>
    )

}