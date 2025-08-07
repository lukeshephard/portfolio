'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavbarItem({name, icon, customLink}: {name: string, icon: ReactNode, customLink?: string}) { // A list item on the nav bar
    const selected = usePathname() === "/" + (customLink !== undefined? customLink : name.toLowerCase());

    return (
        <li className="list-none">
            <Link href={"/" + (customLink !== undefined? customLink : name.toLowerCase())} className={`flex gap-2 [&>svg]:mt-auto [&>svg]:mb-auto no-underline ${selected? "text-amber-400" : "text-white"}`}>{icon}{name}</Link>
        </li>
    )
}