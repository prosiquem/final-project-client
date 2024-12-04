import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth.services"
import './SignUpForm.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const SignUpForm = () => {

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        username: '',
        birth: '',
        gender: '',
        role: '',
        avatar: '',
        musicGenres: [],
        artistGallery: '',
        socialMedia: [],
        relatedArtists: [],
        artistName: ''
    })

    const [isArtist, setIsArtist] = useState(false)

    const handleRoleChange = (role) => {
        setIsArtist(role === 'artist')
        setSignupData(prevData => ({ ...prevData, role }))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSelectChange = (name, selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map(option => option.value) : []
        setSignupData({ ...signupData, [name]: values })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        authServices
            .signupUser(signupData)
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    }

    const animatedComponents = makeAnimated()

    const gender = [
        { value: 'Woman', label: 'Woman' },
        { value: 'Man', label: 'Man' },
        { value: 'Non binary', label: 'Non binary' }
    ]

    const musicGenres = [
        { value: 'Pop', label: 'Pop' },
        { value: 'Rock', label: 'Rock' },
        { value: 'Blues', label: 'Blues' }
    ]

    const socialMedia = [
        { value: 'YouTube', label: 'YouTube' },
        { value: 'Instagram', label: 'Instagram' },
        { value: 'X', label: 'X' },
        { value: 'TikTok', label: 'TikTok' }
    ]

    return (

        <Form className="form" onSubmit={handleFormSubmit}>
            <Container className="role-button-container">
                <Button
                    className="custom-focus-button"
                    onClick={() => handleRoleChange('user')}>
                    Usuario
                </Button>
                <Button
                    className="custom-focus-button"
                    onClick={() => handleRoleChange('artist')}>
                    Artista
                </Button>
            </Container>

            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={signupData.password}
                    onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={signupData.username}
                    onChange={handleInputChange} />
            </Form.Group>

            <Row className="g-3">
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="date"
                            name="birth"
                            placeholder="Año de nacimiento"
                            value={signupData.birth}
                            onChange={handleInputChange} />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Select
                            className="select-form"
                            classNamePrefix="select"
                            placeholder="Género"
                            name="gender"
                            options={gender}
                            value={gender.find(option => option.value === signupData.gender)}
                            onChange={(selectedOption) => handleSelectChange('gender', selectedOption ? [selectedOption] : [])}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    name="avatar"
                    placeholder="Imagen de perfil"
                    value={signupData.avatar}
                    onChange={handleInputChange} />
            </Form.Group>

            {isArtist && (
                <>
                    <Form.Group className="mb-3">
                        <Select
                            className="select-form"
                            classNamePrefix="select"
                            components={animatedComponents}
                            placeholder="Género musical"
                            name="musicGenres"
                            options={musicGenres}
                            value={musicGenres.filter(option => signupData.musicGenres.includes(option.value))}
                            onChange={(selectedOptions) => handleSelectChange('musicGenres', selectedOptions)}
                            isMulti
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Select
                            className="select-form"
                            classNamePrefix="select"
                            components={animatedComponents}
                            placeholder="Redes sociales"
                            name="socialMedia"
                            options={socialMedia}
                            value={socialMedia.filter(option => signupData.socialMedia.includes(option.value))}
                            onChange={(selectedOptions) => handleSelectChange('socialMedia', selectedOptions)}
                            isMulti
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            name="artistGallery"
                            placeholder="Galería de fotos"
                            value={signupData.artistGallery}
                            onChange={handleInputChange} />
                    </Form.Group>
                </>
            )}

            <Container className="submit-button-container">
                <Button className="custom-primary-button" type="submit">
                    Registrarse
                </Button>
            </Container>
        </Form>
    )
}

export default SignUpForm
