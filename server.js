// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('bodyParser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 8000;

const server = app.listen(port, () => {
    console.log('server running'); 
    console.log(`running on localhost: ${port}`);
})

// GET Function

app.get('/allData', (request, response) => {
    console.log('Retrieve projectData');
    response.send(projectData);
});

// POST Function

let data = [];

app.post('/addWeather', (request, response) => {
    console.log(request.body);
    projectData = request.body;
    response.send(projectData);
});
