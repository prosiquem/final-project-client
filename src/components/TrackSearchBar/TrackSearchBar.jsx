import React, { useState, useRef, useEffect } from 'react'
import './TrackSearchBar.css'

import FilterServices from '../../services/filter.services'
import tracksServices from '../../services/tracks.services'

import { Button, Form, ListGroup, Col, Row } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'

const TrackSearchBar = () => {

    const [searchTerm, setSearchTerm] = useState({
        title: ""
    })
    const [searchResults, setSearchResults] = useState()

    const handleInputChange = (e) => {

        const { name, value } = e.target
        setSearchTerm({ ...searchTerm, [name]: value })
        fetchTracks(searchTerm)

    }

    const fetchTracks = (searchTerm) => {
        tracksServices
            .searchSongs(searchTerm)
            .then(res)
    }

    return (
        <div className="TrackSearchBar">
            <Row>

                <Col>
                    <Search />
                </Col>

                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name='title'
                                placeholder="Busca una canción"
                                value={searchTerm.title}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Col>

            </Row>
        </div>
    )
}

export default TrackSearchBar
