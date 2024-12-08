import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DEFAULT_IMAGES } from '../../consts/path.consts'
import './PlaylistCard.css'

const PlaylistCard = ({ _id, owner, cover, name, tracks }) => {

    const image = cover || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]

    return (
        <article className="playlist-card mb-3">

            <div className="playlist-card-container">

                <Card className="playlist-card mb-2">

                    <Link to={`/playlist/${_id}`} className="link">
                        <Card.Img
                            variant="top"
                            src={image}
                            className="playlist-card-img"
                        />
                    </Link>
                </Card>

                <div className="playlist-card-text">
                    <Link to={`/playlist/${_id}`} className="link">
                        <h5 className="playlist-card-title">{name}</h5>
                        <p className="playlist-card-subtitle">
                            Playlist  · {owner.username} · {tracks.length === 1 ? `${tracks.length} pista` : `${tracks.length} pistas`}
                        </p>
                    </Link>
                </div>

            </div>

        </article >
    )
}

export default PlaylistCard
