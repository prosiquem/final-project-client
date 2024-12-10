import { Col, Row } from "react-bootstrap"
import AlbumCard from "../AlbumCard/AlbumCard"
import AddButton from "../AddButton/AddButton"

const AlbumList = ({ albums, showAddButton = true }) => {
    return (
        <Row className="my-5 gap-4 album-list">

            {showAddButton && (
                <Col lg="2" md="3" sm="4">
                    <AddButton />
                </Col>
            )}

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
