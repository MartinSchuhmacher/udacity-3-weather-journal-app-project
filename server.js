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
app.use(cors());

// Initialize the main project folder (with client-side code)
app.use(express.static('website'));

// Setup Port to use for Server
const port = 3000;

// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log(`INFO: server running smoothly on localhost: ${port}`);
}

// Initialize all route with a callback function
app.get('/all', (req, res) => res.send(projectData));

// Callback function to complete GET '/all'

// Post Route
app.post('/add', addEntry);

function addEntry(request) {
    console.log(request.body);
    let newData = request.body;
    let newEntry = {
        temperature: newData.temperature,
        date: newData.date,
        userResponse: newData.userResponse
    }
    projectData.push(newEntry);
    console.log(projectData);
}