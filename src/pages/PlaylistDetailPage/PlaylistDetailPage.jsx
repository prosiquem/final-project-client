import { useEffect, useState } from "react"
import playlistServices from "../../services/playlist.services"

import { Col, Container, Row, Button, Image, Table } from "react-bootstrap"
import { Clock, ThreeDotsVertical } from "react-bootstrap-icons"
import Loader from "../../components/Loader/Loader"
import { useParams } from "react-router-dom"

import { PLAYLIST_COVER } from "../../consts/path.consts"
import TrackElement from "../../components/TrackElement/TrackElement"
import { formatingMonthYear } from "../../utils/date.utils"

import '../../general-css/DetailPage.css'

const PaylistDetailPage = () => {

    const { id: playlistId } = useParams()

    const [playlist, setPlaylist] = useState()
    const [isLoading, setIsLoading] = useState(true)

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

    return (isLoading ? <Loader /> :
        <div className="PaylistDetailPage">
            <Container className="page-container gap-4">

                <Row className="details-info w-100 gap-4">
                    <Col md="2" className="p-0"><Image src={playlist.cover ? playlist.cover : PLAYLIST_COVER} fluid /></Col>
                    <Col className="p-0 column-between">
                        <Row className="details-info-header">
                            <Col md="10" ><label>Playlist</label></Col>
                            <Col md="2" className="text-end" >
                                <Button variant="custom-transparent">
                                    <ThreeDotsVertical />
                                </Button>
                            </Col>
                        </Row>
                        <Row className="details-info-description align-items-end">
                            <Col>
                                <h1>{playlist.name}</h1>
                                <h5> {playlist.owner.username} · {formatingMonthYear(playlist.createdAt)} · {playlist.tracks.length} canciones </h5>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="list h-100 w-100 p-3 align-items-center">
                    {playlist.tracks.length === 0 ?
                        <Col md={{ span: 4, offset: 4 }} className="text-center">
                            <p>Aun no tienes añadido ninguna canción. ¿Empezamos?</p>
                            <Button variant="custom-primary">Añadir canción</Button>
                        </Col>
                        :
                        <Col md="12" className="p-0">
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
        </div>
    )
}

export default PaylistDetailPage