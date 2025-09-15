'use client'

import { Cutive_Mono, IBM_Plex_Mono, VT323 } from "next/font/google";

const ibmPlexMono = Cutive_Mono({
  subsets: ["latin"],
  weight: "400"
})

// About me page
export default function Home() {

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
    <div className={`h-full flex justify-center flex-col ${ibmPlexMono.className}`}>
      <pre className="text-lg items-center text-center whitespace-pre py-12 text-text-title">{getFullName()}</pre>
      <p className="text-3xl">Pushing the web design to its limits.</p>
    </div>
    </>
  );
}