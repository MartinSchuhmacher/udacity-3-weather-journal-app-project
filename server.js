/* Dependencies */
// Express to run server and routes
const express = require('express');
// Body-Parser and Cors for Middleware
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors);

// Initialize the main project folder (with client-side code)
app.use(express.static('website'));

// Setup Port to use for Server
const port = 3000;

// Callback to debug
let listening = () => {
    console.log(`INFO: server running smoothly on localhost: ${port}`);
}

// Spin up the server
const server = app.listen(port, listening);

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route


//TODO
let addEntry = request => {
    let newData = request.body;
    let newEntry = {
        temperatur: newData.temperatur,
        date: newData.date,
        userResponse: newData.userResponse
    }
    projectData.push(newEntry);
}

app.get('/all', (req, res) => res.send(projectData));
app.post('/add', addEntry);

