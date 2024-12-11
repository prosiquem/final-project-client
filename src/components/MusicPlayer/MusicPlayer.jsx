import { Button, Container, Row, Col, Image } from 'react-bootstrap'
import { FastForwardFill, PauseFill, PlayFill, RewindFill } from 'react-bootstrap-icons'
import { useMusicPlayer } from '../../contexts/musicPlayer.context'
import './MusicPlayer.css'

const MusicPlayer = () => {

    const { currentTrack, isPlaying, togglePlayPause, nextTrack, prevTrack, currentTime, duration, seek } = useMusicPlayer()

    if (!currentTrack) {
        return null
    }

    const handleSeekChange = (event) => {
        const newTime = event.target.value
        seek(newTime)
    }

    const handleProgressClick = (event) => {
        const progressBar = event.target
        const clickPosition = event.nativeEvent.offsetX
        const newTime = (clickPosition / progressBar.offsetWidth) * duration
        seek(newTime)
    }

    return (
        <div className="music-player-div">
            <Container className="music-player-container">

                <div className="music-player">
                    <Row className="align-items-center">

                        <Col xs="2" md={{ span: "1" }} >
                            <Image fluid src={currentTrack.cover} alt="Album Cover" className=" rounded" />
                        </Col>

                        <Col xs="10" md={{ span: "2" }} className="music-info d-flex flex-column align-self-end">
                            <h4 className="song-title mb-1">{currentTrack.title}</h4>
                            <label className="artist-name">{currentTrack.artistName}</label>
                        </Col>

                        <Col xs="6" md="4" lg="6" className="progress-bar-container my-3" onClick={handleProgressClick}>
                            <input
                                type="range"
                                className="progress-bar w-100"
                                min="0"
                                max={duration}
                                value={currentTime}
                                step="0.1"
                                onChange={handleSeekChange}
                                style={{
                                    background: `linear-gradient(to right, #aaf700 ${(currentTime / duration) * 100}%, #2c29299d ${(currentTime / duration) * 100}%)`
                                }}
                            />
                        </Col>

                        <Col xs="6" md="5" lg="3" className="controls text-end">
                            <Button variant="custom-secondary me-1" onClick={prevTrack}>
                                <RewindFill />
                            </Button>

                            <Button variant="custom-secondary me-1" onClick={togglePlayPause}>
                                {isPlaying ? <PauseFill /> : <PlayFill />}
                            </Button>

                            <Button variant="custom-secondary" onClick={nextTrack}>
                                <FastForwardFill />
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default MusicPlayer