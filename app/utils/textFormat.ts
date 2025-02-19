// Used for keeping the text format the same across all areas of the website, to keep consistency.

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function formatDate(date: Dayjs) { // Returns the given date as a string in a special format
    if (!date.isValid()) {
        return "ERROR_INVALID_DATE"
    }
    
    return `${date.fromNow()} (${date.format("DD/MM/YYYY")})`
}