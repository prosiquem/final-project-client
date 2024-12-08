import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap"
import { GENRES, SOCIAL_MEDIA } from "../../consts/user.consts"

import Select from "react-select"
import makeAnimated from "react-select/animated"
import { MUSIC_GENRES } from "../../consts/music.consts"
import { XLg } from 'react-bootstrap-icons'


const ArtistSignUp = ({
    signupData,
    handleInputChange,
    handleSingleSelectChange,
    handleMultiSelectChange,

    handleSocialMediaChange,
    deleteSocialMedia,
    addSocialMedia,
    socialMediaData,
    handleSocialMediaSelectChange,

    handleSingleFileUpload,
    handleGalleryUpload
}) => {

    const animatedComponents = makeAnimated()

    return (
        <div className="ArtistSignUp my-4">

            <h3>Introduce los datos de usuario</h3>
            <hr />

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="email"
                    label="Email"
                >
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="password"
                    label="Password"
                >
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={signupData.password}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="username"
                    label="Nombre de usuario"
                >
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={signupData.username}
                        onChange={handleInputChange} />
                </FloatingLabel>
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
                    <Form.Select className="mb-3" onChange={(e) => handleSingleSelectChange('gender', e)}>
                        <option>Selecciona un género</option>
                        {GENRES.map((elm, idx) => {
                            return (
                                <option key={idx} value={elm.value}>{elm.label}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Control
                    type="file"
                    name="avatar"
                    placeholder="Imagen de perfil"
                    onChange={handleSingleFileUpload} />
            </Form.Group>

            <h5>Rellena tus datos de artista</h5>
            <hr />

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="artistName"
                    label="Tu nombre como artista"
                >
                    <Form.Control
                        type="text"
                        name="artistName"
                        placeholder="Nombre de artista"
                        value={signupData.artistName}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <Select
                    className="select-form"
                    classNamePrefix="select"
                    components={animatedComponents}
                    placeholder="Género musical"
                    name="musicGenres"
                    options={MUSIC_GENRES}
                    value={MUSIC_GENRES.filter(option => signupData.musicGenres.includes(option.value))}
                    onChange={(selectedOptions) => handleMultiSelectChange('musicGenres', selectedOptions)}
                    isMulti
                />
            </Form.Group>

            <h5>Galería de fotos</h5>
            <hr />

            <Form.Group className="mb-3">
                <Form.Control
                    type="file"
                    placeholder="Galería de fotos"
                    onChange={handleGalleryUpload}
                    id={`formGallery`}
                    multiple />

            </Form.Group>

            <h5>Indica tus redes sociales</h5>
            <hr />

            <Form.Group>
                {socialMediaData.map((elm, idx) => {
                    return (
                        <Row className="gap-2" key={`musicGenre-${idx}`}>
                            <Col md="3" className="p-0">
                                <Form.Select className="mb-3" onChange={(e) => handleSocialMediaSelectChange(idx, e)}>
                                    {SOCIAL_MEDIA.map((elm, idx) => {
                                        return (
                                            <option key={idx} value={[elm.value, elm.icon]}>{elm.label}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Col>
                            <Col className="p-0">
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="social-media-input"
                                        placeholder="URL"
                                        onChange={e => handleSocialMediaChange(e, idx)}
                                        value={elm.url}
                                        id={`formSocialMedia-${idx}`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="1" className="p-0">
                                <Button
                                    variant="custom-transparent"
                                    onClick={() => deleteSocialMedia(idx)}
                                    disabled={socialMediaData.length <= 1}
                                    size="sm">
                                    <XLg color="#a8a8a8" />
                                </Button>
                            </Col>
                        </Row>
                    )
                })
                }
                <Button
                    variant="custom-transparent"
                    onClick={addSocialMedia}
                    size="sm"
                    className="mt-2">
                    Añadir red social
                </Button>
            </Form.Group>

        </div>
    )
}

export default ArtistSignUp