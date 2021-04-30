/* Global Variables */


// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=b53d468a72fe2c52ac5fc52b3083705a'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', performAction);


// function called by event Listner

function performAction(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
    .then(function (weatherData){
        const temperature = weatherData.temp;
        const feeling = feelings;
        postData('/addWeather', {
            temp: temperature, date: newDate, feeling: feeling
            })
            .then(() => {
                updateUI()
            });
    });
};

// function to Get Web API Data
const getWeather = async (baseURL, zip, apiKey) => {
    // build URL into fetch call
    const response = await fetch(baseURL + zip + apiKey)
    //  call API
    try{
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    // Handle Error
    }catch(error){
        console.log('error', error);
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
    const request = await fetch('/all');
    const allData = await request.json();
    try{
        newDates.innerHTML = `Date: ${allData.newEntry[allData.newEntry.length-1].date}`;
        newTemp.innerHTML = `Temperature: ${allData.newEntry[allData.newEntry.length-1].temp}`;
        newContent.innerHTML = `I'm feeling: ${allData.newEntry[allData.newEntry.length-1].feelings}`;
    } catch(error){
        console.log("error", error);
    }
};
