import { useNavigate } from "react-router-dom"
import { DEFAULT_IMAGES, PLAYLIST_COVER } from "../../consts/path.consts"
import { formatingMonthYear } from "../../utils/date.utils"

import { Col, Dropdown, Image, Row } from "react-bootstrap"
import { ThreeDotsVertical } from "react-bootstrap-icons"


const PlaylistDetailsHeader = ({ data, loggedUser, deleteElm }) => {

    const navigate = useNavigate()

    const image = data.cover || DEFAULT_IMAGES[1]

    return (

        <Row className="DetailsHeader details-info w-100 gap-4">
            <Col md="2" className="p-0"><Image src={data.cover ? data.cover : image} fluid /></Col>
            <Col className="p-0 column-between">


                <Row className="details-info-header">
                    <Col md="10" ><label>Playlist</label></Col>

                    {data.owner._id === loggedUser._id &&
                        <Col md="2" className="text-end" >

                            <Dropdown
                                align="end">

                                <Dropdown.Toggle variant="custom-transparent">
                                    <ThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={deleteElm}>Eliminar esta playlist</Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate(`/playlist/edit/${data._id}`)}>Editar playlist</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>

                        </Col>}

                </Row>

                <Row className="details-info-description align-items-end">
                    <Col>
                        <h1>{data.name}</h1>
                        <h5> {data.owner.username} · {formatingMonthYear(data.createdAt)} · {data.tracks.length} canciones </h5>
                    </Col>
                </Row>
            </Col>
        </Row>

    )

}

export default PlaylistDetailsHeader