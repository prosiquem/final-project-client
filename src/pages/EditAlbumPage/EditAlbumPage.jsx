import { useParams } from "react-router-dom"

import { Col, Container, Row } from "react-bootstrap"
import EditAlbumForm from "../../components/AlbumForm_Edit/EditAlbumForm"

const EditAlbumPage = () => {

    const { id: albumId } = useParams()

    return (
        <div className="EditAlbumPage">
            <Container className="page-container">

                <Row className="w-100">
                    <Col md={{ span: "6", offset: "3" }}>
                        <h2>Editar Album</h2>
                        <EditAlbumForm albumId={albumId} />
                    </Col>
                </Row>

            </Container>
        </div>
    )

}

export default EditAlbumPage