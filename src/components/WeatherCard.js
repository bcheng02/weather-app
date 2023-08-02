import getWeather from "../utils/weatherApi"

// maybe this will be the prop fcn and it'll take userLocation??
function WeatherCard() {

    return (
        <div id="weatherCard">
            <div id="resultsAndTime">5 results in 123 seconds</div>

            <div>
                <span><img id="currentImg" src="#" alt="an icon for the current weather"></img></span>

                <span id="currentTemp" className="unit_temp"></span>

                <span>°C </span> | <span>°F</span>


                <span>
                    <div id="precip" className="unit_precip">Precipitation: </div>
                    <div id="humidity" className="unit_humidity">Humidity: </div>
                    <div id="wind" className="unit_wind">Wind: </div>
                </span>
            </div>

            <div>
                <div>Weather</div>
                <div id="currentDate">placeholder for current date</div>
                <div id="currentCondition"></div>
            </div>

            {/* TODO: component */}
            <div id="graphContainer">
                <span>Temperature</span> <span>|</span> <span>Precipitation</span> <span>|</span> <span>Wind</span>
                <div id="graph">**graph goes here eventually</div>
            </div>

            <div id="weeklyWeatherContainer">
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun blah blah</span>
            </div>

            <a href="https://www.weatherapi.com/" title="Free Weather API">weatherapi.com</a> • <a>Feedback</a>
        </div>
    )
}

export default WeatherCard