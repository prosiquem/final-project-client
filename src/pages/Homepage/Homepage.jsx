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
import './Homepage.css'

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
            PlaylistServices.fetchUserPlaylists(loggedUser._id),
            PlaylistServices.fetchLastPlaylists(),
            AlbumServices.fetchLastAlbums(),
        ]

        setIsLoading(true)

        Promise.all(homeData)
            .then(([artistAlbum, playlists, lastPlaylists, albums]) => {
                setArtistAlbum(artistAlbum.data)
                const limitedPlaylists = playlists.data.playlists.slice(0, 4)
                setPlaylists(limitedPlaylists)
                setLastPlaylists(lastPlaylists.data)
                setAlbums(albums.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
            })

    }

    return (
        <div className="HomePage">
            <Container className="page-container">

                {isLoading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <>

                        <Row className="homepage-greeting-container mb-5 justify-content-between align-items-end gap-3">
                            <Col xs={{ span: 12 }} md={{ span: 6 }}>
                                <h2>Hola, <span className="username">{loggedUser.role === "ARTIST" ? loggedUser.artistName : loggedUser.username}</span></h2>
                            </Col>
                            <Col className='d-md-flex flex-row-reverse'>
                                <GlobalSearchBar />
                            </Col>

                        </Row>

                        {loggedUser.role === "ARTIST" && (
                            <Row className="homepage-artist-albums">
                                <Col>
                                    <Link className="link h2" to="/mylibrary">Mis álbumes <ArrowRightShort /></Link>
                                    <AlbumList albums={artistAlbum} />
                                </Col>
                            </Row>
                        )}

                        <Row className="homepage-playlists">
                            <Col>
                                <Link className="link h2" to="/mylibrary">Mis playlists <ArrowRightShort /></Link>
                                <PlaylistList playlists={playlists} />
                            </Col>
                        </Row>

                        <Row className="homepage-last-playlists">
                            <Col>
                                <Link className="link h2" to="/explore">Últimas playlists <ArrowRightShort /></Link>
                                <PlaylistList playlists={lastPlaylists} showAddButton={false} />
                            </Col>
                        </Row>


                        <Row className="homepage-recent-added mb-5">
                            <Col>
                                <Link className="link h2" to="/explore">Últimos álbumes <ArrowRightShort /></Link>
                                <AlbumList albums={albums} showAddButton={false} />
                            </Col>
                        </Row>
                    </>
                )}

            </Container>
        </div>
    )

}

export default Homepage
