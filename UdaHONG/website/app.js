/* Global Variables */
const apiKey = '&appid=7c8724bf9317c9b285846a922636715f';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';


// Create a new date instance dynamically with JS
let currentDate = new Date();
let newDate = currentDate.getMonth() + '.' + currentDate.getDate() + '.' + currentDate.getFullYear();


//Eventlistener for generate click

document.getElementById('generate').addEventListener('click', performAction);

// get user input values

function performAction(e) {
    const zip = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;

    getWeather(baseURL, zip, apiKey)
        .then((userData) => {
            postData('/add', {
                date: newDate,
                temp: userData.main.temp,
                feelings
            })
        }).then((newData) => {
            updateUI()
        })
    //reset form
    form.reset();
}


// Get data from API
const getWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL + zip + apiKey)
    try {
        const userData = await res.json();
        return userData;
    } catch (error) {
        console.log('error', error);
    }
}


// Function to POST data 
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credential: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            feelings: data.feelings
        })
    })

    try {
        const newData = await req.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};


// Function to update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()
        document.querySelector('#date').innerHTML = allData.date;
        document.querySelector('#temp').innerHTML = allData.temp;
        document.querySelector('#content').innerHTML = allData.content;
    } catch (error) {
        console.log('error', error);
    };
}