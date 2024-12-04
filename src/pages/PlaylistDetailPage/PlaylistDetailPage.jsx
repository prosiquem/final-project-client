import { useEffect, useState } from "react"
import playlistServices from "../../services/playlist.services"

import { Col, Container, Row, Button, Image, Table } from "react-bootstrap"
import { Clock, ThreeDotsVertical } from "react-bootstrap-icons"
import Loader from "../../components/Loader/Loader"
import { useParams } from "react-router-dom"

import { MEDIA } from "../../consts/path.consts"
import TrackElement from "../../components/TrackElement/TrackElement"


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
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    return (isLoading ? <Loader /> :
        <div className="PaylistDetailPage">
            <Container className="page-container">

                <Row className="details-info w-100">
                    <Col md="4" className="p-0"><Image src={playlist.cover ? playlist.cover : MEDIA.PLAYLIST_COVER} fluid /></Col>
                    <Col className="p-0">
                        <Row>
                            <Col md="10" ><h4>Playlist</h4></Col>
                            <Col md="2" >
                                <Button>
                                    <ThreeDotsVertical />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col><h1>{playlist.name}</h1></Col>
                        </Row>
                        <Row> <h5> {playlist.owner.username} · {playlist.createdAt} · {playlist.tracks.length} canciones </h5></Row>
                    </Col>
                </Row>

                <Row className="tracks-list h-100 w-100">
                    {playlist.tracks.length === 0 ?
                        <>
                            <Row>
                                <Col><h2>Aun no tienes añadido ninguna canción. ¿Empezamos?</h2></Col>
                            </Row>
                            <Row>
                                <Col><Button>Añadir canción</Button></Col>
                            </Row>
                        </>
                        :
                        <Col md="12" className="p-0">
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
                                    {playlist.tracks.map((elm, idx) => {
                                        return (
                                            <TrackElement key={elm._id} {...elm} idx={idx} />
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

export default PaylistDetailPage