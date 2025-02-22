import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PatchCheckFill } from 'react-bootstrap-icons'
import './ArtistCard.css'

const ArtistCard = ({ _id, avatar, verified, artistName }) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/artists/${_id}`)
    }

    return (
        <article className="artist-card" onClick={handleNavigate}>

            <div className="artist-card-container">
                <Card className="artist-card">
                    <Card.Img
                        variant="top"
                        src={avatar}
                        className="artist-card-img"
                    />
                </Card>

                <div className="artist-card-text d-flex justify-content-start mt-2">
                    <div className="artist-card-title-container">
                        <h5 className="artist-card-title">{artistName}</h5>
                        <p className="artist-card-subtitle">Artista</p>
                    </div>
                    {verified && <PatchCheckFill className="verified-icon" />}
                </div>

            </div>

        </article>
    )
}

export default ArtistCard