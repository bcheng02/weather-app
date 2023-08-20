function Navbar({ searchTerm }) {
    return (
        <div id="Navbar">
            <div className="navbarLinkContainer"><a className='navbarLink' href={`https://www.google.com/search?q=${searchTerm}&tbm=nws`}>News</a></div>
            <div className="navbarLinkContainer"><a className='navbarLink' href={`https://www.google.com/search?q=${searchTerm}&tbm=isch`}>Images</a></div>
            <div className="navbarLinkContainer"><a className='navbarLink' href={`https://www.google.com/search?q=${searchTerm}&tbm=shop`}>Shopping</a></div>
            <div className="navbarLinkContainer"><a className='navbarLink' href={`https://www.google.com/search?q=${searchTerm}&tbm=bks`}>Books</a></div>
            <div className="navbarLinkContainer"><a className='navbarLink' href={`https://www.google.com/search?q=${searchTerm}&tbm=vid`}>Videos</a></div>
            <div className="navbarLinkContainer"><a className='navbarLink' href={`https://www.google.com/maps/search/${searchTerm}/`}>Maps</a></div>
            <div className="navbarLinkContainer"><a className='navbarLink' href={`https://www.google.com/travel/flights?output=search&q=${searchTerm}`}>Flights</a></div>
            <div className="navbarLinkContainer"><a className='navbarLink' href={`https://www.google.com/finance/?output=search=${searchTerm}`}>Finance</a></div>
        </div>
    )
}

export default Navbar