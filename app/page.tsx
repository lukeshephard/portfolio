'use client'

import { Archive, BookMarked, BoxSelect } from "lucide-react";
import Card from "./card/card";
import CardArray from "./card/cardArray";

// About me page
export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center text-text"> 
        <CardArray>
          <Card title="Hi. I'm Luke."></Card>
          <Card title="A Passionate Web Developer.">
              <p>I work hard on improving my programming skills every day. I enjoy turning ideas into reality through my projects.</p>
              <button className="border rounded-xl p-1 flex gap-2 cursor-pointer"><Archive/> Projects</button>
          </Card>
          <Card title="A Striving Go-Getter.">
              <p>I put 110% into the work I do, ensuring I achieve by best results.</p>
              <button className="border rounded-xl p-1 flex gap-2 cursor-pointer"><BoxSelect/> Experience</button>
          </Card>
          <Card title="A Motivated Student.">
              <p>I&apos;m a student whos eager to learn new skills and expand my knowledge to reach my full potentional.</p>
              <button className="border rounded-xl p-1 flex gap-2 cursor-pointer"><BookMarked/> Education</button>
          </Card>
        </CardArray>
      </div>
    </>
  );
}
