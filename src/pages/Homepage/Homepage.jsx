import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { AuthContext } from '../../contexts/auth.context'
import { ArrowRightShort } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

    const { loggedUser, logoutUser } = useContext(AuthContext)

    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (loggedUser) {
            fetchHomeData()
            setHasAnimated(false)
        }
    }, [loggedUser]);

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

    const handleLogout = () => {
        logoutUser()
        setHasAnimated(false)
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
                            <Col xs={{ span: 9 }} md={{ span: 6 }}>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                    onAnimationComplete={() => setHasAnimated(true)}
                                >
                                    Hola, <span className="username">{loggedUser.role === "ARTIST" ? loggedUser.artistName : loggedUser.username}</span>
                                </motion.h2>
                            </Col>
                            <Col className='d-md-flex flex-row-reverse'>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5, duration: 0.5 }}
                                >
                                    <GlobalSearchBar xs={{ span: 3 }} />
                                </motion.div>
                            </Col>
                        </Row>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                        >
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
                        </motion.div>
                    </>
                )}
            </Container>
        </div>
    )
}

export default Homepage;
