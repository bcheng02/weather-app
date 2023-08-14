import { useState } from "react"

// let userLocation = 'Vancouver'

function SearchBar({ onClickSearch }) {
    let [searchTerm, setSearchTerm] = useState('Vancouver')


    return (
        <div id="SearchBar">
            <input
                id="beforeSearch"
                type="text"
                value={" weather in"}
                readOnly={true}
                disabled={true}
            />
            <input
                id="search"
                type="text"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                    console.log("a change in search term")
                }

                }

            />
            <button
                id="searchBtn"
                type="button"
                onClick={() => {
                    onClickSearch(searchTerm)
                    console.log("search btn clicked")
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