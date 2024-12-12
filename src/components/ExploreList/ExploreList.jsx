import { Col, Row } from "react-bootstrap"
import ArtistCard from "../ArtistCard/ArtistCard"
import PlaylistCard from "../PlaylistCard/PlaylistCard"
import AlbumCard from "../AlbumCard/AlbumCard"

const ExploreList = ({ artists, playlists, albums }) => {

    const randomExplore = [
        ...artists.map((artist) => ({
            ...artist,
            type: "artist"
        })),
        ...playlists.map((playlist) => ({
            ...playlist,
            type: "playlist"
        })),
        ...albums.map((album) => ({
            ...album,
            type: "album"
        }))
    ]

    const randomizeCards = randomExplore.sort(() => Math.random() - 0.5)

    return (
        <Row className="my-5 pb-5 explore-list">
            {
                randomizeCards.map((elm) => (
                    <Col key={elm._id} xs={6} sm={6} md={4} lg={3}>
                        {elm.type === "artist" && <ArtistCard {...elm} />}
                        {elm.type === "playlist" && <PlaylistCard {...elm} />}
                        {elm.type === "album" && <AlbumCard {...elm} />}
                    </Col>
                ))
            }
        </Row>
    )
}

export default ExploreList
