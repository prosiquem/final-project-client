import { Col, Row } from "react-bootstrap"
import ArtistCard from "../ArtistCard/ArtistCard"
import PlaylistCard from "../PlaylistCard/PlaylistCard"
import AlbumCard from "../AlbumCard/AlbumCard"

const ExploreList = ({ artists, playlists, albums }) => {

    const exploreItems = [...artists, ...playlists, ...albums]

    return (
        <Row className="my-5 gap-4 explore-list">
            {
                exploreItems.map(elm => {
                    if (elm.username) {
                        return (
                            <Col lg="2" md="3" sm="4" key={elm._id}>
                                <ArtistCard {...elm} />
                            </Col>
                        )
                    } else if (elm.name) {
                        return (
                            <Col lg="2" md="3" sm="4" key={elm._id}>
                                <PlaylistCard {...elm} />
                            </Col>
                        )
                    } else {
                        return (
                            <Col lg="2" md="3" sm="4" key={elm._id}>
                                <AlbumCard {...elm} />
                            </Col>
                        )
                    }
                })
            }
        </Row>
    )
}

export default ExploreList
