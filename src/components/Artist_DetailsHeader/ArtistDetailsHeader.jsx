import { useNavigate } from "react-router-dom"

import { Button, Col, Dropdown, Image, Row } from "react-bootstrap"
import { ArrowLeft, ThreeDotsVertical } from "react-bootstrap-icons"

const ArtistDetailsHeader = ({ data, loggedUser, isEditing, setIsEditing }) => {

    const navigate = useNavigate()

    return (
        <Row className="ArtistDetailsHeader details-info w-100 gap-4 h-50">
            {data.artistGallery.length === 0 && <Col sm="4" md="2" className="p-0">
                <Image src={data.avatar} />
            </Col>}

            <Col sm="2" md="1">
                <Button variant="custom-secondary" onClick={() => navigate('/explore')} size="sm">
                    <ArrowLeft />
                </Button>
            </Col>


            <Col className="p-0 align-content-end pb-5">

                <Col md="10" ><label>{data.role === "ARTIST" ? "Artista" : "Usuario"}</label></Col>
                <h1>{data.artistName}</h1>

            </Col>

            <Col sm="2" md="1">
                <Dropdown
                    align="end">

                    <Dropdown.Toggle variant="custom-transparent">
                        <ThreeDotsVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setIsEditing(true)}>Editar información</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
            </Col>

        </Row>
    )

}

export default ArtistDetailsHeader