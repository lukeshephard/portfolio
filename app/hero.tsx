"use client"
import { Archive } from "lucide-react";
import Link from "next/link";
import { shadowsIntoLight } from "./fonts";

export default function Hero() {
    return (
        <div className="backdrop-blur-md px-9 rounded-4xl md:p-9 md:border-1">
            {/* <pre className="text-sm text-center whitespace-pre text-logo py-12">{getFullName()}</pre> */}
            <h1 className={`text-4xl md:text-6xl md:text-7xl 2xl:text-8xl text-logo md:py-12 ${shadowsIntoLight.className}`}>Luke Shephard</h1>
            <h2 className={`text-xl md:text-xl md:text-2xl md:text-3xl 2xl:text-5xl py-6`}>Software Engineer specialising in Web Development.</h2> 
            <div className="flex justify-center">
              <h3 className="md:text-md md:text-Wxl 2xl:text-3xl">Final-Year Computer Science student looking for graduate roles. </h3>
            </div>
            <Link href={"/projects"} className="text-xl mt-12 block w-33 justify-center m-auto border-[2px] p-3 rounded-2xl flex items-center text-text hover:text-link-hover active:text-link-active no-underline">
                <Archive className="mr-1 size-6"/>Projects
            </Link>
        </div>
    )  
}