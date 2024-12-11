import { useContext } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PlusLg } from "react-bootstrap-icons"
import { TracksUploaderContext } from "../../contexts/tracksUploader.context"
import { useParams } from "react-router-dom"

const AlbumDetailsControler = ({ data, loggedUser, isLoadingTracks, playTrack }) => {

    const { id: albumId } = useParams()

    const { openTrackUploader, setAlbumId } = useContext(TracksUploaderContext)

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
        <Row className="AlbumDetailsControler w-100">
            <Col className="p-0">
                <Button variant="custom-primary me-2" onClick={handlePlayClick}> <PlayFill /> </Button>
                {data.tracks.length > 0 && data.author._id === loggedUser._id &&
                    <Button
                        variant="custom-secondary me-2 h-100"
                        onClick={() => { openTrackUploader(true), setAlbumId(albumId) }}
                        disabled={isLoadingTracks}>
                        <PlusLg />
                    </Button>
                }
            </Col>
        </Row>
    )

}

export default AlbumDetailsControler