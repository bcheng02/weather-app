import { useState } from "react"

// let userLocation = 'Vancouver'

function SearchBar({ onClickSearch }) {
    let [searchTerm, setSearchTerm] = useState('Vancouver')

    function handleSearchChange(event) {
        setSearchTerm(event.target.value)
    }

    return (
        <div id="SearchBar">
            <span>Weather in </span>
            <input
                id="search"
                type="text"
                autoComplete="off"
                value={searchTerm}
                onChange={handleSearchChange}

            />
            <button
                id="searchBtn"
                type="button"
                onClick={() => {
                    onClickSearch(searchTerm)
                }}
            >
                go!
            </button>
        </div>
    )
}

export default SearchBar

// the only sol'n that really makes sense with having to put the props in the right
// place is to write the API logic in WeatherCard, then export it to App, and call it there
// which is so convoluted