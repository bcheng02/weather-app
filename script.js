const img = document.querySelector('img');
const searchBar = document.getElementById('search')
const tempInC = document.getElementById('tempInC')
const tempInF = document.getElementById('tempInF')
const currentCondition = document.getElementById('currentCondition')
const btn = document.querySelector('button')

let userLocation = ''


function getSearch() {
    userLocation = searchBar.value
}

async function getWeather() {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3e4ca77f7e714797b21183350231907&q=${userLocation}`,  { mode: 'cors' })
        const responseJSON = await (response.json())
        console.log(responseJSON)
    
        tempInC.textContent = responseJSON.current.temp_c + " °C"
    
    
        tempInF.textContent = responseJSON.current.temp_f + " °F"
    
        currentCondition.textContent = responseJSON.current.condition.text
    
        img.src = "http:" + responseJSON.current.condition.icon
    } catch (error){
        alert("invalid location, please enter a city (or the API is down 😔)")
    }

}

btn.addEventListener("click", () => {getSearch(), getWeather()})


getSearch()
getWeather()
