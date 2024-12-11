import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PlusLg } from "react-bootstrap-icons"

const DetailsControler = ({ data, loggedUser, setAddTrack, playTrack }) => {

    const handlePlayClick = () => {
        if (data.tracks.length > 0) {
            const firstTrack = data.tracks[0]
            const trackData = {
                file: firstTrack.file,
                title: firstTrack.title,
                artistName: firstTrack.author.artistName,
                cover: firstTrack.album.cover,
            }
            playTrack(trackData)
        }
    }

    return (
        <Row className="DetailsControler">
            <Col className="py-2 py-md-5">
                <Button variant="custom-primary me-2" onClick={handlePlayClick}> <PlayFill /> </Button>
                <Button variant="custom-secondary me-2 h-100">Guardarme la playlist</Button>
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