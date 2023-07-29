const img = document.getElementById('currentImg');
const searchBar = document.getElementById('search')

const resultAmountAndTime = document.getElementById('resultAmountAndTime')

const currentTemp = document.getElementById('currentTemp')
const currentCondition = document.getElementById('currentCondition')
const btn = document.querySelector('button')

let userLocation = ''


function getSearch() {
    userLocation = searchBar.value
}

// get and spit out weather info from API + time it
async function getWeather() {
    let startTime = performance.now()
    let endTime 

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4f67568db80d4e5fa41205347232807&q=${userLocation}&days=7`,  { mode: 'cors' })
        const responseJSON = await (response.json())

        endTime = performance.now()


        // playing around with outputs
        console.log(responseJSON)
        console.log(responseJSON.forecast.forecastday) // arr of 7 days


    
        // displaying values on HTML
        currentTemp.textContent = responseJSON.current.temp_c 
        currentCondition.textContent = responseJSON.current.condition.text
        img.src = "http:" + responseJSON.current.condition.icon

    } catch (error){
        console.log(error)
        alert(
            "Invalid location, please enter:" +
            "\n\u2022 city name e.g: Paris" +
            "\n\u2022 Latitude and Longitude (Decimal degree) e.g: 48.8567,2.3508" +
            "\n\u2022 US zip e.g.: 10001" + 
            "\n\u2022 UK postcode e.g: SW1" + 
            "\n\u2022 Canada postal code e.g: G2J" + 
            "\n\u2022 metar:<metar code> e.g: metar:EGLL" + 
            "\n\u2022 iata:<3 digit airport code> e.g: iata:DXB" + 
            "\n\u2022 auto:ip IP lookup e.g: auto:ip" + 
            "\n\u2022 IP address (IPv4 and IPv6 supported) e.g: 100.0.0.1" +
            "\n\u2022 (or the API is down 😔)"
            )
    }   
    resultAmountAndTime.textContent = `About 1 result (${(endTime - startTime)/1000} seconds)`
    
}

btn.addEventListener("click", () => {getSearch(), getWeather()})


getSearch()
getWeather()


// useful later

