const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = "https://api.weatherapi.com"
const NUM_DAYS = 8


// returns arr w/ [weather info, time the API call]
async function getWeather(searchTerm) {
    let startTime = performance.now()
    let endTime

    try {
        const response = await fetch(`${API_URL}/v1/forecast.json?key=${API_KEY}&q=${searchTerm}&days=${NUM_DAYS}`, { mode: 'cors' })

        if (!response.ok) {
            throw new Error('unable to fetch weather data')
        }

        const responseJSON = await (response.json())

        endTime = performance.now()

        // playing around with outputs
        // console.log(responseJSON)
        // console.log(responseJSON.forecast.forecastday) // arr of 8 days

        function roundTwoDec(num) {
            return Math.round(num * 100) / 100
        }

        let resultMsg = (`About 1 result (${roundTwoDec((endTime - startTime) / 1000)} seconds)`)
        return [responseJSON, resultMsg]
    } catch (error) {
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
        throw (error)
    }

}

async function getLocationResults(searchTerm, setLcnRslts) {
    try {
        let response = await fetch(`${API_URL}/v1/search.json?key=${API_KEY}&q=${searchTerm}`)
        let responseJSON = await (response.json())

        // no results, keep the bottom border radius of search bar & don't apply active to results
        if (Array.isArray(responseJSON)) {
            // console.log(responseJSON)
            // console.log(responseJSON.forEach(x => console.log(`${x.name}, ${x.region}`)))
            setLcnRslts(responseJSON.map(lcn => `${lcn.name}, ${lcn.region}`))
        }
    } catch (error) {
        throw (error)
    }

}

export { getWeather, getLocationResults }