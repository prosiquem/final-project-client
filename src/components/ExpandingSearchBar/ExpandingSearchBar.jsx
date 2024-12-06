import React, { useState, useRef, useEffect } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import FilterServices from '../../services/filter.services'
import { Link } from 'react-router-dom'
import './ExpandingSearchBar.css'

const ExpandingSearchBar = ({ _id }) => {

    const [isExpanded, setIsExpanded] = useState(false)
    const [filterValue, setFilterValue] = useState("")

    const [playlists, setPlaylists] = useState([])
    const [albums, setAlbums] = useState([])
    const [tracks, setTracks] = useState([])
    const [artists, setArtists] = useState([])

    const searchRef = useRef(null)

    const handleFilterChange = (e) => {
        const { value } = e.target
        setFilterValue(value)
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
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (filterValue.trim()) {
            FilterServices.fetchAll(filterValue)
                .then(({ data }) => {
                    setPlaylists(data.playlists)
                    setAlbums(data.albums)
                    setTracks(data.tracks)
                    setArtists(data.artists)
                })
                .catch(err => console.error(err))
        } else {
            setPlaylists([])
            setAlbums([])
            setTracks([])
            setArtists([])
        }
    }, [filterValue])

    return (
        <div className="GlobalFilter">
            <div
                className={`searcher ${isExpanded ? "expanded" : ""}`}
                onClick={toggleExpand}
                ref={searchRef}
            >
                <Form.Control
                    type="text"
                    placeholder="Buscar..."
                    value={filterValue}
                    onChange={handleFilterChange}
                    className="search-input"
                    style={{ display: isExpanded ? "block" : "none" }}
                />
                <div className="search-icon">
                    <i className="fa-solid fa-search"></i>
                </div>

                {isExpanded && (
                    <div className="list-filtered">
                        <ListGroup>
                            {playlists.map(playlist => (
                                <ListGroup.Item key={playlist._id}>
                                    <Link to={`/playlist/${playlist._id}`} className="link">
                                        {playlist.name}
                                    </Link>
                                </ListGroup.Item>
                            ))}
                            {albums.map(album => (
                                <ListGroup.Item key={album._id}>
                                    <Link to={`/album/${album._id}`} className="link">
                                        {album.title}
                                    </Link>
                                </ListGroup.Item>
                            ))}
                            {tracks.map(track => (
                                <ListGroup.Item key={track._id}>

                                    {track.title}

                                </ListGroup.Item>
                            ))}
                            {artists.map(artist => (
                                <ListGroup.Item key={artist._id}>
                                    <Link to={`/artists/${artist._id}`} className="link">
                                        {artist.artistName}
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExpandingSearchBar
