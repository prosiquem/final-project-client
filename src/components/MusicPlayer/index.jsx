import DesktopMusicPlayer from "./DesktopMusicPlayer"
import MobileMusicPlayer from "./MobileMusicPlayer"

const MusicPlayer = () => {

    return (
        <div className="MusicPlayer">
            <DesktopMusicPlayer />
            <MobileMusicPlayer />
        </div>
    )

}

export default MusicPlayer