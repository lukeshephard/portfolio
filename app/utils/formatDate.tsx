'use client'

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

dayjs.extend(relativeTime)

setInterval(updateDates, 60000)
const dates: DateUpdater[] = [];


class DateUpdater { // Takes dates and their set methods for updating
    private date: Dayjs
    private setMethod: Dispatch<SetStateAction<string>>

    constructor(date: Dayjs, setMethod: Dispatch<SetStateAction<string>>) {
        this.date = date;
        this.setMethod = setMethod;
    }

    getDate() {
        return this.date;
    }

    getSetMethod() {
        return this.setMethod;
    }
}

function updateDates() { // Updates global date array when the interval goes off
    console.log("updating " + dates.length + " dates...")
    for (const date of dates) {
        date.getSetMethod()(date.getDate().fromNow());
    }

}

export function FormatDate({date} : {date: Dayjs}) { // Returns the given date as a string in a special format
    const [isClient, setIsClient] = useState(false)
    const [dateString, setDateString] = useState(date.fromNow())

    useEffect(() => {
        setIsClient(true)
        dates.push(new DateUpdater(date, setDateString))
    }, [])

    if (!date.isValid()) {
        return "ERROR_INVALID_DATE"
    }
    
    return isClient ? `${dateString} (${date.format("DD/MM/YYYY")})` : `Getting date...`
}