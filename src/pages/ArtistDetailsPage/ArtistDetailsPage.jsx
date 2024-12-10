import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userServices from "../../services/user.services"
import Loader from "../../components/Loader/Loader"
import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap"
import ArtistDetailsHeader from "../../components/Artist_DetailsHeader/ArtistDetailsHeader"
import { AuthContext } from "../../contexts/auth.context"

import './ArtistDetailsPage.css'
import ArtistDetailsDescription from "../../components/Artist_DetailDescription/ArtistDetailDescription"
import ArtistGalleryForm from "../../components/ArtistGalleryForm/ArtistGalleryForm"
import albumServices from "../../services/album.services"
import AlbumList from "../../components/AlbumList/AlbumList"
import AlbumCard from "../../components/AlbumCard/AlbumCard"

const ArtistDetailsPage = () => {

    const { id: artistId } = useParams()

    const { loggedUser } = useContext(AuthContext)

    const [artist, setArtist] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [artistAlbum, setArtistAlbums] = useState()


    const [socialMediaData, setSocialMediaData] = useState([
        {
            socialMedia: "Youtube",
            url: "",
            icon: "Youtube"
        }
    ])

    useEffect(() => {

        fetchData(artistId)

    }, [artistId, isEditing])

    const fetchData = (artistId) => {
        const artistData = [
            userServices.fetchUser(artistId),
            albumServices.fetchArtistAlbum(artistId)
        ]

        Promise.all(artistData)
            .then(([{ data: artistData }, { data: albumArtistData }]) => {
                setArtist(artistData)
                setSocialMediaData(artistData.socialMedia)
                setArtistAlbums(albumArtistData)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }

    const editArtist = (artistId) => {
        console.log(artist)
    }

    return (isLoading ? <Loader /> :
        <div className="ArtistDetailsPage">
            <Container className="page-container">

                <Carousel fade controls={false} indicators={false} interval={4000} className="coverCarousel">
                    {artist.artistGallery.map(elm => {
                        return (
                            <Carousel.Item className="coverCarouselItem">
                                <Image src={elm} className="coverCarouselImage" />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>

                <ArtistDetailsHeader
                    data={artist}
                    changeData={setArtist}
                    loggedUser={loggedUser}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editArtist={editArtist} />

                <ArtistDetailsDescription
                    data={artist}
                    changeData={setArtist}
                    loggedUser={loggedUser}
                    isEditing={isEditing}
                    socialMediaData={socialMediaData}
                    setSocialMediaData={setSocialMediaData} />

                {isEditing && <ArtistGalleryForm />}

                {!isEditing && <Row className="py-5">
                    <Col md={{ offset: "1" }}>
                        <h2>Discografía</h2>
                        {
                            artistAlbum.length <= 0 ? < Loader /> :
                                <AlbumList albums={artistAlbum} />
                        }
                    </Col>
                </Row>}

                {isEditing &&
                    <Button
                        onClick={() => { setIsEditing(false), editArtist() }}
                        variant="custom-primary">
                        Guardar
                    </Button>}


            </Container>
        </div>
    )

}

export default ArtistDetailsPage