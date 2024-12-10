import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { AuthContext } from '../../contexts/auth.context'
import { ArrowRightShort } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import PlaylistList from '../../components/PlaylistList/PlaylistList'
import PlaylistServices from "../../services/playlist.services"
import AlbumServices from "../../services/album.services"
import GlobalSearchBar from '../../components/GlobalSearchBar/GlobalSearchBar'
import AlbumList from '../../components/AlbumList/AlbumList'
import './HomePage.css'

const Homepage = () => {

    const [artistAlbum, setArtistAlbum] = useState([])
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
            AlbumServices.fetchArtistAlbum(loggedUser._id),
            PlaylistServices.fetchPlaylists(),
            PlaylistServices.fetchLastPlaylists(),
            AlbumServices.fetchLastAlbums(),
        ]

        setIsLoading(true)

        Promise.all(homeData)
            .then(([artistAlbumResponse, playlistsResponse, lastPlaylistsResponse, albumsResponse]) => {
                const filteredPlaylists = playlistsResponse.data.filter(playlist => playlist.owner._id === loggedUser._id)
                setArtistAlbum(artistAlbumResponse.data)
                console.log(artistAlbumResponse.data)
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

                        <Container className="homepage-greeting-container mb-5 d-flex justify-content-between">
                            <h2>Hola, <span className="username">{loggedUser?.username}</span></h2>
                            <GlobalSearchBar />
                        </Container>

                        {loggedUser.role === "ARTIST" && (
                            <Container className="homepage-artist-albums">
                                <Row>
                                    <Col>
                                        <Link className="link" to="/mylibrary">
                                            <h2>Mis álbumes <ArrowRightShort /></h2>
                                        </Link>
                                        <AlbumList albums={artistAlbum} />
                                    </Col>
                                </Row>
                            </Container>
                        )}

                        <Container className="homepage-playlists">
                            <Row>
                                <Col>
                                    <Link className="link" to="/mylibrary">
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
                                    <PlaylistList playlists={lastPlaylists} showAddButton={false} />
                                </Col>
                            </Row>
                        </Container>


                        <Container className="homepage-recent-added mb-5">
                            <Row>
                                <Col>
                                    <Link className="link">
                                        <h2>Últimos álbumes <ArrowRightShort /></h2>
                                    </Link>
                                    <AlbumList albums={albums} showAddButton={false} />
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
