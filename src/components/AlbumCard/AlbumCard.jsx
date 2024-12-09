import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DEFAULT_IMAGES } from '../../consts/path.consts'
import './AlbumCard.css'

const AlbumCard = ({ _id, author, cover, title, tracks }) => {

    const image = cover || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]

    return (
        <article className="album-card-container mb-3">

            <Card className="album-card mb-2">
                <Link to={`/album/${_id}`} className="link">
                    <Card.Img
                        variant="top"
                        src={image}
                        className="album-card-img"
                    />
                </Link>
            </Card>

            <div className="album-card-text">
                <Link to={`/album/${_id}`} className="link">
                    <h5 className="album-card-title">{title}</h5>
                    <p className="album-card-subtitle">
                        {tracks && tracks.length === 1 ? "Single" : "Álbum"} · {author.artistName}
                    </p>
                </Link>
            </div>

        </article >
    )
}

export default AlbumCard