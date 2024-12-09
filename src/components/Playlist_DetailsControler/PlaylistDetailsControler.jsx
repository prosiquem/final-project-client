import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PlusLg } from "react-bootstrap-icons"
import TrackSearchBar from "../TrackSearchBar/TrackSearchBar"

const DetailsControler = ({ data, loggedUser, setAddTrack }) => {

    return (
        <Row className="DetailsControler w-100">
            <Col className="p-0">
                <Button variant="custom-primary me-2"> <PlayFill /> </Button>
                <Button variant="custom-secondary me-2">Guardarme la playlist</Button>
                {data.tracks.length > 0 && data.owner._id === loggedUser._id &&
                    <Button variant="custom-secondary me-2" onClick={() => setAddTrack(true)}>
                        <PlusLg />
                    </Button>
                }
            </Col>
        </Row>
    )

}

export default DetailsControler