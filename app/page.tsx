'use client'

import { Cutive_Mono } from "next/font/google";
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { useEffect, useState } from "react";
import 'highlight.js/styles/github-dark.css'; // Needs changing for light mode
import typewriterCodeDisplay from "./utils/typewriterCodeDisplay";

const cutiveMono = Cutive_Mono({
  subsets: ["latin"],
  weight: "400"
})

// About me page
export default function Home() {

  const [typewriter, setTypewriter] = useState<TypewriterClass | undefined>();
  const [typewriterPlaying, setTypewriterPlaying] = useState(true);

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

  useEffect(() => {
    if (typewriter === undefined) {
      return;
    }

    typewriterCodeDisplay(typewriter)
  }, [typewriter])


  const firstName =
`##         ##      ##  ##      ##  ##########
##         ##      ##  ##    ##    ##        
##         ##      ##  ##  ##      ##        
##         ##      ##  ####        ##########
##         ##      ##  ##  ##      ##        
##         ##      ##  ##    ##    ##        
#########    ######    ##      ##  ##########`

  const lastName =
`  ########  ##      ##  ##########  ########    ##      ##    ######    ########    ########  
##          ##      ##  ##          ##      ##  ##      ##  ##      ##  ##      ##  ##      ##
##          ##      ##  ##          ##      ##  ##      ##  ##      ##  ##      ##  ##      ##
##########  ##########  ##########  ########    ##########  ##########  ########    ##      ##
        ##  ##      ##  ##          ##          ##      ##  ##      ##  ##  ##      ##      ##
        ##  ##      ##  ##          ##          ##      ##  ##      ##  ##    ##    ##      ##
########    ##      ##  ##########  ##          ##      ##  ##      ##  ##      ##  ########  `


  function getFullName() {
    const firstNameLines = firstName.split("\n");
    const namePadding = `              ` // space = 2 char = 10 space = 2 (total 14)
    const lastNameLines = lastName.split("\n");

    let fullNameString = "";

    for (let i = 0; i < firstNameLines.length; i++) {
      if (i !== 0) {
        fullNameString += "\n"
      }
      fullNameString = fullNameString + firstNameLines[i] + namePadding + lastNameLines[i]
    }

    return fullNameString;
  }

  return (
    <>
      <div className={`absolute w-screen h-[calc(100vh-var(--spacing)*18-1px)] z-0 text-5xl saturate-60 contrast-60 blur-[1.5px] text-left self-start overflow-y-scroll ${cutiveMono.className}`}>
        <pre className="text-wrap h-full overflow-hidden" id="codeBox">
          <code className="select-none pointer-events-none text-3xl">
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
        </pre>
      </div>
      <div className="flex flex-col justify-center items-center z-10">
        <div className="backdrop-blur-xl backdrop-opacity-100 rounded-4xl py-6 px-6 mt-27">
          <pre className="text-lg text-center whitespace-pre text-logo py-12">{getFullName()}</pre>
          <p className="text-3xl py-6 text-center">Computer Science Student | Aspiring Web Developer</p> 
          <div className="flex justify-center">
            <p className="w-1/2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quisquam corrupti voluptate aut labore rem deleniti adipisci aliquam dolorum laboriosam architecto cumque esse praesentium saepe eligendi debitis enim, quasi commodi!</p>
          </div>
        </div>
      </div>
    </>
  );
}