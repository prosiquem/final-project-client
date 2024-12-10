import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userServices from "../../services/user.services"
import Loader from "../../components/Loader/Loader"
import { Carousel, Container, Image } from "react-bootstrap"
import ArtistDetailsHeader from "../../components/Artist_DetailsHeader/ArtistDetailsHeader"
import { AuthContext } from "../../contexts/auth.context"

import './ArtistDetailsPage.css'

const ArtistDetailsPage = () => {

    const { id: artistId } = useParams()

    const { loggedUser } = useContext(AuthContext)

    const [artist, setArtist] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        fetchArtist(artistId)

    }, [artistId])

    const fetchArtist = (artistId) => {

        userServices
            .fetchUser(artistId)
            .then(({ data }) => {
                setArtist(data)
                setIsLoading(false)
            })
    }

    return (isLoading ? <Loader /> :
        <div className="ArtistDetailsPage">
            <Container className="page-container gap-4">

                <Carousel fade controls={false} interval={4000} className="coverCarousel">
                    {artist.artistGallery.map(elm => {
                        return (
                            <Carousel.Item className="coverCarouselItem">
                                <Image src={elm} className="coverCarouselImage" />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>

                <ArtistDetailsHeader data={artist} loggedUser={loggedUser} />

            </Container>
        </div>
    )

}

export default ArtistDetailsPage