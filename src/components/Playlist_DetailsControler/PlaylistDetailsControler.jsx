import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PlusLg } from "react-bootstrap-icons"

const DetailsControler = ({ data, loggedUser, setAddTrack, playTrack, savePlaylist, unsavePlaylist, userData }) => {

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
            <Col className="py-3 px-3 py-md-4">
                <Row>
                    <Col xs={{ span: 3 }} md={{ span: 'auto' }}>
                        <Button variant="custom-primary me-1" onClick={handlePlayClick}> <PlayFill /> </Button>
                    </Col>

                    {loggedUser._id != data.owner._id &&

                        <Col xs={{ span: 8 }} md={{ span: 'auto' }} className="px-0">

                            {userData.playlists.find(elm => elm === data._id) === undefined ?
                                <Button
                                    variant="custom-secondary h-100"
                                    onClick={() => savePlaylist(data._id)}>
                                    Guardar
                                </Button>
                                :
                                <Button
                                    variant="custom-secondary h-100"
                                    onClick={() => unsavePlaylist(data._id)}>
                                    No guardar
                                </Button>}
                        </Col>}

                    <Col xs={{ span: 3 }} md={{ span: 'auto' }} className="px-0">

                        {data.tracks.length > 0 && data.owner._id === loggedUser._id &&
                            <Button
                                variant="custom-secondary "
                                onClick={() => setAddTrack(true)}>
                                <PlusLg />
                            </Button>}
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}

export default DetailsControler