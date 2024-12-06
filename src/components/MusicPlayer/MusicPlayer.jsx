import { FastForwardFill, PlayFill, RewindFill } from 'react-bootstrap-icons'

const MusicPlayer = () => {

    return (
        <div className="music-player-container">
            <div className="music-player">
                <div className="music-info">
                    <div className="song-title">Canción</div>
                    <div className="artist-name">Artista</div>
                </div>

                <div className="controls">
                    <button className="control-btn prev-btn"><RewindFill /></button>
                    <button className="control-btn play-btn"><PlayFill /></button>
                    <button className="control-btn next-btn"><FastForwardFill /></button>
                </div>
            </div>

        </div>
    )
}

export default MusicPlayer