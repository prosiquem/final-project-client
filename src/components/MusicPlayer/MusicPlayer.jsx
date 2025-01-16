import { useState, useEffect, useContext } from 'react'
import { Button, Container, Row, Col, Image } from 'react-bootstrap'
import { FastForwardFill, PauseFill, PlayFill, RewindFill } from 'react-bootstrap-icons'
import { useMusicPlayer } from '../../contexts/musicPlayer.context'
import './MusicPlayer.css'

const MusicPlayer = () => {
    const { currentTrack, isPlaying, togglePlayPause, nextTrack, prevTrack, currentTime, duration, seek } = useMusicPlayer()
    const [isVisible, setIsVisible] = useState(false)
    const [isRotating, setIsRotating] = useState(false)
    const [displayCover, setDisplayCover] = useState(null)

    useEffect(() => {
        if (currentTrack) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [currentTrack])

    useEffect(() => {
        if (currentTrack?.cover) {
            setIsRotating(true)

            setTimeout(() => {
                setDisplayCover(currentTrack.cover)
            }, 250)

            setTimeout(() => {
                setIsRotating(false)
            }, 500)
        }
    }, [currentTrack?.cover])

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
            <Container className={`music-player-container ${isVisible ? 'visible' : ''}`}>
                <div className="music-player">
                    <Row className="align-items-center">
                        <Col xs="2" sm="" md={{ span: "1" }}>
                            <div
                                className={`album-cover-wrapper ${isRotating ? 'rotating' : ''}`}
                            >
                                <Image
                                    fluid
                                    src={displayCover || currentTrack.cover}
                                    alt="Album Cover"
                                    className="rounded album-cover"
                                />
                            </div>
                        </Col>
                        <Col xs="10" sm="" md={{ span: "2" }} className="music-info d-flex flex-column align-self-end">
                            <h4 className="song-title mb-1">{currentTrack.title}</h4>
                            <label className="artist-name">{currentTrack.artistName}</label>
                        </Col>
                        <Col xs="5" sm="" md={{ span: "4" }} lg="6" className="progress-bar-container my-3" onClick={handleProgressClick}>
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
                        <Col xs="7" md={{ span: "5" }} lg="3" className="controls text-end">
                            <Button variant="custom-player me-1" onClick={prevTrack}>
                                <RewindFill />
                            </Button>
                            <Button variant="custom-player me-1" onClick={togglePlayPause}>
                                {isPlaying ? <PauseFill /> : <PlayFill />}
                            </Button>
                            <Button variant="custom-player" onClick={nextTrack}>
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
