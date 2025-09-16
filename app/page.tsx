'use client'

import { Cutive_Mono } from "next/font/google";
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { createElement, useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import getRandomModule, { moduleNameMap } from "./utils/typewriterModules";

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
    console.log(`Running typewriter module ${typewriterModule.module}`);
    moduleNameMap[typewriterModule.module](typewriter)
    typewriter.pauseFor(3000)
    .deleteAll(1)
    .callFunction(() => {
      setTypewriterModule({module: getRandomModule()})
    })
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
      <div className={`h-full ${cutiveMono.className}`}>
        <div className="grid grid-cols-[1fr_1fr_1fr] h-100 items-center">
          <div className="text-left self-start text-lg h-100 overflow-y-scroll mr-9">
            <p className="flex gap-3 text-text-title">Running: <span className="text-link">{typewriterModule.module}</span> {createElement(typewriterPlaying ? Pause : Play, {onClick: (() => setTypewriterPlaying(!typewriterPlaying)), className: "my-auto"})}</p>
            <hr className="border-dashed"/>
            <Typewriter
              options={{
                cursor: "▮"
              }}
              onInit={(typewriter) => {
                typewriter.start()
                .changeDeleteSpeed(1)
                setTypewriter(typewriter)
              }}
            />
          </div>
          <div className="">
            <pre className="text-lg text-center whitespace-pre py-12 text-text-title">{getFullName()}</pre>
            <p className="text-3xl">Pushing web design to its limits.</p>
          </div>
        </div>
        <div className="mt-15">
          <p>About me</p>
        </div>
      </div>
    </>
  );
}