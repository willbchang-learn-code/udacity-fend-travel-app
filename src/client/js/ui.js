export function onClick(elementID, callback) {
    document.getElementById(elementID).addEventListener('click', callback)
}

export function getUserInput() {
    const destination = document.getElementById('destination').value;
    const departing = document.getElementById('departing').value;
    return {destination, departing};
}

export function updateUI(aData) {
    document.getElementById('app').innerHTML += `
        <div class="holder entry">
            <ul>
                <li class="title">My Trip to <div class="location">${aData.destination}</div></li>
                <li class="title">Departing <div class="departing">${aData.departing}</div></li>
                <li><div class="location">${aData.destination}</div> is <div id="countdown-date">${aData.countdownDays} </div>day(s) away.</li>
                <li>Typical weather for then is:</li>
                <li>High: ${aData.temperatureHigh}<div id="temp-high"></div> Low: <div id="temp-low">${aData.temperatureLow}</div></li>
                <li>${aData.summary}</li>
                <li><img src="${aData.imageUrl}" alt="${aData.destination}"></li>
              </ul>
        </div>`;
}