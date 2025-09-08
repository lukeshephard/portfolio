import { ReactNode } from "react";

export default function Card({title, classname, children}: {title: string, classname?: string, children: ReactNode}) {
    return (
        <div className={(classname? classname : "") + " w-screen py-10 flex flex-col items-center gap-y-10"}>
            <h2 className="text-4xl text-text-title">{title}</h2>
            {children}
        </div>
    )
}