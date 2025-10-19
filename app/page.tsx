'use client'

import { Cutive_Mono, Shadows_Into_Light } from "next/font/google";
import CodeTypewriter from "./typewriter/codeTypewriter";
import { Archive, Code, Link, ScrollText } from "lucide-react";

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
      <div className="flex flex-col md:h-[calc(100vh-var(--spacing)*18)] justify-between">
        <div className="flex flex-col md:flex-grow justify-center items-center text-center">
          <div className="backdrop-blur-md backdrop-opacity-100 px-9 rounded-4xl md:p-9 md:border-1">
            {/* <pre className="text-sm text-center whitespace-pre text-logo py-12">{getFullName()}</pre> */}
            <h1 className={`text-4xl md:text-6xl md:text-7xl 2xl:text-8xl text-logo md:py-12 ${shadowsIntoLight.className}`}>Luke Shephard</h1>
            <h2 className={`text-xl md:text-xl md:text-2xl md:text-3xl 2xl:text-5xl py-6`}>Software Engineer specialising in Web Development.</h2> 
            <div className="flex justify-center">
              <h3 className="md:text-md md:text-xl 2xl:text-3xl">Final-Year Computer Science student looking for graduate roles. </h3>
            </div>
            <Link href={"/projects"} className="text-xl mt-12 block w-33 justify-center m-auto border-[2px] p-3 rounded-2xl flex items-center text-text hover:text-link-hover active:text-link-active no-underline"><Archive className="mr-1 size-6"/>Projects</Link>
          </div>
        </div>
        <div className="pt-10 md:p-0 text-xs md:text-sm 2xl:text-lg mb-3">
          <hr className="mb-3 md:hidden" />
          <p>Version 0.5.2 - 2025-10-18</p>
          <div className="flex justify-center gap-3">
            <a className="flex justify-center" target="_blank" rel="noopener noreferrer" href="https://github.com/lukeshephard/portfolio"><Code className="my-auto mr-1"/>Repository</a>
            <p> | </p>
            <a className="flex justify-center" target="_blank" rel="noopener noreferrer" href="https://github.com/lukeshephard/portfolio/blob/main/CHANGELOG.md"><ScrollText className="my-auto mr-1"/>Changelog</a>
          </div>
        </div>
      </div>
    </>
  );
}