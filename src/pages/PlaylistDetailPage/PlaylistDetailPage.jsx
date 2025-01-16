import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import { UserMessageContext } from "../../contexts/userMessage.context"
import { useMusicPlayer } from "../../contexts/musicPlayer.context"
import { Col, Container, Row, Button, Table, Modal, Offcanvas } from "react-bootstrap"
import { DEFAULT_IMAGES } from "../../consts/path.consts"
import Loader from "../../components/Loader/Loader"
import TrackElement from "../../components/TrackElement/TrackElement"
import TrackSearchBar from "../../components/TrackSearchBar/TrackSearchBar"
import PlaylistDetailsHeader from "../../components/Playlist_DetailsHeader/PlaylistDetailsHeader"
import DetailsControler from "../../components/Playlist_DetailsControler/PlaylistDetailsControler"
import playlistServices from "../../services/playlist.services"
import '../../general-css/DetailPage.css'
import userServices from "../../services/user.services"
import EditPlaylistForm from "../../components/PlaylistForm_Edit/EditPlaylistForm"



const PaylistDetailPage = () => {

    const { id: playlistId } = useParams()

    const [playlist, setPlaylist] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [addTrack, setAddTrack] = useState(false)
    const [searchResults, setSearchResults] = useState()
    const [userData, setUserData] = useState()
    const [editPlaylistModal, setEditPlaylistModal] = useState(false)

    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)

    const { playTrack,
        setPlaylist: setPlaylistContext,
    } = useMusicPlayer()

    const navigate = useNavigate()

    useEffect(() => {
        fetchPlaylist()
        fetchUserData()
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

    const fetchUserData = () => {
        userServices
            .fetchUserData(loggedUser._id, { playlists: 1 })
            .then(({ data }) => {
                setUserData(data)
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

    const savePlaylist = (_id) => {
        const userPlaylistCopy = [...userData.playlists]
        userPlaylistCopy.push(_id)

        setUserData({ ...userData, playlists: userPlaylistCopy })
        editUser({ ...userData, playlists: userPlaylistCopy })

    }

    const unsavePlaylist = (_id) => {
        const userPlaylistCopy = [...userData.playlists]
        const elmToRemove = userPlaylistCopy.indexOf(_id)
        console.log(userPlaylistCopy)
        userPlaylistCopy.splice(elmToRemove, 1)
        console.log(userPlaylistCopy)

        setUserData({ ...userData, playlists: userPlaylistCopy })
        editUser({ ...userData, playlists: userPlaylistCopy })

    }


    const editUser = (data) => {

        userServices
            .editUser(loggedUser._id, data)
            .then(() => {
                fetchPlaylist()
                fetchUserData()
            })
            .catch(err => console.log(err))

    }


    return isLoading ? <Loader /> :
        <div className="PaylistDetailPage">
            <Container className="page-container p-4 p-md-5">

                <div className="cover-container">
                    <img className="cover-image" src={playlist.cover ? playlist.cover : DEFAULT_IMAGES[1]} alt="Cover image" />
                </div>

                <PlaylistDetailsHeader
                    data={playlist}
                    loggedUser={loggedUser}
                    deleteElm={deletePlaylist}
                    setEditPlaylistModal={setEditPlaylistModal} />

                <DetailsControler
                    data={playlist}
                    loggedUser={loggedUser}
                    setAddTrack={setAddTrack}
                    playTrack={playTrack}
                    savePlaylist={savePlaylist}
                    unsavePlaylist={unsavePlaylist}
                    userData={userData} />

                <Row className="content w-100 align-items-center">
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
                        <Col md="12" className="pl-0 mx-2">
                            {playlist.description && playlist.description.length > 1 && <p>{playlist.description}</p>}

                            <Table variant="custom-dark" responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de canción</th>
                                        <th>Artista</th>
                                        <th>Álbum</th>
                                        {loggedUser._id === playlist.owner._id && <th>Eliminar</th>}
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
                        <Table variant="custom-dark" responsive>

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

            <Offcanvas
                show={editPlaylistModal}
                onHide={() => setEditPlaylistModal(false)}
                backdrop="static"
                scroll
                placement="end" >
                <Offcanvas.Header closeButton> Editar playlist
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditPlaylistForm playlistId={playlistId} setEditPlaylistModal={setEditPlaylistModal} fetchPlaylistPage={fetchPlaylist} />
                </Offcanvas.Body>
            </Offcanvas>
        </div >
}
export default PaylistDetailPage