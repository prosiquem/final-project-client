import { Col, Row } from "react-bootstrap"
import AlbumCard from "../AlbumCard/AlbumCard"

const AlbumList = ({ albums }) => {
    return (
        <Row className="g-0">
            {
                albums.map(elm => {
                    return (
                        <Col lg={{ span: 3 }} md={{ span: 6 }} key={elm._id}>
                            <AlbumCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default AlbumList
