'use client'

import { Cutive_Mono, Geist } from "next/font/google";
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { createElement, useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import getRandomModule, { codeDisplay, moduleNameMap } from "./utils/typewriterModules";
import 'highlight.js/styles/github-dark.css'; // Needs changing for light mode

const cutiveMono = Cutive_Mono({
  subsets: ["latin"],
  weight: "400"
})

// About me page
export default function Home() {

  const [typewriter, setTypewriter] = useState<TypewriterClass | undefined>()
  const [typewriterPlaying, setTypewriterPlaying] = useState(true);
  const [typewriterModule, setTypewriterModule] = useState<{module: string}>({module: Object.keys(moduleNameMap)[0]})

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
    // console.log(`Running typewriter module ${typewriterModule.module}`);
    // moduleNameMap[typewriterModule.module](typewriter)
    // typewriter.pauseFor(3000)
    // .deleteAll(1)
    // .callFunction(() => {
    //   setTypewriterModule({module: getRandomModule()})
    // })

    codeDisplay(typewriter, getFullName.toString())
  }, [typewriter, typewriterModule])

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
      <div className={`h-full`}>
          <div className={`absolute w-screen h-screen z-0 text-5xl saturate-60 contrast-60 blur-xs text-left self-start h-100 overflow-y-scroll ${cutiveMono.className}`}>            {/* <p className="flex gap-3 text-text-title">{typewriterPlaying ? "Running" : "Paused"} <span className="text-link">{typewriterModule.module}</span> {createElement(typewriterPlaying ? Pause : Play, {onClick: (() => setTypewriterPlaying(!typewriterPlaying)), className: "my-auto text-text-title"})}</p> */}
            {/* <hr className="border-dashed"/> */}
            <pre className="text-wrap">
              <code className="select-none pointer-events-none inert">
                <Typewriter
                  options={{
                    cursor: "▮",
                  }}
                  onInit={(typewriter) => {
                    typewriter.start()
                    .changeDelay(30)
                    setTypewriter(typewriter)
                  }}
                />
              </code>
            </pre>
          </div>
        <div className="flex flex-col justify-center items-center z-10 mt-9">
          <div className="backdrop-blur-xl backdrop-opacity-100 rounded-4xl py-6 px-6">
            <pre className="text-lg text-center whitespace-pre text-logo py-12">{getFullName()}</pre>
            <p className="text-3xl py-6">Computer Science Student | Aspiring Web Developer</p> 
            <div className="flex justify-center">
              <p className="w-1/2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quisquam corrupti voluptate aut labore rem deleniti adipisci aliquam dolorum laboriosam architecto cumque esse praesentium saepe eligendi debitis enim, quasi commodi!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}