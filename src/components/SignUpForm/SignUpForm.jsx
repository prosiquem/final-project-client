import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import authServices from "../../services/auth.services"
import "./SignUpForm.css"

import { Button, Container, Form, Spinner, Tab, Tabs } from "react-bootstrap"

import UserSignUp from "../UserSignUp/UserSignUp"
import ArtistSignUp from "../ArtistSignUp/ArtistSignUp"
import uploadServices from "../../services/upload.services"
import { UserMessageContext } from "../../contexts/userMessage.context"

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
        description: ""
    })

    const [socialMediaData, setSocialMediaData] = useState([
        {
            socialMedia: "Youtube",
            url: "",
            icon: "Youtube"
        }
    ])

    const [loadingImage, setLoadingImage] = useState(false)
    const [isValidated, setIsValidated] = useState(false)

    const { createAlert } = useContext(UserMessageContext)

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

    const handleSingleFileUpload = (e) => {

        const formData = new FormData()

        formData.append("imageData", e.target.files[0])

        setLoadingImage(true)

        uploadServices

            .uploadImage(formData)
            .then(({ data }) => {

                setSignupData({ ...signupData, avatar: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
                console.log(err)
            })
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

                setSignupData({ ...signupData, artistGallery: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
                console.log(err)
            })

    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target

        const reqPayloadSignup = {
            ...signupData,
            socialMedia: socialMediaData
        }

        if (form.checkValidity() === false) {
            e.stopPropagation()
            setIsValidated(true)
            createAlert(`Rellena todos los campos`, false)
            return
        }

        authServices
            .signupUser(reqPayloadSignup)
            .then(() => navigate("/login"))
            .catch((err) => console.log(err))
    }

    return (
        <Form
            className="text-center"
            onSubmit={handleFormSubmit}
            noValidate
            validated={isValidated}
        >
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
                        handleSingleFileUpload={handleSingleFileUpload}
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

                        handleSingleFileUpload={handleSingleFileUpload}
                        handleGalleryUpload={handleGalleryUpload}
                    />
                </Tab>
            </Tabs>
            <Button
                type="submit"
                variant="custom-primary"
                disabled={loadingImage}>
                {loadingImage ? <Spinner animation="border" variant="primary" /> : "Registrarme"}
            </Button>

            <Container className="my-4 d-flex justify-content-center signup-message">
                <p>¿Ya tienes una cuenta? <Link to="/login" className="text-link">Inicia sesión</Link></p>
            </Container>
        </Form>
    )
}

export default SignUpForm
