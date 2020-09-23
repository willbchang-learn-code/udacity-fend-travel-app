import {isFutureDate, isFormatDate, getCountdownDays} from "./js/date.js";
import {onClick, getUserInput, updateUI} from "./js/ui.js";
import {postData} from "./js/fetch.js";
import "./styles/style.scss"


onClick('generate', async () => {
    const {destination, departing} = getUserInput();
    if (!isValidateInfo(destination, departing)) return;
    const clientData = {destination, departing, countdownDays: getCountdownDays(departing)};
    const serverData = await postData('/userData', clientData);
    updateUI(serverData);

    function isValidateInfo(aDestination, aDeparting) {
        if (aDestination === '') return alert('Please enter a city name!');
        if (!isFormatDate(aDeparting)) return alert('Please enter a valid date format!');
        if (!isFutureDate(aDeparting)) return alert('Please enter a date after today!');
        return true
    }
});


