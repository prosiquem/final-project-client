import { Col, Dropdown, Image, Row } from "react-bootstrap"
import { ThreeDotsVertical } from "react-bootstrap-icons"

const ArtistDetailsHeader = ({ data, loggedUser }) => {

    console.log(data, loggedUser)

    return (
        <Row className="ArtistDetailsHeader details-info w-100 gap-4">
            {data.artistGallery.length === 0 && <Col sm="4" md="2" className="p-0">
                <Image src={data.avatar} />
            </Col>}

            <Col className="p-0 column-between">
                <Row>
                    <Col md="10" ><label>{data.role === "ARTIST" ? "Artista" : "Usuario"}</label></Col>

                    {data._id === loggedUser._id &&
                        <Col md="2" className="text-end" >

                            <Dropdown
                                align="end">

                                <Dropdown.Toggle variant="custom-transparent">
                                    <ThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item >Editar información</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>

                        </Col>}
                </Row>

            </Col>
        </Row>
    )

}

export default ArtistDetailsHeader