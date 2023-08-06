import { useState, useEffect } from "react"
import getWeather from "../utils/weatherApi"
import SearchBar from "./SearchBar"
import Navbar from "./Navbar"
import logo from '../images/weather-logo.svg'
import { format, getHours, parseISO } from "date-fns"

import ChartComponent from "./Graph"




function WeatherCard() {
    const tabs = ["Temperature", "Precipitation", "Wind"]
    let [weatherData, setWeatherData] = useState([])
    let [resultsAndTime, setResultsAndTime] = useState("123 results in 321 sec")
    let [imgSrc, setImgSrc] = useState('')
    let [currentTemp, setcurrentTemp] = useState('12345')

    let [precip, setPrecip] = useState('placeholder for precip')
    let [humidity, setHumidity] = useState('placeholder for humidity')
    let [wind, setWind] = useState('placeholder for wind')
    let [currDate, setCurrDate] = useState('placeholder for current date')
    let [currCond, setCurrCond] = useState('placeholder for current condition')

    let [cardImg1, setCardImg1] = useState('')
    let [cardImg2, setCardImg2] = useState('')
    let [cardImg3, setCardImg3] = useState('')
    let [cardImg4, setCardImg4] = useState('')
    let [cardImg5, setCardImg5] = useState('')
    let [cardImg6, setCardImg6] = useState('')
    let [cardImg7, setCardImg7] = useState('')

    let [selectedCard, setSelectedCard] = useState(0)
    let [selectedTab, setSelectedTab] = useState(0)



    // TODO: why break when this is state
    var data


    // TODO: see why the fcn calls twice on page load
    useEffect(() => {
        handleSearch('Vancouver')
    }, [])

    async function handleSearch(userLocation) {
        try {
            data = await getWeather(userLocation)
            setWeatherData(data)
        } catch (error) {
            throw error
        }

        let currentDate = parseISO(data[0].current.last_updated)
        let currentHour = getHours(currentDate)
        let currentHourObj = data[0].forecast.forecastday[0].hour[currentHour]

        setResultsAndTime(data[1])
        setImgSrc("http:" + currentHourObj.condition.icon)
        setcurrentTemp(currentHourObj.temp_c)
        setPrecip(currentHourObj.chance_of_rain)
        setHumidity(currentHourObj.humidity)
        setWind(currentHourObj.wind_kph)
        setCurrCond(currentHourObj.condition.text)
        setCurrDate(format(currentDate, "EEEE h:00 aaaa"))

        setCardImg1(data[0].forecast.forecastday[1].day.condition.icon)
        setCardImg2(data[0].forecast.forecastday[2].day.condition.icon)
        setCardImg3(data[0].forecast.forecastday[3].day.condition.icon)
        setCardImg4(data[0].forecast.forecastday[4].day.condition.icon)
        setCardImg5(data[0].forecast.forecastday[5].day.condition.icon)
        setCardImg6(data[0].forecast.forecastday[6].day.condition.icon)
        setCardImg7(data[0].forecast.forecastday[7].day.condition.icon)
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
                    <span><img id="currentImg" src={imgSrc} alt="an icon for the current weather"></img></span>

                    <span id="currentTemp" className="unit_temp">{currentTemp}</span>

                    <span>°C </span> | <span>°F</span>


                    <span>
                        <div id="precip" className="unit_precip">Precipitation: {precip}%</div>
                        <div id="humidity" className="unit_humidity">Humidity: {humidity}%</div>
                        <div id="wind" className="unit_wind">Wind: {wind} km/h</div>
                    </span>
                </div>

                <div>
                    <div>Weather</div>
                    <div id="currentDate">{currDate}</div>
                    <div id="currentCondition">{currCond}</div>
                </div>

                <div id="graphContainer">
                    {tabs.map((tab, index) => (
                        <span
                            key={tab}
                            onClick={() => {
                                setSelectedTab(index)

                            }}
                            className={selectedTab == index ? 'active' : null}
                        >
                            {tab}
                        </span>
                    ))}

                    <ChartComponent weatherData={weatherData} selectedTab={selectedTab} />
                    {/* maybe conditional rendering based on selectedTab == 0,1,2 */}
                </div>

                <div id="weekForecast">
                    {weatherData.length > 0 &&
                        weatherData[0].forecast.forecastday.map((weatherObj, index) => (
                            <div
                                key={"card-" + index}
                                onClick={() => setSelectedCard(index)}
                                className={selectedCard == index ? 'active' : null}
                            >
                                {format(parseISO(weatherObj.date), "E")}
                                {index == 0 ? <img src={imgSrc} /> : <img src={eval("cardImg" + index)} />}
                                <div>
                                    <span>{weatherObj.day.maxtemp_c}°</span>

                                    <span> {weatherObj.day.mintemp_c}°</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <a href="https://www.weatherapi.com/" title="Free Weather API">weatherapi.com</a> • <a>Feedback</a>


            </div>
        </>
    )
}

export default WeatherCard