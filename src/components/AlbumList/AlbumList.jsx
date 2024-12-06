import { Col, Row } from "react-bootstrap"
import AlbumCard from "../AlbumCard/AlbumCard"

const AlbumList = ({ albums }) => {
    return (
        <Row className="my-5 gap-4 album-list">
            {
                albums.map(elm => {
                    return (
                        <Col lg="2" md="3" sm="4" key={elm._id}>
                            <AlbumCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default AlbumList
