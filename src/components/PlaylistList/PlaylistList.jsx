import { Col, Row } from "react-bootstrap"
import PlaylistCard from "../PlaylistCard/PlaylistCard"
import AddButton from "../AddButton/AddButton"

const PlaylistList = ({ playlists, showAddButton = true }) => {
    return (
        <Row className="my-5 gap-4 playlist-list">
            {showAddButton && (
                <Col lg="2" md="3" sm="4">
                    <AddButton />
                </Col>
            )}
            {
                playlists.map(elm => {
                    return (
                        <Col lg="2" md="3" sm="4" key={elm._id}>
                            <PlaylistCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default PlaylistList
