import { Col, Row } from "react-bootstrap"
import PlaylistCard from "../PlaylistCard/PlaylistCard"
import AddPlaylistCard from "../AddPlaylistCard/AddPlaylistCard"

const PlaylistList = ({ playlists }) => {
    return (
        <Row className="my-5 gap-4 playlist-list">
            {
                playlists.map(elm => {
                    return (
                        <Col lg="2" md="3" sm="4" key={elm._id}>
                            <PlaylistCard {...elm} />
                        </Col>
                    );
                })
            }

            <Col lg="2" md="3" sm="4">
                <AddPlaylistCard />
            </Col>
        </Row>
    )
}

export default PlaylistList
