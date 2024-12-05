import { Card } from 'react-bootstrap'
import './AlbumCard.css'
import { Link } from 'react-router-dom'
import { MEDIA } from '../../consts/path.consts'

const AlbumCard = ({ id, author, cover, title, tracks }) => {

    const image = cover || MEDIA.DEFAULT_IMAGES[Math.floor(Math.random() * MEDIA.DEFAULT_IMAGES.length)]

    return (
        <article className="album-card mb-3">
            <Link to={`/albums/${id}`} className="link">
                <div className="album-card-container">
                    <Card className="album-card">
                        <Card.Img
                            variant="top"
                            src={image}
                            className="playlist-card-img"
                        />
                    </Card>

                    <div className="album-card-text">
                        <h5 className="album-card-title">{title}</h5>
                        <p className="album-card-subtitle">
                            {tracks && tracks.length === 1 ? "Single" : "Álbum"} · {author.username}
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default AlbumCard