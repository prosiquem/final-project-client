import { Col, Row } from "react-bootstrap"
import PlaylistCard from "../PlaylistCard/PlaylistCard"

const PlaylistList = ({ playlists }) => {
    return (
        <Row className="g-0">
            {
                playlists.map(elm => {
                    return (
                        <Col lg="3" sm="6" key={elm._id}>
                            <PlaylistCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default PlaylistList
