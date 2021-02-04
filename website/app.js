// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'a4dc5a01d56a79d90c555f8f638b801b';

// Function called by event listener 
let justDoIt = event => {
    const newZip = document.getElementById('zip-code').value;
    getWeather(baseURL, newZip, apiKey);
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', justDoIt);


/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, apiKey) => {
    const result = await fetch(`${baseURL}${zip},de&appid=${apiKey}`);
    try {
        const data = await result.json();
        console.log(data);
    }
    catch(error) {
        console.log('Something went wrong: ', error);
        //additional error handling?
    }
}

/* Function to POST data */


/* Function to GET Project Data */