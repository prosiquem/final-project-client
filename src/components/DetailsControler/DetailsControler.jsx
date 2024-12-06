import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PlusLg } from "react-bootstrap-icons"
import TrackSearchBar from "../TrackSearchBar/TrackSearchBar"

const DetailsControler = ({ data }) => {

    return (
        <Row className="DetailsControler w-100">
            <Col>
                <Button variant="custom-primary me-4"> <PlayFill /> </Button>
                <Button variant="custom-secondary">Guardarme la playlist</Button>
                {data.tracks.length > 0 &&
                    <Button variant="custom-secondary">
                        <PlusLg />
                    </Button>
                }
            </Col>
        </Row>
    )

}

export default DetailsControler