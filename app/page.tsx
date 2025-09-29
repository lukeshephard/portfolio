'use client'

import { Cutive_Mono, Shadows_Into_Light } from "next/font/google";
import Typewriter, { TypewriterClass } from 'typewriter-effect';
import { useEffect, useState } from "react";
import 'highlight.js/styles/github-dark.css'; // Needs changing for light mode
import typewriterCodeDisplay from "./utils/typewriterCodeDisplay";

const cutiveMono = Cutive_Mono({
  subsets: ["latin"],
  weight: "400"
})

const shadowsIntoLight = Shadows_Into_Light({
    weight: "400",
    subsets: ["latin"]
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
      <div className={`absolute w-screen h-full z-0 text-5xl saturate-60 contrast-60 blur-[1.5px] text-left self-start overflow-y-scroll ${cutiveMono.className}`}>
        <pre className="h-full overflow-hidden" id="codeBox">
          <code className="select-none pointer-events-none text-[2.5vh]">
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
        <div className="backdrop-blur-md backdrop-opacity-100 rounded-4xl p-9 mt-27">
          {/* <pre className="text-lg text-center whitespace-pre text-logo py-12">{getFullName()}</pre> */}
          <p className={`text-9xl text-logo py-12 ${shadowsIntoLight.className}`}>Luke Shephard</p>
          <p className={`text-6xl py-6`}>Software Engineer specialising in Web Development.</p> 
          <div className="flex justify-center">
            <p className="text-3xl">Final-Year Computer Science student looking for graduate roles. </p>
          </div>
        </div>
      </div>
    </>
  );
}