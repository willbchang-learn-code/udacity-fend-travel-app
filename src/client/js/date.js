import moment from "moment";

export function isFormatDate(aDate) {
    return moment(aDate, 'MM/DD/YYYY', true).isValid();
}

export function isFutureDate(aDate) {
    return moment(aDate).isAfter(today())
}

export function getCountdownDays(aDate) {
    return moment(aDate).diff(moment(today()), 'day')
}

function today() {
    return moment(new Date()).format("MM/DD/YYYY");
}
