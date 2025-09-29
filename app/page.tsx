'use client'

import { Cutive_Mono, Shadows_Into_Light } from "next/font/google";
import CodeTypewriter from "./typewriter/codeTypewriter";

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
  return (
    <>
      <div className={`absolute w-screen h-full z-0 text-5xl saturate-60 contrast-60 blur-[1.5px] text-left self-start overflow-y-scroll ${cutiveMono.className}`}>
        <pre className="h-full overflow-hidden" id="codeBox">
          <CodeTypewriter/>
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