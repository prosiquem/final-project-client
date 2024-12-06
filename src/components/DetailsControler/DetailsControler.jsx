import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PlusLg } from "react-bootstrap-icons"
import TrackSearchBar from "../TrackSearchBar/TrackSearchBar"

const DetailsControler = ({ data, loggedUser, setAddTrack }) => {

    return (
        <Row className="DetailsControler w-100">
            <Col>
                <Button variant="custom-primary me-4"> <PlayFill /> </Button>
                <Button variant="custom-secondary">Guardarme la playlist</Button>
                {data.tracks.length > 0 && data.owner._id === loggedUser._id &&
                    <Button variant="custom-secondary" onClick={() => setAddTrack(true)}>
                        <PlusLg />
                    </Button>
                }
            </Col>
        </Row>
    )

}

export default DetailsControler