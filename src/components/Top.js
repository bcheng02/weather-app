import React from "react"
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import logo from '../images/weather-logo.svg'

// testing
import getWeather from '../utils/weatherApi'

function garbage(x) {
    console.log(x + " this is passed into a prop in Top.js")
}

function Top() {
    return (
        <div id="top">
            <img id="logo" src={logo} alt="the word 'weather' in the style of the Google logo"></img>
            <SearchBar onClickSearch={getWeather} />
            <Navbar />
        </div>
    )
}

export default Top  