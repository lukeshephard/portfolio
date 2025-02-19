import dayjs, { Dayjs } from "dayjs";

export class Release {
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

}