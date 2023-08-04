import { useState } from "react"
import getWeather from "../utils/weatherApi"
import SearchBar from "./SearchBar"
import Navbar from "./Navbar"
import logo from '../images/weather-logo.svg'




function WeatherCard() {
    let [weatherData, setWeatherData] = useState(null)
    let [resultsAndTime, setResultsAndTime] = useState("123 results in 321 sec")
    // TODO:more states for all the data 
    // let [imgSrc, setImgSrc] = 

    async function handleSearch(userLocation) {
        try {
            const data = await getWeather(userLocation)
            setWeatherData(data[0])
            setResultsAndTime(data[1])
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <div id="top">
                <img id="logo" src={logo} alt="the word 'weather' in the style of the Google logo"></img>
                <SearchBar onClickSearch={handleSearch} />
                <Navbar />
            </div>


            <div id="weatherCard">
                <div id="resultsAndTime">
                    {resultsAndTime}
                </div>

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
        </>
    )
}

export default WeatherCard