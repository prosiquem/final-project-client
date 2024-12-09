import { Container, Row, Col } from "react-bootstrap"
import CreateAlbumForm from "../../components/AlbumForm_Create/CreateAlbumForm"

const NewAlbumPage = () => {

    return (
        <div className="NewPlaylistPage">
            <Container className="page-container">

                <Row className="w-100">
                    <Col md={{ span: "6", offset: "3" }}>

                        <h2>Nuevo album</h2>
                        <CreateAlbumForm />

                    </Col>
                </Row>

            </Container>
        </div>
    )

}

export default NewAlbumPage