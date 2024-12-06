import { useParams } from "react-router-dom"

import { Container, Row, Col } from "react-bootstrap"
import EditPlaylistForm from "../../components/PlaylistForm_Edit/EditPlaylistForm"

const EditPlaylistPage = () => {

    const { id: playlistId } = useParams()

    return (
        <div className="EditPlaylistPage">
            <Container className="page-container">

                <Row className="w-100">
                    <Col md={{ span: "6", offset: "3" }}>
                        <h2>Editar Playlist</h2>
                        <EditPlaylistForm playlistId={playlistId} />
                    </Col>
                </Row>

            </Container>
        </div>
    )

}

export default EditPlaylistPage