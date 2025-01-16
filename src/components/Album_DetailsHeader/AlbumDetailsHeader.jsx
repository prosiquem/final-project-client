import { useNavigate } from "react-router-dom"
import { PLAYLIST_COVER } from "../../consts/path.consts"
import { formatingMonthYear } from "../../utils/date.utils"

import { Col, Dropdown, Image, Row } from "react-bootstrap"
import { ThreeDotsVertical } from "react-bootstrap-icons"


const AlbumDetailsHeader = ({ data, loggedUser, deleteElm, setEditAlbumModal }) => {

    const navigate = useNavigate()

    return (

        <Row className="AlbumDetailsHeader details-info gap-4 px-3 pt-2 w-100">
            <Col md={{ span: 2, offset: 0 }} xs={{ span: 12, offset: 0 }} className="p-0">
                <Image src={data.cover ? data.cover : PLAYLIST_COVER} fluid />
            </Col>
            <Col md="auto" xs="12" className="p-0 column-between">


                <Row className="details-info-header">

                    <Col xs="10" md="10">
                        <label>
                            {data.tracks.length === 1 || data.tracks.length === 2 ? "Single" : "Álbum"}
                        </label>
                    </Col>


                    {data.author._id === loggedUser._id &&
                        <Col xs="2" md="2" className="text-end" >

                            <Dropdown
                                align="end">

                                <Dropdown.Toggle variant="custom-transparent">
                                    <ThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={deleteElm}>Eliminar este album</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setEditAlbumModal(true)}>Editar album</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>

                        </Col>}

                </Row>

                <Row className="details-info-description align-items-end">
                    <Col>
                        <h1>{data.title}</h1>
                        <h5> {data.author.artistName} · {formatingMonthYear(data.createdAt)} · {data.tracks.length} canciones </h5>
                    </Col>
                </Row>

                <Row className="d-none d-md-flex">
                    <Col>
                        <label> Productores: {data.credits.producers ? data.credits.producers : 'Desconocido'} | Derechos reservados {data.credits.recordLabel ? data.credits.recordLabel : 'Desconocido'}®</label>
                    </Col>
                </Row>
            </Col>
        </Row>

    )

}

export default AlbumDetailsHeader