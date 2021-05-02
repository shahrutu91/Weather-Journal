/* Global Variables */


// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=metric&appid=b53d468a72fe2c52ac5fc52b3083705a'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', performAction);


// function called by event Listner

function performAction(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
    .then(function (weatherData){
        const temperature = weatherData.main.temp;
        const feeling = feelings;
        postData('http://localhost:8000/addWeather', {
            temp: temperature, date: newDate, feeling: feeling
            })
            .then(() => {
                updateUI()
            });
    });
};

// function to Get Web API Data
const getWeather = async (baseURL, zip, apiKey) => {
    // input Validation
    if (zip == '') {
        alert('Please enter zip code in XXXXXX format');  
    }else{
        // build URL into fetch call
        const response = await fetch(baseURL + zip + apiKey)
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    }
};

// function to POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        // boiler Plate 
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const newWeatherData = await response.json();
        console.log(newWeatherData);
        return newWeatherData;
    }catch(error){
        console.log('error', error);
    }
};

// Function To GET ProjectData
const getData = async (url='') =>{
    const request = await fetch(url);
    try {
        const allData = await request.json();
        console.log(allData);
        return allData;
    }
    catch(error){
        console.log('error', error);
    }
};

const newDates = document.getElementById('date');
const newTemp = document.getElementById('temp');
const newContent = document.getElementById('content');

// function to update UI
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/allData');
    const allData = await request.json();
    try{
        newDates.innerHTML = `Date: ${allData.date}`;
        newTemp.innerHTML = `Temperature: ${allData.temp}`;
        newContent.innerHTML = `I'm feeling: ${allData.feeling}`;
    } catch(error){
        console.log("error", error);
    }
};
