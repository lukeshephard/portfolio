'use client'

import { Archive, ScrollText } from "lucide-react";
import { Cutive_Mono, Shadows_Into_Light } from "next/font/google";
import Link from "next/link";
import pk from "../package.json";

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
    <div className="flex flex-col lg:h-[calc(100vh-var(--spacing)*18)] justify-between">
      <div className="flex flex-col lg:flex-grow justify-center items-center text-center z-10">
        <div className="backdrop-blur-md backdrop-opacity-100 px-9 rounded-4xl lg:p-9 lg:border-1">
          {/* <pre className="text-lg text-center whitespace-pre text-logo py-12">{getFullName()}</pre> */}
          <h1 className={`text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl text-logo lg:py-12 ${shadowsIntoLight.className}`}>Luke Shephard</h1>
          <h2 className={`text-xl sm:text-xl md:text-2xl lg:text-3xl 2xl:text-5xl py-6`}>Software Engineer specialising in Web Development.</h2> 
          <div className="flex justify-center">
            <h3 className="sm:text-md lg:text-xl 2xl:text-3xl">Final-Year Computer Science student looking for graduate roles. </h3>
          </div>
          <Link href={"/projects"} className="text-3xl mt-12 block w-45 justify-center m-auto bg-background-alt p-3 rounded-2xl flex items-center text-text hover:text-link-hover active:text-link-active"><Archive className="mr-1 size-9"/>Projects</Link>
        </div>
      </div>
      <div className="pt-10 lg:p-0 text-xs lg:text-xl mb-3">
        <p>Version {pk.version} - 01/10/2025</p>
        <a className="flex justify-center" target="_blank" href="https://github.com/lukeshephard/personal-website/blob/main/CHANGELOG.md"><ScrollText className="my-auto mr-1"/>Changelog</a>
      </div>
    </div>
  );
}