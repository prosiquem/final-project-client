import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_IMAGES } from '../../consts/path.consts'
import './PlaylistCard.css'

const PlaylistCard = ({ _id, owner, cover, name, tracks }) => {

    const navigate = useNavigate()

    const image = cover || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]

    const handleNavigate = () => {
        navigate(`/playlist/${_id}`)
    }

    return (
        <article className="playlist-card-container mb-3" onClick={handleNavigate}>

            <Card className="playlist-card mb-2 ">
                <Card.Img
                    variant="top"
                    src={image}
                    className="playlist-card-img"
                />
            </Card>

            <div className="playlist-card-text">
                <h5 className="playlist-card-title">{name}</h5>
                <p className="playlist-card-subtitle">
                    Playlist  · {owner.username} · {tracks.length === 1 ? `${tracks.length} pista` : `${tracks.length} pistas`}
                </p>
            </div>

        </article >
    )
}

export default PlaylistCard
