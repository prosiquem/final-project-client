import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_IMAGES } from '../../consts/path.consts'
import './AlbumCard.css'

const AlbumCard = ({ _id, author, cover, title, tracks }) => {

    const navigate = useNavigate()
    const image = cover || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]

    const handleNavigate = () => {
        navigate(`/album/${_id}`)
    }

    return (
        <article className="album-card-container mb-3" onClick={handleNavigate}>
            <Card className="album-card mb-2">
                <Card.Img
                    variant="top"
                    src={image}
                    className="album-card-img"
                />
            </Card>

            <div className="album-card-text">
                <h5 className="album-card-title">{title}</h5>
                <p className="album-card-subtitle">
                    {tracks && tracks.length === 1 ? "Single" : "Álbum"} · {author.artistName}
                </p>
            </div>
        </article>
    )
}

export default AlbumCard