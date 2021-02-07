// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'a4dc5a01d56a79d90c555f8f638b801b';

// Function called by event listener 
let justDoIt = event => {
    // Added trim() to remove surrounding spaces in zip field
    const newZip = document.getElementById('zip-code').value.trim();
    const userResponse = document.getElementById('feelings').value;
    const rawDate = new Date();
    // Formate date more pretty with additional handling for 1 digit minutes
    let currentDate = '';
    if (rawDate.getMinutes < 10) {
        currentDate = `${rawDate.getDate()}.${rawDate.getMonth()}.${rawDate.getFullYear()} ${rawDate.getHours()}:0${rawDate.getMinutes()}`;
    }
    else {
        currentDate = `${rawDate.getDate()}.${rawDate.getMonth()}.${rawDate.getFullYear()} ${rawDate.getHours()}:${rawDate.getMinutes()}`;
    }
    getWeather(baseURL, newZip, apiKey)
    .then(function(weatherData) {
        const temperature = `${weatherData.main.temp.toFixed(0)}°C`;
        const postData = {
            temperature: temperature,
            date: currentDate,
            userResponse: userResponse
        };
        postWeather('/add', postData);
    })
    .then(function() {
        getPostedWeather('/all');
    })
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', justDoIt);

// Function to GET Web API Data
const getWeather = async (baseURL, zip, apiKey) => {
    const result = await fetch(`${baseURL}${zip},de&appid=${apiKey}&units=metric`);
    try {
        const weatherData = await result.json();
        console.log(weatherData);
        return weatherData;
    }
    catch(error) {
        console.log('Something went wrong: ', error);
    }
}

/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //Body of request must match 'Content-Type' header
        body: JSON.stringify(data),
    });
    try {
        const newData = await response;
        return newData;
    }
    catch(error) {
        console.log('Something went wrong while POST: ', error);
    }
}

/* Function to GET Project Data */
const getPostedWeather = async (url = '') => {
    const response = await fetch(url);
    try {
        const allData = await response.json();
        //choose slice instead of index "-1" to choose last element because slice takes in comparison only 5% of the time
        const lastEntry = allData.slice(-1)[0];
        document.getElementById('date').innerHTML = lastEntry.date;
        document.getElementById('temperature').innerHTML = lastEntry.temperature;
        document.getElementById('content').innerHTML = lastEntry.userResponse;
        console.log(lastEntry);
    }
    catch(error) {
        console.log('Something went wrong while GET: ', error);
    }
}