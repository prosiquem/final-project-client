import React, { useState, useRef, useEffect } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import './ExpandingSearchBar.css'
import FilterServices from '../../services/filter.services'

const ExpandingSearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [filterValue, setFilterValue] = useState("")
    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    const searchRef = useRef(null)

    useEffect(() => {
        FilterServices.fetchAll()
            .then(response => {
                setPlaylists(response.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    useEffect(() => {
        if (filterValue !== "") {
            const filtered = playlists.filter(playlist =>
                playlist.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            setFilteredPlaylists(filtered)
        } else {
            setFilteredPlaylists([])
        }
    }, [filterValue, playlists])

    const handleFilterChange = (e) => {
        const { value } = e.target
        setFilterValue(value)
    }

    const toggleExpand = () => {
        setIsExpanded(true)
    }

    const handleBlur = () => {
        if (!filterValue && filteredPlaylists.length === 0) {
            setIsExpanded(false)
        }
        setFilteredPlaylists([])
    }

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsExpanded(false)
            setFilteredPlaylists([])
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
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
                    onBlur={handleBlur}
                    style={{ display: isExpanded ? "block" : "none" }}
                />
                <div className="search-icon">
                    <i className="fa-solid fa-search"></i>
                </div>

                {filteredPlaylists.length > 0 && (
                    <div className="list-filtered">
                        <ListGroup>
                            {filteredPlaylists.map(playlist => (
                                <ListGroup.Item key={playlist.id}>{playlist.name}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExpandingSearchBar
