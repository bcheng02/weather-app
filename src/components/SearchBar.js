import { useState } from "react"
import xIcon from '../images/close-icon.svg'
import searchIcon from '../images/search-icon.svg'
import searchIconGrey from '../images/search-icon-grey.svg'

import { getLocationResults } from "../utils/weatherApi"

function SearchBar({ searchTerm, setSearchTerm, onClickSearch }) {
    let [lcnRslts, setLcnRslts] = useState([])

    return (

        <div id="searchBar">
            <div id="searchStuff" style={lcnRslts.length > 0 ? { borderRadius: '24px 24px 0 0' } : { borderRadius: '24px' }}>
                <div id="searchContainer">
                    <img src={searchIconGrey} className="searchIconGrey" id="firstSearchIconGrey" alt="an icon shaped as a magnifying glass"></img>

                    <div id="beforeSearch">
                        weather in
                    </div>
                    <input
                        id="search"
                        type="text"
                        autoComplete="off"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            if (e.target.value !== '') {
                                getLocationResults(e.target.value, setLcnRslts)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onClickSearch(searchTerm)
                            }
                        }}
                        onFocus={() => {
                            let searchStuff = document.getElementById('searchStuff')
                            let locationResults = document.getElementById('locationResults')
                            let firstSearchIconGrey = document.getElementById('firstSearchIconGrey')
                            firstSearchIconGrey.classList.add('active')
                            searchStuff.classList.add('active')

                            if (lcnRslts.length > 0) {
                                searchStuff.style.borderRadius = '24px 24px 0 0'
                                locationResults.classList.add('active')
                            } else if (lcnRslts.length === 0) {
                                searchStuff.style.borderRadius = '24px'
                                locationResults.classList.remove('active')

                            }
                        }}
                        onBlur={() => {
                            let searchStuff = document.getElementById('searchStuff')
                            let locationResults = document.getElementById('locationResults')
                            let firstSearchIconGrey = document.getElementById('firstSearchIconGrey')

                            setTimeout(() => {
                                searchStuff.classList.remove('active')
                                locationResults.classList.remove('active')
                                firstSearchIconGrey.classList.remove('active')
                                searchStuff.style.borderRadius = '24px'
                            }, 200)
                        }}
                    />
                </div>

                <div id="btnContainer">
                    <div
                        id="xBtn"
                        onClick={() => {
                            setSearchTerm('')
                        }}
                    >
                        <img src={xIcon} id="xIcon" alt="an x shaped icon"></img>

                    </div>
                    <span id="btnBorder"></span>

                    <div
                        id="searchBtn"
                        onClick={() => {
                            onClickSearch(searchTerm)
                        }}
                    >
                        <img src={searchIcon} id="searchIcon" alt="an icon shaped as a magnifying glass"></img>
                    </div>
                </div>



            </div>

            <div id="locationResults" className={lcnRslts.length > 0 ? 'active' : undefined}>
                {lcnRslts.map((rslt, index) => (
                    <div
                        className="locationSuggestion"
                        key={rslt + index}
                        onClick={() => {
                            setSearchTerm(rslt)
                            onClickSearch(rslt)
                        }}
                    >
                        <img src={searchIconGrey} className="searchIconGrey" alt="an icon shaped as a magnifying glass"></img>
                        <div>weather in {rslt}</div>
                    </div>
                ))




                }



            </div>
        </div>




    )
}

export default SearchBar