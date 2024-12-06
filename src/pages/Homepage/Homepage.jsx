import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import { ArrowRightShort } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import PlaylistList from '../../components/PlaylistList/PlaylistList'
import PlaylistServices from "../../services/playlist.services"
import AlbumServices from "../../services/album.services"
import ExpandingSearchBar from '../../components/ExpandingSearchBar/ExpandingSearchBar'
import AlbumList from '../../components/AlbumList/AlbumList'
import './Homepage.css'
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'

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
        const homeData = [
            PlaylistServices.fetchPlaylists(),
            PlaylistServices.fetchLastPlaylists(),
            AlbumServices.fetchLastAlbums(),
        ]

        setIsLoading(true)

        Promise.all(homeData)
            .then(([playlistsResponse, lastPlaylistsResponse, albumsResponse]) => {
                const filteredPlaylists = playlistsResponse.data.filter(playlist => playlist.owner._id === loggedUser._id)
                setPlaylists(filteredPlaylists)
                setLastPlaylists(lastPlaylistsResponse.data)
                setAlbums(albumsResponse.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div className="home-page">
            <Container className="page-container">

                {isLoading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <Container className="homepage-greeting-container">
                            <h2>Hola, <span className="username">{loggedUser?.username}</span></h2>
                            <ExpandingSearchBar />
                        </Container>

                        <Container className="homepage-playlists">
                            <Row>
                                <Col>
                                    <Link className="link" to="/playlists">
                                        <h2>Mis playlists <ArrowRightShort /></h2>
                                    </Link>
                                    <PlaylistList playlists={playlists} />
                                </Col>
                            </Row>
                        </Container>

                        <Container className="homepage-last-playlists">
                            <Row>
                                <Col>
                                    <Link className="link">
                                        <h2>Últimas playlists <ArrowRightShort /></h2>
                                    </Link>
                                    <PlaylistList playlists={lastPlaylists} />
                                </Col>
                            </Row>
                        </Container>

                        <Container className="homepage-recent-added">
                            <Row>
                                <Col>
                                    <Link className="link">
                                        <h2>Últimos álbumes <ArrowRightShort /></h2>
                                    </Link>
                                    <AlbumList albums={albums} />
                                </Col>
                            </Row>
                        </Container>
                    </>
                )}

            </Container>
        </div>
    )

}

export default Homepage
