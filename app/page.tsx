'use client'

import { Cutive_Mono } from "next/font/google";
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { createElement, useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import getRandomModule from "./utils/typewriterModules";

const ibmPlexMono = Cutive_Mono({
  subsets: ["latin"],
  weight: "400"
})

// About me page
export default function Home() {

  const [typewriter, setTypewriter] = useState<TypewriterClass | undefined>()
  const [typewriterPlaying, setTypewriterPlaying] = useState(true);
  const [typewriterModule, setTypewriterModule] = useState<{module: ((typewriter: TypewriterClass) => void) | undefined}>({module: undefined})

  useEffect(() => {
    setTypewriterModule({module: getRandomModule()})
  }, [])

  useEffect(() => {
    if (typewriter === undefined) {
      return;
    }

    if (typewriterPlaying) {
      typewriter.start();
      const cursors = document.getElementsByClassName("Typewriter__cursor__disabled");
      if (cursors.length > 0) {
        cursors[0].className = "Typewriter__cursor"
      }
    } else {
      typewriter.stop();
      const cursors = document.getElementsByClassName("Typewriter__cursor");
      if (cursors.length > 0) {
        cursors[0].className = "Typewriter__cursor__disabled"
      }
    }
  }, [typewriterPlaying])

  useEffect(() => {
    if (typewriter === undefined || typewriterModule.module === undefined) {
      return;
    }
    console.log(`Running typewriter module ${typewriterModule.module.toString().split(" ")[1].split("(")[0]}`);
    typewriterModule.module(typewriter)
    typewriter.callFunction(() => {
      setTypewriterModule({module: getRandomModule()})
    })
    typewriter.pauseFor(3000)
    .deleteAll(1)
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
      <div className={`h-full ${ibmPlexMono.className}`}>
        <div className="grid grid-cols-[1fr_1fr_1fr] h-100 items-center">
          <div className="text-left self-start text-lg h-100 overflow-y-scroll">
            {createElement(typewriterPlaying ? Pause : Play, {onClick: (() => setTypewriterPlaying(!typewriterPlaying))})}
            <Typewriter
              options={{
                cursor: "▮"
              }}
              onInit={(typewriter) => {
                typewriter.start()
                .changeDeleteSpeed(1)

                typewriter.pasteString("GET / 200 in 224ms<br/>", null)
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