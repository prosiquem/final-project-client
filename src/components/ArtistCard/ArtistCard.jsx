import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PatchCheckFill } from 'react-bootstrap-icons'
import './ArtistCard.css'

const ArtistCard = ({ _id, avatar, verified, artistName }) => {

    return (
        <article className="artist-card mb-3">
            <Link to={`/artists/${_id}`} className="link">
                <div className="artist-card-container">
                    <Card className="artist-card">
                        <Card.Img
                            variant="top"
                            src={avatar}
                            className="artist-card-img"
                        />
                    </Card>

                    <div className="artist-card-text">
                        <h5 className="artist-card-title">{artistName}</h5>
                        {verified && <PatchCheckFill className="verified-icon" />}
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default ArtistCard