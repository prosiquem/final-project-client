import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { AuthContext } from "../../contexts/auth.context"
import playlistServices from "../../services/playlist.services"

import { Col, Container, Row, Button, Image, Table, Dropdown, Modal } from "react-bootstrap"
import { Clock, PlayFill, PlusLg, ThreeDotsVertical } from "react-bootstrap-icons"
import Loader from "../../components/Loader/Loader"
import TrackElement from "../../components/TrackElement/TrackElement"

import '../../general-css/DetailPage.css'
import TrackSearchBar from "../../components/TrackSearchBar/TrackSearchBar"
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader"
import DetailsControler from "../../components/DetailsControler/DetailsControler"

const PaylistDetailPage = () => {

    const { id: playlistId } = useParams()

    const [playlist, setPlaylist] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [addTrack, setAddTrack] = useState(false)

    const { loggedUser } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        fetchPlaylist()
    }, [])

    const fetchPlaylist = () => {
        playlistServices
            .fetchOnePlaylist(playlistId)
            .then(({ data }) => {
                setPlaylist(data)
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

    return (isLoading ? <Loader /> :
        <div className="PaylistDetailPage">
            <Container className="page-container gap-4">

                <DetailsHeader data={playlist} loggedUser={loggedUser} deleteElm={deletePlaylist} />

                <DetailsControler data={playlist} />

                <Row className="content h-100 w-100 p-3 align-items-center">
                    {playlist.tracks.length === 0 ?
                        <Col md={{ span: 4, offset: 4 }} className="text-center">

                            {playlist.owner._id === loggedUser._id ?
                                <p>Aun no tienes añadido ninguna canción. ¿Empezamos?</p> :
                                <p>{playlist.owner.username} aun no ha añadido ninguna canción</p>}

                            {playlist.owner._id === loggedUser._id &&
                                <Button variant="custom-primary" onClick={() => setAddTrack(true)}>Añadir canción</Button>}

                        </Col>
                        :

                        <Col md="12" className="p-0 h-100">
                            {playlist.description && playlist.description.length > 1 && <p>{playlist.description}</p>}
                            <Table >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de canción</th>
                                        <th>Artista</th>
                                        <th>Album</th>
                                        <th><Clock /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        playlist.tracks.map((elm, idx) => {
                                            return (
                                                <TrackElement key={elm._id} {...elm} idx={idx} />
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                        </Col>
                    }

                </Row>

            </Container>

            <Modal
                show={addTrack}
                onHide={() => setAddTrack(true)}
                size="lg"
                centered
                className="h-60"
            >

                <Modal.Header closeButton />
                <Modal.Body>
                    <TrackSearchBar />
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default PaylistDetailPage