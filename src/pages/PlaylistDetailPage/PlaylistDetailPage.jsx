import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import { UserMessageContext } from "../../contexts/userMessage.context"
import { useMusicPlayer } from "../../contexts/musicplayer.context"
import { Col, Container, Row, Button, Table, Modal } from "react-bootstrap"
import { DEFAULT_IMAGES } from "../../consts/path.consts"
import Loader from "../../components/Loader/Loader"
import TrackElement from "../../components/TrackElement/TrackElement"
import TrackSearchBar from "../../components/TrackSearchBar/TrackSearchBar"
import PlaylistDetailsHeader from "../../components/Playlist_DetailsHeader/PlaylistDetailsHeader"
import DetailsControler from "../../components/Playlist_DetailsControler/PlaylistDetailsControler"
import playlistServices from "../../services/playlist.services"
import '../../general-css/DetailPage.css'



const PaylistDetailPage = () => {

    const { id: playlistId } = useParams()

    const [playlist, setPlaylist] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [addTrack, setAddTrack] = useState(false)
    const [searchResults, setSearchResults] = useState()

    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)

    const { playTrack,
        pauseTrack,
        stopTrack,
        currentTrack,
        isPlaying,
        setPlaylist: setPlaylistContext,
        nextTrack,
        prevTrack
    } = useMusicPlayer()

    const navigate = useNavigate()

    useEffect(() => {
        fetchPlaylist()
    }, [])

    const fetchPlaylist = () => {
        playlistServices
            .fetchOnePlaylist(playlistId)
            .then(({ data }) => {
                setPlaylist(data)
                setPlaylistContext(data.tracks)
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
        setAddTrack(false)

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
                fetchPlaylist()
                createAlert(`${playlist.name} playlist editada`, false)
            })
            .catch(err => console.log(err))
    }

    return isLoading ? <Loader /> :
        <div className="PaylistDetailPage">
            <Container className="page-container gap-4">

                <div className="cover-container">
                    <img className="cover-image" src={playlist.cover ? playlist.cover : DEFAULT_IMAGES[1]} alt="Cover image" />
                </div>

                <PlaylistDetailsHeader data={playlist} loggedUser={loggedUser} deleteElm={deletePlaylist} />

                <DetailsControler data={playlist} loggedUser={loggedUser} setAddTrack={setAddTrack} playTrack={playTrack} />

                <Row className="content w-100 py-3 align-items-center">
                    {playlist.tracks.length === 0 ?

                        <Col md={{ span: 4, offset: 4 }} className="text-center">

                            {playlist.owner._id === loggedUser._id ?
                                <p>Aún no tienes añadida ninguna canción. ¿Empezamos?</p> :
                                <p>{playlist.owner.username} aún no ha añadido ninguna canción</p>}
                            {playlist.owner._id === loggedUser._id &&

                                <Button
                                    variant="custom-primary"
                                    onClick={() => setAddTrack(true)}>
                                    Añadir canción
                                </Button>}
                        </Col>
                        :
                        <Col md="12" className="p-0 h-100">
                            {playlist.description && playlist.description.length > 1 && <p>{playlist.description}</p>}

                            <Table variant="custom-dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de canción</th>
                                        <th>Artista</th>
                                        <th>Álbum</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {playlist.tracks.length > 0 &&
                                        playlist.tracks.map((elm, idx) => {
                                            return (
                                                <TrackElement
                                                    key={idx}
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
                scrollable
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <TrackSearchBar setSearchResults={setSearchResults} />
                    {searchResults &&
                        <Table variant="custom-dark">

                            <tbody>
                                {searchResults.map((elm, idx) => {
                                    return (
                                        <TrackElement
                                            key={idx}
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