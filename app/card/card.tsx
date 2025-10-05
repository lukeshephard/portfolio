import { ReactNode } from "react";

export default function Card({title, classname, children, mainTitle=false}: {title: string, classname?: string, children?: ReactNode, mainTitle?: boolean}) {
    return (
        <div className={(classname? classname : "") + "py-10 flex flex-col items-center gap-y-10"}>
            {mainTitle? <h1 className="text-6xl text-text-title no-underline">{title}</h1> : <h2 className="text-6xl text-text-title no-underline">{title}</h2>}
            {children}
        </div>
    )
}