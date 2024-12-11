import { useNavigate } from "react-router-dom"

import { Button, Col, Dropdown, FloatingLabel, Image, Row, Form } from "react-bootstrap"
import { ArrowLeft, ThreeDotsVertical } from "react-bootstrap-icons"

const ArtistDetailsHeader = ({ data, loggedUser, isEditing, setIsEditing, handleInputChange }) => {

    const navigate = useNavigate()

    return (
        <Row className="ArtistDetailsHeader details-info w-100 gap-4 h-50 mb-5">

            <Col xs="10" md="2" lg="1">
                <Button variant="custom-secondary" onClick={() => navigate('/explore')} size="sm">
                    <ArrowLeft />
                </Button>
            </Col>

            <Col xs={isEditing ? "12" : "9"} md={{ span: 'auto', offset: 0 }} lg="8" className="p-0 align-content-end pb-5">

                {isEditing ?
                    <Form>
                        <Form.Group className="mb-3">
                            <FloatingLabel
                                controlId="artistName"
                                label="Nombre"
                            >
                                <Form.Control
                                    type="text"
                                    name="artistName"
                                    placeholder="Nombre"
                                    value={data.artistName}
                                    onChange={handleInputChange} />
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                    :
                    <>
                        <Col><label>{data.role === "ARTIST" ? "Artista" : "Usuario"}</label></Col>
                        <h1>{data.artistName}</h1>
                    </>}

            </Col>

            {data._id === loggedUser._id &&
                < Col xs="2" md="1" lg="1">
                    {!isEditing &&
                        <Dropdown
                            align="end">

                            <Dropdown.Toggle variant="custom-transparent">
                                <ThreeDotsVertical />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setIsEditing(true)}>Editar información</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>

                    }

                </Col>}

        </Row >
    )

}

export default ArtistDetailsHeader