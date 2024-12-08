import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PlusLg } from "react-bootstrap-icons"

const AlbumDetailsControler = ({ data, loggedUser, setAddTrack }) => {

    return (
        <Row className="AlbumDetailsControler w-100">
            <Col className="p-0">
                <Button variant="custom-primary me-2"> <PlayFill /> </Button>
                {data.tracks.length > 0 && data.author._id === loggedUser._id &&
                    <Button variant="custom-secondary me-2" onClick={() => setAddTrack(true)}>
                        <PlusLg />
                    </Button>
                }
            </Col>
        </Row>
    )

}

export default AlbumDetailsControler