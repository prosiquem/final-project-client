import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Col, Container, Row, Button, Table, Form, Modal, Image } from "react-bootstrap"
import albumServices from "../../services/album.services"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"
import { useMusicPlayer } from "../../contexts/musicplayer.context"
import AlbumDetailsHeader from "../../components/Album_DetailsHeader/AlbumDetailsHeader"
import AlbumDetailsControler from "../../components/Album_DetailsControler/AlbumDetailsControler"
import TrackElement from "../../components/TrackElement/TrackElement"
import { UserMessageContext } from "../../contexts/userMessage.context"

const AlbumDetailPage = () => {

    const { id: albumId } = useParams()
    const [album, setAlbum] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)

    const navigate = useNavigate()
    const { playTrack, setPlaylist } = useMusicPlayer()

    useEffect(() => {
        fetchAlbum(albumId)
    }, [albumId])


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


    return (isLoading ? <Loader /> :

        <div className="AlbumDetailPage">
            <Container className="page-container gap-4">

                <AlbumDetailsHeader data={album} loggedUser={loggedUser} deleteElm={deleteAlbum} />

                <AlbumDetailsControler data={album} loggedUser={loggedUser} />

                <Row className="content h-100 w-100 py-3 align-items-center">
                    {album.tracks.length === 0 ?
                        <Col md={{ span: 4, offset: 4 }} className="text-center">
                            {album.author._id === loggedUser._id ?
                                <p>Aun no tienes añadido ninguna canción. ¿Empezamos?</p> :
                                <p>{album.author.artistName} aun no ha añadido ninguna canción</p>}
                            {album.author._id === loggedUser._id &&
                                <Button variant="custom-primary">Añadir canción</Button>}
                        </Col>
                        :
                        <Col md="12" className="p-0 h-100">
                            {album.description && album.description.length > 1 && <p>{album.description}</p>}
                            <Table variant="custom-dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de canción</th>
                                        {album.author._id === loggedUser._id && <th>Eliminar</th>}
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
                                                albumOwner={album.owner}
                                                type='album'
                                            />
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    }
                </Row>
            </Container>

        </div>
    )
}

export default AlbumDetailPage
