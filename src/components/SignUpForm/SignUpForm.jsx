import { useState } from "react"
import { useNavigate } from "react-router-dom"

import authServices from "../../services/auth.services"
import "./SignUpForm.css"

import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap"
import Select from "react-select"
import makeAnimated from "react-select/animated"

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
        artistGallery: "",
        socialMedia: [""],
        relatedArtists: [""],
        artistName: "",
    })

    const handleRoleChange = (value) => {
        setSignupData({ ...signupData, ['role']: value })
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSingleSelectChange = (name, e) => {
        const {value} = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleMultiSelectChange = (name, selectedOption) => {
        const values = selectedOption
            ? selectedOption.map((option) => option.value)
            : []
        setSignupData({ ...signupData, [name]: values })
    }

    const handleSocialMediaChange = (e, idx) => {

    }

    const addSocialMedia = () => {
        const socialMediaCopy = [...signupData.socialMedia]
        socialMediaCopy.push("")
        setSignupData({...signupData, socialMedia: socialMediaCopy})
    }

    const deleteSocialMedia = (idx) => {
        
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        authServices
            .signupUser(signupData)
            .then(() => navigate("/login"))
            .catch((err) => console.log(err))
    }

    return (
        <Form className="form" onSubmit={handleFormSubmit}>
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
                    handleInputChange={handleInputChange}  
                    handleSingleSelectChange={handleSingleSelectChange}
                    handleMultiSelectChange={handleMultiSelectChange}
                    />
                </Tab>
            </Tabs>
            <Button onClick={handleFormSubmit}>Registrarme</Button>
        </Form>
    )
}

export default SignUpForm
