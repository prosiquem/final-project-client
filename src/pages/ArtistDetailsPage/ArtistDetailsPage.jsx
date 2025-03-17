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
import { UserMessageContext } from "../../contexts/userMessage.context"
import uploadServices from "../../services/upload.services"

const ArtistDetailsPage = () => {

    const { id: artistId } = useParams()

    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)

    const [artist, setArtist] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [artistAlbum, setArtistAlbums] = useState()
    const [loadingImage, setLoadingImage] = useState(false)


    const [socialMediaData, setSocialMediaData] = useState([
        {
            socialMedia: "Youtube",
            url: "",
            icon: "Youtube"
        }
    ])

    useEffect(() => {

        fetchData(artistId)

    }, [artistId])

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
                console.log(artistData)
            })
            .catch(err => console.log(err))

    }

    const handleInputChange = e => {

        const { value, name } = e.target
        setArtist({ ...artist, [name]: value })

    }

    const handleMultiSelectChange = (name, selectedOption) => {
        const values = selectedOption
            ? selectedOption.map((option) => option.value)
            : []
        setArtist({ ...artist, [name]: values })
    }

    const editArtist = () => {

        userServices
            .editUser(artistId, artist)
            .then(() => {
                fetchData(artistId)
                createAlert('Artista editado', false)
            })
            .catch(err => console.log(err))
    }

    const handleSocialMediaChange = (e, idx) => {
        const { value } = e.target
        const socialMediaCopy = [...socialMediaData]
        socialMediaCopy[idx].url = value
        setSocialMediaData(socialMediaCopy)
        setArtist({ ...artist, socialMedia: socialMediaCopy })
    }

    const addSocialMedia = () => {
        const socialMediaCopy = [...socialMediaData]
        socialMediaCopy.push(
            {
                socialMedia: "Youtube",
                url: "",
                icon: "Youtube"
            }
        )
        setSocialMediaData(socialMediaCopy)
    }

    const deleteSocialMedia = (idx) => {
        const socialMediaCopy = [...socialMediaData]
        if (socialMediaCopy.length > 1) {
            socialMediaCopy.splice(idx, 1)
            setSocialMediaData(socialMediaCopy)
            setArtist({ ...artist, socialMedia: socialMediaCopy })
        }
    }

    const handleSocialMediaSelectChange = (idx, e) => {
        const socialMediaCopy = [...socialMediaData]
        const { value } = e.target
        let socialMedia = value.split(',')
        socialMediaCopy[idx].socialMedia = socialMedia[0]
        socialMediaCopy[idx].icon = socialMedia[1]
        setSocialMediaData(socialMediaCopy)
        setArtist({ ...artist, socialMedia: socialMediaCopy })
    }

    const handleGalleryUpload = (e) => {

        const formData = new FormData()

        Array.from(e.target.files).forEach((file) => {
            formData.append("galleryData", file)
        })

        setLoadingImage(true)

        uploadServices

            .uploadGallery(formData)
            .then(({ data }) => {

                const artistGalleryCopy = [...artist.artistGallery]
                artistGalleryCopy.push(...data.cloudinary_url)

                setArtist({ ...artist, artistGallery: artistGalleryCopy })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
                console.log(err)
            })

    }

    const deleteGalleryElm = (idx) => {

        const artistGalleryCopy = [...artist.artistGallery]
        artistGalleryCopy.splice(idx, 1)

        setArtist({ ...artist, artistGallery: artistGalleryCopy })

    }

    return (isLoading ? <Loader /> :
        <div className="ArtistDetailsPage">
            <Container className="page-container">

                <Carousel fade controls={false} indicators={false} interval={4000} className="coverCarousel">
                    {artist.artistGallery.length > 0 ? artist.artistGallery.map(elm => {
                        return (
                            <Carousel.Item key={elm} className="coverCarouselItem">
                                <Image src={elm} className="coverCarouselImage" />
                            </Carousel.Item>
                        )
                    }) :
                        <Carousel.Item className="coverCarouselItem">
                            <Image src={artist.avatar} />
                        </Carousel.Item>}
                </Carousel>

                <ArtistDetailsHeader
                    data={artist}
                    changeData={setArtist}
                    loggedUser={loggedUser}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}

                    handleInputChange={handleInputChange} />

                <ArtistDetailsDescription
                    data={artist}
                    changeData={setArtist}
                    isEditing={isEditing}
                    socialMediaData={socialMediaData}
                    setSocialMediaData={setSocialMediaData}

                    handleInputChange={handleInputChange}
                    handleMultiSelectChange={handleMultiSelectChange}

                    handleSocialMediaChange={handleSocialMediaChange}
                    deleteSocialMedia={deleteSocialMedia}
                    addSocialMedia={addSocialMedia}
                    handleSocialMediaSelectChange={handleSocialMediaSelectChange} />

                {isEditing &&
                    <Col md={{ offset: "1" }}>
                        <h2>Galería de imágenes</h2>
                        <ArtistGalleryForm
                            data={artist}
                            handleGalleryUpload={handleGalleryUpload}
                            deleteGalleryElm={deleteGalleryElm} />
                    </Col>
                }

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
                        variant="custom-primary"
                        disabled={loadingImage} >
                        Guardar
                    </Button>}


            </Container>
        </div>
    )

}

export default ArtistDetailsPage