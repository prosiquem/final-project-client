import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import playlistServices from "../../services/playlist.services"
import { Col, Container, Row, Button, Table, Modal } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import TrackElement from "../../components/TrackElement/TrackElement"
import '../../general-css/DetailPage.css'
import { UserMessageContext } from "../../contexts/userMessage.context"
import { useMusicPlayer } from "../../contexts/musicplayer.context"
import TrackSearchBar from "../../components/TrackSearchBar/TrackSearchBar"
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader"
import DetailsControler from "../../components/DetailsControler/DetailsControler"

const PaylistDetailPage = () => {
    const { id: playlistId } = useParams()
    const [playlist, setPlaylist] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [addTrack, setAddTrack] = useState(false)
    const [searchResults, setSearchResults] = useState()
    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)
    const { playTrack, pauseTrack, stopTrack, currentTrack, isPlaying, setPlaylist: setPlaylistContext, nextTrack, prevTrack } = useMusicPlayer()  // Destructuramos los métodos del contexto

    const navigate = useNavigate()

    useEffect(() => {
        fetchPlaylist()
    }, [])

    const fetchPlaylist = () => {
        playlistServices
            .fetchOnePlaylist(playlistId)
            .then(({ data }) => {
                setPlaylist(data)
                setPlaylistContext(data.tracks)  // Pasar las pistas al contexto
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const deletePlaylist = () => {
        playlistServices
            .deletePlaylist(playlistId)
            .then(() => {
                navigate('/home')
            })
    }

    const addToPlaylist = (trackId) => {
        const newTracksArr = [...playlist.tracks]
        newTracksArr.push(trackId)

        const updatedPlaylist = { ...playlist, tracks: newTracksArr }
        setPlaylist(updatedPlaylist)
        editPlaylist(updatedPlaylist)
    }

    const deleteFromPlaylist = (idx) => {
        const newTracksArr = [...playlist.tracks]
        newTracksArr.splice(idx, 1)

        const updatedPlaylist = { ...playlist, tracks: newTracksArr }
        setPlaylist(updatedPlaylist)
        editPlaylist(updatedPlaylist)
    }

    const editPlaylist = (data) => {
        playlistServices
            .editPlaylist(playlistId, data)
            .then(() => {
                createAlert(`${playlist.name} playlist editada`, false)
                fetchPlaylist()
            })
            .catch(err => console.log(err))
    }

    return isLoading ? <Loader /> :
        <div className="PaylistDetailPage">
            <Container className="page-container gap-4">
                <DetailsHeader data={playlist} loggedUser={loggedUser} deleteElm={deletePlaylist} />
                <DetailsControler data={playlist} loggedUser={loggedUser} setAddTrack={setAddTrack} />
                <Row className="content h-100 w-100 p-3 align-items-center">
                    {playlist.tracks.length === 0 ?
                        <Col md={{ span: 4, offset: 4 }} className="text-center">
                            {playlist.owner._id === loggedUser._id ?
                                <p>Aún no tienes añadida ninguna canción. ¿Empezamos?</p> :
                                <p>{playlist.owner.username} aún no ha añadido ninguna canción</p>}
                            {playlist.owner._id === loggedUser._id &&
                                <Button variant="custom-primary" onClick={() => setAddTrack(true)}>Añadir canción</Button>}
                        </Col>
                        :
                        <Col md="12" className="p-0 h-100">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de canción</th>
                                        <th>Artista</th>
                                        <th>Álbum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playlist.tracks.length > 0 &&
                                        playlist.tracks.map((elm, idx) => {
                                            return (
                                                <TrackElement
                                                    key={elm._id}
                                                    {...elm}
                                                    idx={idx}
                                                    isCreateElm={false}
                                                    addToPlaylist={addToPlaylist}
                                                    deleteFromPlaylist={deleteFromPlaylist}
                                                    user={loggedUser}
                                                    playlistOwner={playlist.owner}
                                                    playTrack={playTrack}
                                                />
                                            )
                                        })}
                                </tbody>
                            </Table>
                        </Col>
                    }
                </Row>
            </Container>

            <Modal
                show={addTrack}
                onHide={() => setAddTrack(false)}
                size="lg"
                centered
                className="h-60"
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <TrackSearchBar setSearchResults={setSearchResults} />
                    {searchResults &&
                        <Table>
                            <tbody>
                                {searchResults.map((elm, idx) => {
                                    return (
                                        <TrackElement
                                            key={elm._id}
                                            isCreateElm={true}
                                            idx={idx}
                                            {...elm}
                                            addToPlaylist={addToPlaylist}
                                            deleteFromPlaylist={deleteFromPlaylist}
                                        />
                                    )
                                })}
                            </tbody>
                        </Table>
                    }
                </Modal.Body>
            </Modal>
        </div>
}
export default PaylistDetailPage