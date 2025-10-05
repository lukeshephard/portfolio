"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavbarItem({name, icon, activeIcon, customLink}: {name: string, icon: ReactNode, activeIcon: ReactNode, customLink?: string}) { // A list item on the nav bar
    const selected = usePathname() === "/" + (customLink !== undefined? customLink : name.toLowerCase());

    return (
        <li className="list-none">
            <Link href={"/" + (customLink !== undefined? customLink : name.toLowerCase())} className={`flex gap-1 [&>svg]:mt-auto [&>svg]:mb-auto no-underline hover:text-link-hover active:text-link-active justify-center ${selected? "text-link font-semibold [&>svg]:stroke-3" : "text-text-title"}`}>{selected? activeIcon : icon}{name}</Link>
        </li>
    )
}