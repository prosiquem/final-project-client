import { useState } from "react"
import { useNavigate } from "react-router-dom"

import authServices from "../../services/auth.services"
import "./SignUpForm.css"

import { Button, Form, Tab, Tabs } from "react-bootstrap"

import UserSignUp from "../UserSignUp/UserSignUp"
import ArtistSignUp from "../ArtistSignUp/ArtistSignUp"

const SignUpForm = () => {
    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
        username: "",
        birth: "",
        gender: "",
        role: "USER",
        avatar: "",
        musicGenres: [""],
        artistGallery: [""],
        relatedArtists: [],
        artistName: "",
    })

    const [socialMediaData, setSocialMediaData] = useState([
        {
            socialMedia: "Youtube",
            url: "",
            icon: "Youtube"
        }
    ])

    const handleRoleChange = (value) => {
        setSignupData({ ...signupData, ['role']: value })
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSingleSelectChange = (name, e) => {
        const { value } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleMultiSelectChange = (name, selectedOption) => {
        const values = selectedOption
            ? selectedOption.map((option) => option.value)
            : []
        setSignupData({ ...signupData, [name]: values })
    }

    const handleSocialMediaChange = (e, idx) => {
        const { value } = e.target
        const socialMediaCopy = [...socialMediaData]
        socialMediaCopy[idx].url = value
        setSocialMediaData(socialMediaCopy)
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
        }
    }

    const handleSocialMediaSelectChange = (idx, e) => {
        const socialMediaCopy = [...socialMediaData]
        const { value } = e.target
        let socialMedia = value.split(',')
        socialMediaCopy[idx].socialMedia = socialMedia[0]
        socialMediaCopy[idx].icon = socialMedia[1]
        setSocialMediaData(socialMediaCopy)
    }

    const handleArtistGalleryChange = (e, idx) => {
        const { value } = e.target
        const artistGalleryCopy = [...signupData.artistGallery]
        artistGalleryCopy[idx] = value
        setSignupData({ ...signupData, artistGallery: artistGalleryCopy })
    }

    const addArtistPhoto = () => {
        const artistGalleryCopy = [...signupData.artistGallery]
        artistGalleryCopy.push("")
        setSignupData({ ...signupData, artistGallery: artistGalleryCopy })
    }

    const deleteArtistPhoto = (idx) => {
        const artistGalleryCopy = [...signupData.artistGallery]
        if (artistGalleryCopy.length > 1) {
            artistGalleryCopy.splice(idx, 1)
            setSignupData({ ...signupData, artistGallery: artistGalleryCopy })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const reqPayloadSignup = {
            ...signupData,
            socialMedia: socialMediaData
        }

        authServices
            .signupUser(reqPayloadSignup)
            .then(() => navigate("/login"))
            .catch((err) => console.log(err))
    }

    return (
        <Form className="form text-center" onSubmit={handleFormSubmit}>
            <Tabs
                defaultActiveKey="USER"
                id="role-selection"
                onSelect={handleRoleChange}
                fill
            >
                <Tab eventKey="USER" title="Usuario">
                    <UserSignUp
                        signupData={signupData}
                        handleInputChange={handleInputChange}
                        handleSingleSelectChange={handleSingleSelectChange}
                    />
                </Tab>
                <Tab eventKey="ARTIST" title="Artista">
                    <ArtistSignUp
                        signupData={signupData}
                        socialMediaData={socialMediaData}
                        handleInputChange={handleInputChange}
                        handleSingleSelectChange={handleSingleSelectChange}
                        handleMultiSelectChange={handleMultiSelectChange}

                        handleSocialMediaChange={handleSocialMediaChange}
                        deleteSocialMedia={deleteSocialMedia}
                        addSocialMedia={addSocialMedia}
                        handleSocialMediaSelectChange={handleSocialMediaSelectChange}

                        handleArtistGalleryChange={handleArtistGalleryChange}
                        addArtistPhoto={addArtistPhoto}
                        deleteArtistPhoto={deleteArtistPhoto}
                    />
                </Tab>
            </Tabs>
            <Button onClick={handleFormSubmit} variant="custom-primary">Registrarme</Button>
        </Form>
    )
}

export default SignUpForm
