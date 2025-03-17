import { useState, useEffect } from 'react'
import { Button, Container, Row, Col, Image } from 'react-bootstrap'
import { FastForwardFill, PauseFill, PlayFill, RewindFill } from 'react-bootstrap-icons'
import { useMusicPlayer } from '../../contexts/musicPlayer.context'
import './MusicPlayer.css'

const DesktopMusicPlayer = () => {
    const { currentTrack, isPlaying, togglePlayPause, nextTrack, prevTrack, currentTime, duration, seek } = useMusicPlayer()
    const [isVisible, setIsVisible] = useState(false)
    const [isRotating, setIsRotating] = useState(false)
    const [displayCover, setDisplayCover] = useState(null)
    const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
        if (currentTrack) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [currentTrack])

    useEffect(() => {
        if (currentTrack?.cover) {
            if (firstRender) {
                setFirstRender(false)
                setDisplayCover(currentTrack.cover)
            } else if (currentTrack.cover !== displayCover) {
                setIsRotating(true)

                setTimeout(() => {
                    setDisplayCover(currentTrack.cover)
                }, 400)

                setTimeout(() => {
                    setIsRotating(false)
                }, 400)
            }
        }
    }, [currentTrack?.cover, displayCover, firstRender])

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
        <div className="desktop-music-player-div">
            <Container className={`desktop-music-player-container ${isVisible ? 'visible' : ''} g-0`}>
                <div className="desktop-music-player">
                    <Row className="align-items-center">

                        <Col xs="2" md={{ span: "1" }}>
                            <div
                                className={`desktop-album-cover-wrapper ${isRotating ? 'rotating' : ''}`}
                            >
                                <Image
                                    fluid
                                    src={displayCover || currentTrack.cover}
                                    alt="Album Cover"
                                    className="rounded album-cover"
                                />
                            </div>
                        </Col>

                        <Col xs="3" md={{ span: "2" }} className="desktop-music-info d-flex align-self-center px-0">
                            <div className="info-wrapper d-flex flex-column align-self-center ">
                                <h4 className="desktop-song-title mb-0">{currentTrack.title}</h4>
                                <label className="desktop-artist-name">{currentTrack.artistName}</label>
                            </div>
                        </Col>

                        <Col xs="7" md={{ span: "5" }} lg="6" className="desktop-progress-bar-container my-3" onClick={handleProgressClick}>
                            <input
                                type="range"
                                className="progress-bar w-100"
                                min="0"
                                max={duration}
                                value={currentTime}
                                step="0.1"
                                onChange={handleSeekChange}
                                style={{
                                    background: `linear-gradient(to right, #aaf700 ${(currentTime / duration) * 100}%, #252525a4 ${(currentTime / duration) * 100}%)`,
                                }}
                            />
                        </Col>

                        <Col xs="12" md={{ span: "4" }} lg="3" className="desktop-controls text-end">
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

export default DesktopMusicPlayer
