import { useState, useEffect, Fragment } from "react"
import { getWeather } from "../utils/weatherApi"
import { celToFar, kmhToMph } from "../utils/unitConversion"
import SearchBar from "./SearchBar"
import Navbar from "./Navbar"
import logo from '../images/weather-logo.svg'
import { format, getHours, parseISO } from "date-fns"

import ChartComponent from "./Graph"





function WeatherCard() {
    let [searchTerm, setSearchTerm] = useState('Vancouver')

    const tabs = ["Temperature", "Precipitation", "Wind"]
    let [weatherData, setWeatherData] = useState([])
    let [resultsAndTime, setResultsAndTime] = useState("123 results in 321 sec")

    let [isImperial, setisImperial] = useState(false)
    let [currentImgSrc, setCurrentImgSrc] = useState('https://cdn.weatherapi.com/weather/64x64/day/116.png')
    let [currentTemp, setCurrentTemp] = useState('20')
    let [precip, setPrecip] = useState('0')
    let [humidity, setHumidity] = useState('0')
    let [wind, setWind] = useState('0')
    let [currDate, setCurrDate] = useState('Monday 9:00 a.m.')
    let [currCond, setCurrCond] = useState('Sunny')

    let [cardImg0, setCardImg0] = useState('')
    let [cardImg1, setCardImg1] = useState('')
    let [cardImg2, setCardImg2] = useState('')
    let [cardImg3, setCardImg3] = useState('')
    let [cardImg4, setCardImg4] = useState('')
    let [cardImg5, setCardImg5] = useState('')
    let [cardImg6, setCardImg6] = useState('')
    let [cardImg7, setCardImg7] = useState('')

    let [selectedCard, setSelectedCard] = useState(0)
    let [selectedTab, setSelectedTab] = useState(0)

    let newArrOfColors = (Array(24).fill('#b5b5b5'))
    newArrOfColors[0] = '#555555'
    let [arrOfColors, setArrOfColors] = useState(newArrOfColors)


    let data


    // TODO: see why the fcn calls twice on page load
    useEffect(() => {
        handleSearch('Vancouver')
    }, [])

    async function handleSearch(x) {
        setSearchTerm(x)
        try {

            // use x instead of state searchTerm state since x is faster!!!
            data = await getWeather(x)
            setWeatherData(data)
        } catch (error) {
            return
        }

        let currentDate = parseISO(data[0].current.last_updated)
        let currentHour = getHours(currentDate)
        let currentHourObj = data[0].forecast.forecastday[0].hour[currentHour]

        setResultsAndTime(data[1])
        setCurrentImgSrc('https:' + data[0].current.condition.icon)


        // no setCurrentTemp(currentHourObj.temp_c), this is more accurate
        setCurrentTemp(data[0].current.temp_c)


        setPrecip(currentHourObj.chance_of_rain)
        setHumidity(currentHourObj.humidity)
        setWind(Math.round(currentHourObj.wind_kph))
        setCurrCond(data[0].current.condition.text)
        setCurrDate(format(currentDate, "EEEE h:00 aaaa"))

        setCardImg0('https:' + data[0].forecast.forecastday[0].day.condition.icon)
        setCardImg1('https:' + data[0].forecast.forecastday[1].day.condition.icon)
        setCardImg2('https:' + data[0].forecast.forecastday[2].day.condition.icon)
        setCardImg3('https:' + data[0].forecast.forecastday[3].day.condition.icon)
        setCardImg4('https:' + data[0].forecast.forecastday[4].day.condition.icon)
        setCardImg5('https:' + data[0].forecast.forecastday[5].day.condition.icon)
        setCardImg6('https:' + data[0].forecast.forecastday[6].day.condition.icon)
        setCardImg7('https:' + data[0].forecast.forecastday[7].day.condition.icon)
    }

    return (
        <>
            <div id="top" >
                <div id="logoAndSearch">
                    <img id="logo" src={logo} alt="the word 'weather' in the style of the Google logo"></img>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onClickSearch={handleSearch} />
                </div>
                <Navbar searchTerm={searchTerm} />

            </div>



            <div id="weatherCard">
                <div id="resultsAndTime">
                    {resultsAndTime}
                </div>

                <div id="mainInfo">
                    <div id="leftInfo">

                        <img id="currentImg" src={currentImgSrc} alt="an icon for the current weather"></img>

                        <span id="currentTemp" className="unit_temp">{Math.round(celToFar(currentTemp, isImperial))}</span>
                        <span id="celFarContainer">
                            <span
                                id="celciusTab"
                                onClick={() => setisImperial(false)}
                                style={
                                    isImperial ? { color: 'grey' } : { color: 'black', cursor: 'text' }
                                }
                            >°C
                            </span>
                            <span id="tempDivider">|</span>
                            <span
                                id="farenheitTab"
                                onClick={() => setisImperial(true)}
                                style={isImperial ? { color: 'black', cursor: 'text' } : { color: 'grey' }}
                            >°F
                            </span>
                        </span>



                        <span id="phwContainer">
                            <div id="precip" className="unit_precip">Precipitation: {precip}%</div>
                            <div id="humidity" className="unit_humidity">Humidity: {humidity}%</div>
                            <div id="wind" className="unit_wind">Wind: {Math.round(kmhToMph(wind, isImperial))} {isImperial ? 'mph' : 'km/h'}</div>
                        </span>
                    </div>
                    <div id="rightInfo">
                        <div>Weather</div>
                        <div id="currentDate">{currDate}</div>
                        <div id="currentCondition">{currCond}</div>
                    </div>

                </div>



                <div id="graphContainer">
                    <div id="tabs">
                        {tabs.map((tab, index) => (
                            <Fragment key={tab + 'fragment'}>
                                <span
                                    id={tab}
                                    key={tab}
                                    onClick={() => {
                                        setSelectedTab(index)

                                    }}
                                    className={selectedTab === index ? 'active  tab' : 'tab'}
                                >
                                    {tab}
                                </span>
                                {(index === 0 || index === 1) && <span className="divider" key={tab + 'divider'}></span>}

                            </Fragment>



                        ))}
                    </div>


                    <div id="chartContainer"
                        style={selectedTab === 0 ? { width: '735px', height: 'auto', marginLeft: '-40px' } : {}}
                    >
                        <ChartComponent
                            weatherData={weatherData}
                            selectedTab={selectedTab}
                            selectedCard={selectedCard}
                            arrOfSetStates={[setCurrentImgSrc,
                                setCurrentTemp,
                                setPrecip,
                                setHumidity,
                                setWind,
                                setCurrDate,
                                setCurrCond,
                                setSelectedCard,
                            ]}
                            isImperial={isImperial}
                            arrOfColors={arrOfColors}
                            setArrOfColors={setArrOfColors}
                        />

                    </div>
                </div>

                <div id="weekForecast">
                    {weatherData.length > 0 &&
                        weatherData[0].forecast.forecastday.map((weatherObj, index) => (
                            <div
                                id={"card-" + index}
                                key={"card-" + index}
                                onClick={() => {
                                    let weekDayObj = weatherData[0].forecast.forecastday[index]
                                    setCurrentImgSrc(weekDayObj.day.condition.icon)
                                    setCurrentTemp(Math.round(weekDayObj.day.avgtemp_c))
                                    setPrecip(weekDayObj.day.daily_chance_of_rain)
                                    setHumidity(weekDayObj.day.avghumidity)
                                    setWind(Math.round(weekDayObj.day.maxwind_kph))
                                    setCurrDate(format(parseISO(weekDayObj.date), "EEEE"))
                                    setCurrCond(weekDayObj.day.condition.text)
                                    setSelectedCard(index)

                                    document.querySelectorAll('.card').forEach(card => card.classList.remove('active'))
                                    document.getElementById('card-' + index).classList.add('active')

                                    setArrOfColors(Array(24).fill('#b5b5b5'))
                                }}
                                className={selectedCard === index ? 'active card' : 'card'}
                            >
                                {format(parseISO(weatherObj.date), "E")}
                                <img src={eval("cardImg" + index)} alt="icon for weather condition in forecasted days" />
                                <div>
                                    <span>{Math.round(celToFar(weatherObj.day.maxtemp_c, isImperial))}°</span>

                                    <span> {Math.round(celToFar(weatherObj.day.mintemp_c, isImperial))}°</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div id="bottomLinks">
                    <div></div>
                    <a id='apiSource' href="https://www.weatherapi.com/" title="Free Weather API">weatherapi.com</a>
                    <div>•</div>
                    <a id="feedback" href="https://media.tenor.com/OBQA8z0B8swAAAAM/trash-garbage-truck.gif">Feedback</a>

                </div>


            </div >
        </>
    )
}

export { WeatherCard }