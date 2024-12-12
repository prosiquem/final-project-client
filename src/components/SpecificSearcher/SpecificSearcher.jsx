import { useEffect, useState, useRef } from "react"
import { Form } from "react-bootstrap"

const SpecificSearcher = ({ playlists = [], artists = [], albums = [], setFilteredResults, filterBy = [] }) => {
    const [search, setSearch] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)
    const searchRef = useRef(null)

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearch(value)

        const filteredResults = {}

        if (filterBy.includes("playlists")) {
            filteredResults.playlists = playlists.filter(playlist =>
                playlist.name && playlist.name.toLowerCase().includes(value)
            )
        }
        if (filterBy.includes("artists")) {
            filteredResults.artists = artists.filter(artist =>
                artist.artistName && artist.artistName.toLowerCase().includes(value)
            )
        }
        if (filterBy.includes("albums")) {
            filteredResults.albums = albums.filter(album =>
                album.title && album.title.toLowerCase().includes(value)
            )
        }

        setFilteredResults(filteredResults)
    }

    const toggleExpand = () => {
        setIsExpanded(true)
    }

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsExpanded(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return (
        <div
            className={`searcher ${isExpanded ? "expanded" : ""}`}
            onClick={toggleExpand}
            ref={searchRef}
        >
            <Form.Control
                type="text"
                placeholder="¿Qué te apetece escuchar?"
                value={search}
                onChange={handleSearch}
                className="search-input"
                style={{ display: isExpanded ? "block" : "none" }}
            />
            <div className="search-icon">
                <i className="fa-solid fa-search"></i>
            </div>
        </div>
    )
}

export default SpecificSearcher
