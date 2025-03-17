import { useContext } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { PlayFill, PauseFill, PlusLg } from "react-bootstrap-icons"
import { useMusicPlayer } from "../../contexts/musicPlayer.context"

const DetailsControler = ({ data, loggedUser, setAddTrack, playTrack, savePlaylist, unsavePlaylist, userData }) => {
    const { currentTrack, isPlaying, playTrack: playMusic, togglePlayPause } = useMusicPlayer()

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
                playMusic(trackData)
            }
        }
    }

    return (
        <Row className="DetailsControler">
            <Col className="py-3 px-3 py-md-4">
                <Row>
                    <Col xs={{ span: 3 }} md={{ span: 'auto' }}>
                        <Button variant="custom-primary" onClick={handlePlayClick}>
                            {isPlaying && currentTrack?.title === data.tracks[0]?.title ? <PauseFill /> : <PlayFill />}
                        </Button>
                    </Col>

                    {loggedUser._id !== data.owner._id && (
                        <Col xs={{ span: 8 }} md={{ span: 'auto' }} className="px-0">
                            {userData.playlists.includes(data._id) ? (
                                <Button
                                    variant="custom-secondary ms-3 h-100"
                                    onClick={() => unsavePlaylist(data._id)}>
                                    No guardar
                                </Button>
                            ) : (
                                <Button
                                    variant="custom-secondary ms-3 h-100"
                                    onClick={() => savePlaylist(data._id)}>
                                    Guardar
                                </Button>
                            )}
                        </Col>
                    )}

                    {data.tracks.length > 0 && data.owner._id === loggedUser._id && (
                        <Col xs={{ span: 3 }} md={{ span: 'auto' }} className="px-0">
                            <Button
                                variant="custom-secondary ms-3"
                                onClick={() => setAddTrack(true)}>
                                <PlusLg />
                            </Button>
                        </Col>
                    )}
                </Row>
            </Col>
        </Row>
    )
}

export default DetailsControler
