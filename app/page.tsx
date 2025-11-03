import CodeTypewriter from "./typewriter/codeTypewriter";
import { Archive, Code, ScrollText } from "lucide-react";
import Link from "next/link";
import Hero from "./hero";

// About me page
export default function Home() {
  return (
    <>
      <CodeTypewriter/>
      <div className="flex flex-col md:h-[calc(100vh-var(--spacing)*18)] justify-between">
        <div className="flex flex-col md:flex-grow justify-center items-center text-center">
          <Hero/>
        </div>
        <div className="pt-10 md:p-0 text-xs md:text-sm 2xl:text-lg mb-3 z-10">
          <hr className="mb-3 md:hidden" />
          <p>Version 1.0.0-alpha.3 - XXXX-XX-XX</p>
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