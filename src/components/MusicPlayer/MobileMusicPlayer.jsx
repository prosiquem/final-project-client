import { useState, useEffect, useRef } from 'react'
import { Button, Container, Row, Col, Image } from 'react-bootstrap'
import { PauseFill, PlayFill, SkipForwardFill, PlusCircle, SkipBackwardFill, PlusCircleFill } from 'react-bootstrap-icons'
import { useMusicPlayer } from '../../contexts/musicPlayer.context'
import './MusicPlayer.css'

const MobileMusicPlayer = () => {
    const { currentTrack, isPlaying, togglePlayPause, nextTrack, prevTrack, currentTime, duration, seek } = useMusicPlayer()
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isRotating, setIsRotating] = useState(false)
    const [displayCover, setDisplayCover] = useState(null)
    const [firstRender, setFirstRender] = useState(true)
    const [startY, setStartY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    const [buttonAnimationClass, setButtonAnimationClass] = useState('fade-in')
    const [progressAnimationClass, setProgressAnimationClass] = useState('fade-in')

    const [desktopAnimationClass, setDesktopAnimationClass] = useState('fade-out')

    const [backgroundOpacity, setBackgroundOpacity] = useState(0.4)

    const playerRef = useRef(null)
    const overlayRef = useRef(null)

    useEffect(() => {
        setIsVisible(!!currentTrack)
    }, [currentTrack])

    useEffect(() => {
        if (currentTrack?.cover) {
            if (firstRender) {
                setFirstRender(false)
                setDisplayCover(currentTrack.cover)
            } else if (currentTrack.cover !== displayCover) {
                setIsRotating(true)
                setBackgroundOpacity(0)
                setTimeout(() => {
                    setDisplayCover(currentTrack.cover)
                    setBackgroundOpacity(0.4)
                }, 500)
                setTimeout(() => {
                    setIsRotating(false)
                }, 500)
            }
        }
    }, [currentTrack?.cover, displayCover, firstRender])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                playerRef.current && !playerRef.current.contains(e.target) &&
                overlayRef.current && !overlayRef.current.contains(e.target)
            ) {
                setIsExpanded(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY)
        setIsDragging(false)
    }

    const handleTouchMove = (e) => {
        const currentY = e.touches[0].clientY
        if (currentY - startY > 30) {
            setIsDragging(true)
        }
    }

    const handleTouchEnd = () => {
        if (isDragging) {
            setIsExpanded(false)
        }
    }

    useEffect(() => {
        if (isExpanded) {
            setButtonAnimationClass('fade-out')
            setProgressAnimationClass('fade-out')
        } else {
            setButtonAnimationClass('fade-out')
            setProgressAnimationClass('fade-out')
            const timer = setTimeout(() => {
                setButtonAnimationClass('fade-in')
                setProgressAnimationClass('fade-in')
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [isExpanded])

    useEffect(() => {
        setDesktopAnimationClass(isExpanded ? 'fade-in' : 'fade-out')
    }, [isExpanded])

    const handleProgressClick = (event) => {
        const progressBar = event.currentTarget
        const clickPosition = event.nativeEvent.offsetX
        const newTime = (clickPosition / progressBar.offsetWidth) * duration
        seek(newTime)
    }

    const handleSeekChange = (event) => {
        const newTime = event.target.value
        seek(newTime)
    }

    if (!currentTrack) {
        return null
    }

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0

    return (
        <div>
            {isExpanded && (
                <div
                    ref={overlayRef}
                    className="overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.51)',
                        zIndex: 98,
                        pointerEvents: isExpanded ? 'auto' : 'none',
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsExpanded(false)
                    }}
                />
            )}

            <div
                className="mobile-music-player-div"
                ref={playerRef}
                onClick={(e) => {
                    if (!isExpanded) {
                        setIsExpanded(true)
                    }
                    e.stopPropagation()
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >

                <Container
                    className={`mobile-music-player-container ${isVisible ? 'visible' : ''} ${isExpanded ? 'expanded' : ''} g-0`}
                >

                    <div
                        style={{
                            backgroundImage: `url(${displayCover})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            filter: 'blur(40px)',
                            opacity: backgroundOpacity,
                            transition: 'opacity 0.5s ease',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: -1,
                        }}
                    />

                    <div className={`mobile-music-player ${isExpanded ? 'expanded' : ''}`}>

                        {isExpanded && <div className="grip-bar"></div>}

                        <Row className="align-items-center">
                            <Col xs="2" sm="2" md={{ span: '1' }} className={`mobile-album-cover-wrapper ${isRotating ? 'rotating' : ''} ${isExpanded ? 'expanded' : ''}`}>
                                <Image
                                    fluid
                                    src={displayCover || currentTrack.cover}
                                    alt="Album Cover"
                                    className={`mobile-album-cover ${isExpanded ? 'expanded' : ''}`}
                                />
                            </Col>

                            <Col xs="3" sm="2" md={{ span: '2' }} className="mobile-music-info d-flex align-items- px-0">
                                <div className="mobile-info-wrapper d-flex flex-column">
                                    <h4 className="mobile-song-title mb-0">{currentTrack.title}</h4>
                                    <label className="mobile-artist-name">
                                        <span>{currentTrack.artistName}</span>
                                    </label>
                                </div>
                            </Col>

                            <Col xs="7" md={{ span: '5' }} lg="3" className="d-flex justify-content-end">
                                <Button
                                    className={`mobile-play-button ${buttonAnimationClass} me-2`}
                                    variant="custom-player button"
                                    onClick={(e) => {
                                        nextTrack()
                                        e.stopPropagation()
                                    }}
                                >
                                    <SkipForwardFill />
                                </Button>

                                <Button
                                    className={`mobile-play-button ${buttonAnimationClass}`}
                                    variant="custom-player button"
                                    onClick={(e) => {
                                        togglePlayPause()
                                        e.stopPropagation()
                                    }}
                                >
                                    {isPlaying ? <PauseFill /> : <PlayFill />}
                                </Button>
                            </Col>
                        </Row>

                        <div
                            className={`mobile-progress-bar-container ${progressAnimationClass}`}
                            style={{
                                position: 'absolute',
                                bottom: '1px',
                                left: '14px',
                                right: '14px',
                                height: '3px',
                                backgroundColor: '#e1e1e124',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                className="progress-bar-visual"
                                style={{
                                    height: '100%',
                                    width: `${progressPercentage}%`,
                                    backgroundColor: '#aaf700',
                                    borderRadius: '10px',
                                    transition: 'width 0.3s ease',
                                }}
                            ></div>
                        </div>

                        <div className={`desktop-wrapper ${desktopAnimationClass}`}>

                            <Row className={`mt-4 mx-2`}>
                                <Col xs="12" md="5" lg="6">
                                    <div className="desktop-progress-bar-container" onClick={handleProgressClick}>
                                        <input
                                            type="range"
                                            className="progress-bar w-100"
                                            min="0"
                                            max={duration}
                                            value={currentTime}
                                            step="0.1"
                                            onChange={handleSeekChange}
                                            style={{
                                                background: `linear-gradient(to right, #aaf700 ${(currentTime / duration) * 100}%, #3e3e3ea4 ${(currentTime / duration) * 100}%)`,
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className={`mt-4`}>
                                <Col xs="12" md="4" lg="3" className="desktop-controls d-flex justify-content-center">
                                    <Button variant="custom-mobile-player me-1" onClick={prevTrack}>
                                        <SkipBackwardFill />
                                    </Button>
                                    <Button variant="custom-mobile-player me-1" onClick={togglePlayPause}>
                                        {isPlaying ? <PauseFill /> : <PlayFill />}
                                    </Button>
                                    <Button variant="custom-mobile-player" onClick={nextTrack}>
                                        <SkipForwardFill />
                                    </Button>

                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default MobileMusicPlayer
