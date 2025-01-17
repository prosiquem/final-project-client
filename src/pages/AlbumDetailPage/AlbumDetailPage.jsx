import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Col, Container, Row, Button, Table, Form, Modal, Image, Offcanvas } from "react-bootstrap"
import albumServices from "../../services/album.services"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"
import { useMusicPlayer } from "../../contexts/musicPlayer.context"
import AlbumDetailsHeader from "../../components/Album_DetailsHeader/AlbumDetailsHeader"
import AlbumDetailsControler from "../../components/Album_DetailsControler/AlbumDetailsControler"
import TrackElement from "../../components/TrackElement/TrackElement"
import { UserMessageContext } from "../../contexts/userMessage.context"
import { TracksUploaderContext } from "../../contexts/tracksUploader.context"
import { PencilFill, Trash2, Trash2Fill } from "react-bootstrap-icons"
import tracksServices from "../../services/tracks.services"
import EditTrackForm from "../../components/TrackForm_Edit/TrackForm_Edit"
import { DEFAULT_IMAGES } from "../../consts/path.consts"
import EditAlbumForm from "../../components/AlbumForm_Edit/EditAlbumForm"

const AlbumDetailPage = () => {


    const { id: albumId } = useParams()
    const [album, setAlbum] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [editTrackModal, setEditTrackModal] = useState(false)
    const [editAlbumModal, setEditAlbumModal] = useState(false)
    const [trackId, setTrackId] = useState()

    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)
    const { openTrackUploader, setAlbumId, isLoadingTracks } = useContext(TracksUploaderContext)

    const navigate = useNavigate()
    const { playTrack, setPlaylist } = useMusicPlayer()

    useEffect(() => {
        fetchAlbum((albumId))
    }, [albumId, isLoadingTracks])


    const fetchAlbum = (id) => {
        albumServices
            .fetchOneAlbum(id)
            .then(({ data }) => {
                setAlbum(data)
                setPlaylist(data.tracks)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const deleteAlbum = () => {

        albumServices
            .deleteAlbum(albumId)
            .then(() => {
                navigate('/mylibrary')
                createAlert(`Tu album ${album.title} ha sido eliminado`, false)
            })
            .catch(err => console.log(err))

    }

    const deleteTrack = (id) => {

        tracksServices
            .deleteTrack(id)
            .then(() => {
                fetchAlbum(albumId)
            })
            .catch(err => console.log(err))

    }

    return (isLoading ? <Loader /> :

        <div className="AlbumDetailPage">
            <Container className="page-container gap-4 p-4 p-md-4">

                <div className="cover-container">
                    <img className="cover-image" src={album.cover ? album.cover : DEFAULT_IMAGES[1]} alt="Cover image" />
                </div>

                <AlbumDetailsHeader data={album} loggedUser={loggedUser} deleteElm={deleteAlbum} setEditAlbumModal={setEditAlbumModal} />

                <AlbumDetailsControler data={album} loggedUser={loggedUser} isLoadingTracks={isLoadingTracks} playTrack={playTrack} />

                <Row className="content align-items-center">
                    {album.tracks.length === 0 ?
                        <Col md={{ span: 4, offset: 4 }} className="text-center py-3">
                            {album.author._id === loggedUser._id ?
                                <p>Aun no tienes añadido ninguna canción. ¿Empezamos?</p> :
                                <p>{album.author.artistName} aun no ha añadido ninguna canción</p>}
                            {album.author._id === loggedUser._id &&
                                <Button
                                    variant="custom-primary"
                                    onClick={() => { openTrackUploader(), setAlbumId(albumId) }}
                                    disabled={isLoadingTracks}>
                                    Añadir canción</Button>}
                        </Col>
                        :
                        <Col md="12" className="px-3">
                            {album.description && album.description.length > 1 && <p>{album.description}</p>}
                            <Table variant="custom-dark" responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de canción</th>
                                        {album.author._id === loggedUser._id && <th className="d-none"><Trash2Fill /></th>}
                                        {album.author._id === loggedUser._id && <th className="d-none"><PencilFill /></th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {album.tracks.map((elm, idx) => {
                                        return (
                                            <TrackElement
                                                key={idx}
                                                {...elm}
                                                idx={idx}
                                                playTrack={playTrack}
                                                user={loggedUser}
                                                albumOwner={album.author}
                                                type='album'
                                                deleteTrack={deleteTrack}
                                                setEditTrackModal={setEditTrackModal}
                                                setTrackId={setTrackId}
                                            />
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    }
                </Row>
            </Container>

            <Offcanvas
                show={editTrackModal}
                onHide={() => setEditTrackModal(false)}
                backdrop="static"
                scroll
                placement="end">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditTrackForm
                        trackId={trackId}
                        setEditTrackModal={setEditTrackModal}
                        fetchAlbum={fetchAlbum}
                        albumId={albumId} />
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas
                show={editAlbumModal}
                onHide={() => setEditAlbumModal(false)}
                backdrop="static"
                scroll
                placement="end" >
                <Offcanvas.Header closeButton> Editar album
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditAlbumForm albumId={albumId} setEditAlbumModal={setEditAlbumModal} fetchAlbumPage={fetchAlbum} />
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}

export default AlbumDetailPage
