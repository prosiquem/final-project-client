import { Col, Row, Form, FloatingLabel } from "react-bootstrap"

const ArtistDetailsDescription = ({ data, loggedUser, isEditing, setIsEditing }) => {

    return (
        <Form className="ArtistDetailsDescription">

            <Row>
                <Col md="8" >
                    <Form.Group>
                        <FloatingLabel
                            controlId="description"
                            label="Sobre ti"
                            className={!isEditing && ""}>
                            <Form.Control
                                as="textarea"
                                rows={!isEditing && 6}
                                plaintext={!isEditing}
                                readOnly={!isEditing}
                                defaultValue={data.description} />
                        </FloatingLabel>
                    </Form.Group>
                </Col>

                <Col>
                </Col>
            </Row>

        </Form>
    )

}

export default ArtistDetailsDescription