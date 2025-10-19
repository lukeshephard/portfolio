import { ReactNode } from "react";

export default function CardArray({children}: {children: ReactNode[]}) {
    const modifiedCards: ReactNode[] = [];
    for (let i = 0; i < children.length; i++) {
        modifiedCards.push(<div key={"card " + i} className={i % 2 === 0 ? "bg-background" : "bg-background-alt"}>{children[i]}</div>)
    }
    return (
        <div className="w-full">
            {modifiedCards}
        </div>
    )
}