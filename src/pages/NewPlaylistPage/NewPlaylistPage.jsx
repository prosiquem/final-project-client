import { Container, Row, Col } from "react-bootstrap"
import CreatePlaylistForm from "../../components/PlaylistForm_Create/CreatePlaylistForm"

const NewPlaylistPage = () => {

    return (
        <div className="NewPlaylistPage">
            <Container className="page-container">

                <Row className="w-100">
                    <Col md={{ span: "6", offset: "3" }}>
                        <h2>Nueva playlist</h2>
                        <CreatePlaylistForm />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default NewPlaylistPage