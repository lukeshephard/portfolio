import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function formatDate(date: Dayjs) {
    if (!date.isValid()) {
        return "ERROR_INVALID_DATE"
    }
    
    return `${date.fromNow()} (${date.format("DD/MM/YYYY")})`
}