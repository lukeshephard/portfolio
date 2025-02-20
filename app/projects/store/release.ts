import { formatDate } from "@/app/utils/textFormat";
import dayjs, { Dayjs } from "dayjs";

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
        let latestReleaseText = `Not released yet`;

        if (this.getDate().isValid()) {
            latestReleaseText =  `${this.getFullVersion()} | ${formatDate(this.getDate())}`
        }

        return latestReleaseText;
    }

}