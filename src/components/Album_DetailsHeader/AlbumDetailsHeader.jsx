import { useNavigate } from "react-router-dom"
import { PLAYLIST_COVER } from "../../consts/path.consts"
import { formatingMonthYear } from "../../utils/date.utils"

import { Col, Dropdown, Image, Row } from "react-bootstrap"
import { ThreeDotsVertical } from "react-bootstrap-icons"


const AlbumDetailsHeader = ({ data, loggedUser, deleteElm }) => {

    const navigate = useNavigate()

    return (

        <Row className="AlbumDetailsHeader details-info w-100 gap-4">
            <Col md="2" className="p-0"><Image src={data.cover ? data.cover : PLAYLIST_COVER} fluid /></Col>
            <Col className="p-0 column-between">


                <Row className="details-info-header">
                    <Col md="10" ><label>Álbum</label></Col>

                    {data.author._id === loggedUser._id &&
                        <Col md="2" className="text-end" >

                            <Dropdown
                                align="end">

                                <Dropdown.Toggle variant="custom-transparent">
                                    <ThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={deleteElm}>Eliminar este album</Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate(`/album/edit/${data._id}`)}>Editar album</Dropdown.Item>
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

                <Row className="">
                    <Col>
                        <label> Productores: {data.credits.producers} | Derechos reservados {data.credits.recordLabel}®</label>
                    </Col>
                </Row>
            </Col>
        </Row>

    )

}

export default AlbumDetailsHeader