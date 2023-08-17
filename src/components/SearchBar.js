import { useState } from "react"
import xIcon from '../images/close-icon.svg'
import searchIcon from '../images/search-icon.svg'

function SearchBar({ onClickSearch }) {
    let [searchTerm, setSearchTerm] = useState('Vancouver')


    return (

        <div id="searchBar">
            <div id="searchContainer">
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
            </div>

            <div id="btnContainer">
                <div
                    id="xBtn"
                    onClick={() => {
                        setSearchTerm('')
                        console.log('x btn clicked')
                    }}
                >
                    <img src={xIcon} id="xIcon"></img>

                </div>
                <span id="btnBorder"></span>

                <div
                    id="searchBtn"
                    // type="button"
                    onClick={() => {
                        onClickSearch(searchTerm)
                        console.log("search btn clicked" + searchTerm)
                    }}
                >
                    <img src={searchIcon} id="searchIcon"></img>
                </div>
            </div>

        </div>




    )
}

export default SearchBar