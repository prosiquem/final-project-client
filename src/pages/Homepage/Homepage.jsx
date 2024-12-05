import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import Loader from '../../components/Loader/Loader'
import PlaylistList from '../../components/PlaylistList/PlaylistList'
import PlaylistServices from "../../services/playlist.services"
import AlbumServices from "../../services/albums.services"
import { ArrowRightShort } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import ExpandingSearchBar from '../../components/ExpandingSearchBar/ExpandingSearchBar'
import AlbumList from '../../components/AlbumList/AlbumList'
import './Homepage.css'

const Homepage = () => {

    const [playlists, setPlaylists] = useState([])
    const [albums, setAlbums] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        if (loggedUser) {
            fetchPlaylists()
            fetchLastAlbums()
        }
    }, [loggedUser])

    const fetchPlaylists = () => {
        setIsLoading(true)
        PlaylistServices
            .fetchPlaylists()
            .then(({ data }) => {
                const filteredPlaylists = data.filter(playlist => {
                    return playlist.owner._id === loggedUser._id
                })
                setPlaylists(filteredPlaylists)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const fetchLastAlbums = () => {
        setIsLoading(true)
        AlbumServices
            .fetchLastAlbums()
            .then(({ data }) => {
                setAlbums(data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    return (
        <div className="home-page">
            <Container className="page-container">

                <div className="top-bar">
                    <ExpandingSearchBar />
                </div>

                <Container className="homepage-greeting-container">
                    <h1>Hola, <span className="username">{loggedUser?.username}</span></h1>
                </Container>

                <Container className="homepage-playlists">
                    <Row>
                        <Col>
                            <Link className="link" to="/playlists">
                                <h1>Mis playlists <ArrowRightShort /></h1>
                            </Link>
                            {isLoading ? (
                                <div className="loader-container">
                                    <Loader />
                                </div>
                            ) : (
                                <PlaylistList playlists={playlists} />
                            )}
                        </Col>
                    </Row>
                </Container>

                <Container className="homepage-recent-added">
                    <Row>
                        <Col>
                            <Link className="link" to="/recent">
                                <h1>Últimos álbumes<ArrowRightShort /></h1>
                            </Link>
                            {isLoading ? (
                                <div className="loader-container">
                                    <Loader />
                                </div>
                            ) : (
                                <AlbumList albums={albums} />
                            )}
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )

}

export default Homepage
