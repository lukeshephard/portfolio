// website-template v1.2

import React from "react";

export class NameLink {
    private label: string;
    private link: string;
    private enabled: boolean;
    
    constructor(label: string, link: string, enabled?: boolean) {
        this.label = label;
        this.link = link;
        this.enabled = enabled == undefined ? true : enabled;
    }

    getLabel() {
        return this.label;
    }
    
    getLink() {
        return this.link;
    }

    generateElement(): React.JSX.Element { // Opens in new tab
        if (!this.enabled) {
            return <></>
        }
        return <a key={this.getLabel()} href={this.getLink()} target="_blank">{this.getLabel()}</a> // ADDED _blank TARGET FOR NEW TAB
    }
}
