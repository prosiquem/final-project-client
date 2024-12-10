import { Col, Row } from "react-bootstrap"
import ArtistCard from "../ArtistCard/ArtistCard"
import AddButton from "../AddButton/AddButton"

const ArtistList = ({ artists }) => {
    return (
        <Row className="my-5 gap-4 artist-list">

            {
                artists.map(elm => {
                    return (
                        <Col lg="2" md="3" sm="4" key={elm._id}>
                            <ArtistCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default ArtistList