import { Card } from 'react-bootstrap'
import './PlaylistCard.css'
import { Link } from 'react-router-dom'

const PlaylistCard = ({ id, owner, cover, name, tracks }) => {

    const defaultImages = [
        "https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-05.jpg",
        "https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
        "https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-02.jpg",
        "https://wallpapers.com/images/hd/bluish-purple-gradient-pajqixc44jlzwbfr.jpg"
    ]

    const imageSrc = cover || defaultImages[Math.floor(Math.random() * defaultImages.length)]

    return (
        <article className="playlist-card mb-3">
            <Link to={`/playlists/${id}`} className="link">
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
