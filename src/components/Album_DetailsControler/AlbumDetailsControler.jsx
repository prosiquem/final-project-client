import { useContext } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PauseFill, PlusLg } from "react-bootstrap-icons"
import { TracksUploaderContext } from "../../contexts/tracksUploader.context"
import { useParams } from "react-router-dom"
import { useMusicPlayer } from '../../contexts/musicPlayer.context'

const AlbumDetailsControler = ({ data, loggedUser, isLoadingTracks }) => {
    const { id: albumId } = useParams()
    const { openTrackUploader, setAlbumId } = useContext(TracksUploaderContext)
    const { currentTrack, isPlaying, playTrack, togglePlayPause } = useMusicPlayer()

    const handlePlayClick = () => {
        if (data.tracks.length > 0) {
            const firstTrack = data.tracks[0]
            if (currentTrack && currentTrack.title === firstTrack.title) {
                togglePlayPause()
            } else {
                const trackData = {
                    file: firstTrack.file,
                    title: firstTrack.title,
                    artistName: firstTrack.author.artistName,
                    cover: firstTrack.album.cover,
                }
                playTrack(trackData)
            }
        }
    }

    return (
        <Row className="AlbumDetailsControler w-100">
            <Col className="py-3 px-3 py-md-4">
                <Button
                    variant="custom-primary me-3"
                    onClick={handlePlayClick}>
                    {isPlaying && currentTrack?.title === data.tracks[0]?.title ? <PauseFill /> : <PlayFill />}
                </Button>

                {data.tracks.length > 0 && data.author._id === loggedUser._id &&
                    <Button
                        variant="custom-secondary h-100"
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
