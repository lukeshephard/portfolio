// website-template v1.3

import Link from "next/link"
import { NameLink } from "./nameLink"
import React, { ReactNode } from "react"

export class NavLink extends NameLink {
    icon: ReactNode

    constructor(label: string, customLink?: string, icon?: ReactNode) {
        super(label, customLink ? customLink : "/" + label.toLowerCase().replace(" ", "-"))
        this.icon = icon;
    }    

    generateElement(): React.JSX.Element { // Returns as a NextJS Link Component
        return <Link key={this.getLabel()} className={this.icon ? "flex gap-3" : ""} href={this.getLink()}>{this.icon ? <span className="my-auto">{this.icon}</span> : null}{this.getLabel()}</Link>
    }
}