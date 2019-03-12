// provides some utilities for storing and parsing our dates
// we use this instead of the native JS stuff because we're not concerned with the added
// complexity of time.

// parses dates from the 'MM/DD/YYYY' US format.
export function parseDate(str) {
    var dateSplit = str.split('/');
    return new Date(dateSplit[2], dateSplit[0]-1, dateSplit[1]);
}

// returns amount of days between two dates
// divides by the quantity of one day in milliseconds to avoid daylight saving time influencing the result. 
export function dateDiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}
