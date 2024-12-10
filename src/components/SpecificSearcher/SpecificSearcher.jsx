import { useEffect, useState, useRef } from "react"
import { Form } from "react-bootstrap"

const SpecificSearcher = ({ playlists, artists, albums, setFilteredResults }) => {
    const [search, setSearch] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)
    const searchRef = useRef(null)

    const handleSearch = (e) => {

        const value = e.target.value.toLowerCase()
        setSearch(value)

        const filteredPlaylists = playlists.filter(playlist =>
            playlist.name && playlist.name.toLowerCase().includes(value)
        )
        const filteredArtists = artists.filter(artist =>
            artist.artistName && artist.artistName.toLowerCase().includes(value)
        )
        const filteredAlbums = albums.filter(album =>
            album.title && album.title.toLowerCase().includes(value)
        )

        setFilteredResults({
            playlists: filteredPlaylists,
            artists: filteredArtists,
            albums: filteredAlbums
        })
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
                placeholder="Buscar en mi biblioteca..."
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
