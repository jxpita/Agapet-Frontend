import { parseISO,format, addHours } from "date-fns";


export const convertEvent = (events=[]) => {
 
    return events.map(event=>{

        event.start=addHours(parseISO(event.start),5) ;
        event.end=addHours(parseISO(event.end),5) ;

        return event;
    })
}
