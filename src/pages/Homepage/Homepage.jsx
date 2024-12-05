import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import { ArrowRightShort } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import PlaylistList from '../../components/PlaylistList/PlaylistList'
import PlaylistServices from "../../services/playlist.services"
import AlbumServices from "../../services/albums.services"
import ExpandingSearchBar from '../../components/ExpandingSearchBar/ExpandingSearchBar'
import AlbumList from '../../components/AlbumList/AlbumList'
import './Homepage.css'

const Homepage = () => {

    const [playlists, setPlaylists] = useState([])
    const [lastPlaylists, setLastPlaylists] = useState([])
    const [albums, setAlbums] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        if (loggedUser) {
            fetchHomeData()
        }
    }, [loggedUser])

    const fetchHomeData = () => {
        const requiredData = [
            PlaylistServices.fetchPlaylists(),
            PlaylistServices.fetchLastPlaylists(),
            AlbumServices.fetchLastAlbums()
        ]

        setIsLoading(true)

        Promise.all(requiredData)
            .then(([playlistsResponse, lastPlaylistsResponse, albumsResponse]) => {
                const filteredPlaylists = playlistsResponse.data.filter(playlist => playlist.owner._id === loggedUser._id)
                setPlaylists(filteredPlaylists)
                setLastPlaylists(lastPlaylistsResponse.data)
                setAlbums(albumsResponse.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
                setIsLoading(false)
            })
    }

    return (
        <div className="home-page">
            <Container className="page-container">

                <Container className="homepage-greeting-container">
                    <h2>Hola, <span className="username">{loggedUser?.username}</span></h2>
                    <ExpandingSearchBar />
                </Container>

                <Container className="my-5 homepage-playlists">
                    <Row>
                        <Col>
                            <Link className="link" to="/playlists">
                                <h2>Mis playlists <ArrowRightShort /></h2>
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

                <Container className="homepage-last-playlists">
                    <Row>
                        <Col>
                            <Link className="link">
                                <h2>Últimas playlists <ArrowRightShort /></h2>
                            </Link>
                            {isLoading ? (
                                <div className="loader-container">
                                    <Loader />
                                </div>
                            ) : (
                                <PlaylistList playlists={lastPlaylists} />
                            )}
                        </Col>
                    </Row>
                </Container>

                <Container className="homepage-recent-added">
                    <Row>
                        <Col>
                            <Link className="link">
                                <h2>Últimos álbumes <ArrowRightShort /></h2>
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
