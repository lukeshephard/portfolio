import { FormatDate } from "@/app/utils/formatDate";
import dayjs, { Dayjs } from "dayjs";
import { ReactNode } from "react";

export class Release { // A release of a project
    private version: string;
    private title: string;
    private date: Dayjs;

    constructor(version: string, title: string, timestamp: number) {
        this.version = version;
        this.title = title;
        this.date = dayjs.unix(timestamp);
    }

    getTitle() {
        return this.title;
    }

    getVersion() {
        return this.version
    }

    getDate() {
        return this.date;
    }

    getFullVersion() {
        let latestReleaseText = `Not released yet`;
        if (this.getDate().isValid()) {
            latestReleaseText = `${this.getVersion()}${this.getTitle() != "" ? ` - ${this.getTitle()}` : ""}`
        }
        return latestReleaseText
    }

    getText() {
        let latestReleaseText: ReactNode = `Not released yet`;

        if (this.getDate().isValid()) {
            latestReleaseText =  <span>{this.getFullVersion()} | <FormatDate date={this.getDate()}/></span> 
        }

        return latestReleaseText;
    }

}