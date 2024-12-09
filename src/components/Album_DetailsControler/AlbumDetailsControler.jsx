import { useContext } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PlusLg } from "react-bootstrap-icons"
import { TracksUploaderContext } from "../../contexts/tracksUploader.context"

const AlbumDetailsControler = ({ data, loggedUser, setAddTrack }) => {

    const { openTrackUploader } = useContext(TracksUploaderContext)

    return (
        <Row className="AlbumDetailsControler w-100">
            <Col className="p-0">
                <Button variant="custom-primary me-2"> <PlayFill /> </Button>
                {data.tracks.length > 0 && data.author._id === loggedUser._id &&
                    <Button variant="custom-secondary me-2" onClick={openTrackUploader}>
                        <PlusLg />
                    </Button>
                }
            </Col>
        </Row>
    )

}

export default AlbumDetailsControler