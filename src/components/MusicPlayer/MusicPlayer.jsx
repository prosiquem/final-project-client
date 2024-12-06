import { Button } from 'react-bootstrap'
import { FastForwardFill, PauseFill, PlayFill, RewindFill } from 'react-bootstrap-icons'
import './MusicPlayer.css'

const MusicPlayer = () => {


    return (
        <div className="music-player-container">
            <div className="music-player">
                <div className="music-info">
                    <div className="song-title">Canción</div>
                    <div className="artist-name">Artista</div>
                </div>

                <div className="controls">
                    <Button variant='custom-secondary'>
                        <RewindFill />
                    </Button>
                    <Button variant='custom-secondary'>
                        <PlayFill />
                    </Button>
                    <Button variant='custom-secondary'>
                        <FastForwardFill />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer
