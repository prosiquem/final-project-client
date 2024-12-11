import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import { FastForwardFill, PauseFill, PlayFill, RewindFill } from 'react-bootstrap-icons';
import { useMusicPlayer } from '../../contexts/musicPlayer.context';
import './MusicPlayer.css';

const MusicPlayer = () => {

    const { currentTrack, isPlaying, togglePlayPause, nextTrack, prevTrack, currentTime, duration, seek } = useMusicPlayer();

    if (!currentTrack) {
        return null;
    }

    const handleSeekChange = (event) => {
        const newTime = event.target.value;
        seek(newTime);
    };

    const handleProgressClick = (event) => {
        const progressBar = event.target;
        const clickPosition = event.nativeEvent.offsetX;
        const newTime = (clickPosition / progressBar.offsetWidth) * duration;
        seek(newTime);
    };

    return (
        <div className="music-player-div">
            <Container className="music-player-container">

                <div className="music-player">
                    <Row className="align-items-center">

                        <Col xs="12" md={{ span: "1" }} >
                            <Image fluid src={currentTrack.cover} alt="Album Cover" className=" rounded" />
                        </Col>

                        <Col md={{ span: "2" }} className="music-info d-flex flex-column align-self-end">
                            <h4 className="song-title mb-1">{currentTrack.title}</h4>
                            <label className="artist-name">{currentTrack.artistName}</label>
                        </Col>

                        <Col xs="10" md className="progress-bar-container" onClick={handleProgressClick}>
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

                        <Col xs="auto" className="controls d-flex ml-5">
                            <Button variant="custom-secondary" onClick={prevTrack} className="">
                                <RewindFill />
                            </Button>

                            <Button variant="custom-secondary" onClick={togglePlayPause} className="">
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
    );
};

export default MusicPlayer;