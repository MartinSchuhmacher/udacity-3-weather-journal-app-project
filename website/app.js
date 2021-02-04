// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'a4dc5a01d56a79d90c555f8f638b801b';

// Function called by event listener 
let justDoIt = event => {
    const newZip = document.getElementById('zip-code').value;
    const userResponse = document.getElementById('feelings').value;
    const currentDate = new Date();
    getWeather(baseURL, newZip, apiKey)
    .then(function(weatherData) {
        const temperature = weatherData.main.temp;
        const postData = {
            temperature: temperature,
            date: currentDate,
            userResponse: userResponse
        };
        postWeather('/add', postData)
    })
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', justDoIt);

// Function to GET Web API Data
const getWeather = async (baseURL, zip, apiKey) => {
    const result = await fetch(`${baseURL}${zip},de&appid=${apiKey}`);
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
        console.log(newData);
        return newData;
    }
    catch(error) {
        console.log('Something went wrong while POST: ', error);
    }
}

/* Function to GET Project Data */