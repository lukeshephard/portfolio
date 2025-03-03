'use client'
// Used for keeping the text format the same across all areas of the website, to keep consistency.

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { useEffect, useState } from "react";

dayjs.extend(relativeTime)

export function FormatDate({date} : {date: Dayjs}) { // Returns the given date as a string in a special format
    const [isClient, setIsClient] = useState(false)
    const [dateString] = useState(date.fromNow())

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!date.isValid()) {
        return "ERROR_INVALID_DATE"
    }
    
    return isClient ? `${dateString} (${date.format("DD/MM/YYYY")})` : `Getting date...`
}