import { Button, Container } from 'react-bootstrap'
import { FastForwardFill, PauseFill, PlayFill, RewindFill } from 'react-bootstrap-icons'
import { useMusicPlayer } from '../../contexts/musicplayer.context'
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

                    <div className="music-player-info">

                        <div className="album-cover">
                            <img src={currentTrack.cover} alt="Album Cover" />
                        </div>

                        <div className="music-info">
                            <div className="song-title">{currentTrack.title}</div>
                            <div className="artist-name">{currentTrack.artistName}</div>
                        </div>

                    </div>

                    <div className="progress-bar-container" onClick={handleProgressClick}>
                        <input
                            type="range"
                            className="progress-bar"
                            min="0"
                            max={duration}
                            value={currentTime}
                            step="0.1"
                            onChange={handleSeekChange}>
                        </input>

                    </div>

                    <div className="controls">
                        <Button variant="custom-secondary" onClick={prevTrack}>
                            <RewindFill />
                        </Button>

                        <Button variant="custom-secondary" onClick={togglePlayPause}>
                            {isPlaying ? <PauseFill /> : <PlayFill />}
                        </Button>

                        <Button variant="custom-secondary" onClick={nextTrack}>
                            <FastForwardFill />
                        </Button>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default MusicPlayer
