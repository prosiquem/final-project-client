import { Card } from 'react-bootstrap'
import './PlaylistCard.css'
import { Link } from 'react-router-dom'
import { MEDIA } from '../../consts/path.consts'

const PlaylistCard = ({ _id, owner, cover, name, tracks }) => {

    const imageSrc = cover || MEDIA.DEFAULT_IMAGES[Math.floor(Math.random() * MEDIA.DEFAULT_IMAGES.length)]

    return (
        <article className="playlist-card mb-3">
            <Link to={`/playlist/${_id}`} className="link">
                <div className="playlist-card-container">
                    <Card className="playlist-card">
                        <Card.Img
                            variant="top"
                            src={imageSrc}
                            className="playlist-card-img"
                        />
                    </Card>

                    <div className="playlist-card-text">
                        <h5 className="playlist-card-title">{name}</h5>
                        <p className="playlist-card-subtitle">
                            {tracks.length === 1 ? `${tracks.length} pista` : `${tracks.length} pistas`} · {owner.username}
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default PlaylistCard
