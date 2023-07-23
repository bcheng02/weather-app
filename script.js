const img = document.querySelector('img');

let userLocation = 'Vancouver'

// TODO:
// - try catch block, if invalid location throw an alert


async function getWeather() {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3e4ca77f7e714797b21183350231907&q=${userLocation}`,  { mode: 'cors' })
    const responseJSON = await (response.json())
    console.log(responseJSON)
    console.log(responseJSON.current.temp_c)
    console.log(responseJSON.current.condition.text)

    img.src = "http:" + responseJSON.current.condition.icon
}

getWeather()