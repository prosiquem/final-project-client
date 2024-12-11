import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap"
import { GENRES, SOCIAL_MEDIA } from "../../consts/user.consts"

import Select from "react-select"
import makeAnimated from "react-select/animated"
import { MUSIC_GENRES } from "../../consts/music.consts"
import { CalendarFill, XLg } from 'react-bootstrap-icons'

import './ArtistSignUp.css'


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
                    <Form.Group as={Row} className="align-items-center" >
                        <Col className="d-md-none" xs={{ span: 2 }}> <CalendarFill /></Col>
                        <Col className="text-start md-form-floating">
                            <Form.Label className="d-md-none">Año de nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth"
                                placeholder="Año de nacimiento"
                                className="h-100"
                                value={signupData.birth}
                                onChange={handleInputChange} />
                        </Col>
                    </Form.Group>
                </Col>

                <Col md={6} className="form-floating">
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

            <h5 className="pt-4">Rellena tus datos de artista</h5>
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

            <h5 className="pt-4">Galería de fotos</h5>
            <hr />

            <Form.Group className="mb-3">
                <Form.Control
                    type="file"
                    placeholder="Galería de fotos"
                    onChange={handleGalleryUpload}
                    id={`formGallery`}
                    multiple />

            </Form.Group>

            <h5 className="pt-4">Cuéntanos un poco más sobre ti</h5>
            <hr />

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="description"
                    label="Sobre ti"
                >
                    <Form.Control
                        as="textarea"
                        rows={6}
                        className="text-area"
                        type="text"
                        name="description"
                        placeholder="Sobre ti"
                        value={signupData.description}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <h5 className="pt-4">Indica tus redes sociales</h5>
            <hr />

            <Form.Group>
                {socialMediaData.map((elm, idx) => {
                    return (
                        <Row className=" w-100 gap-2 align-items-center " key={`musicGenre-${idx}`}>
                            <Col md={{ span: 3 }} className="p-0 form-floating">
                                <Form.Select onChange={(e) => handleSocialMediaSelectChange(idx, e)}>
                                    {SOCIAL_MEDIA.map((elm, idx) => {
                                        return (
                                            <option key={idx} value={[elm.value, elm.icon]}>{elm.label}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Col>
                            <Col className="p-0" md={{ span: 7 }} xs={{ span: 10 }}>
                                <Form.Group >
                                    <FloatingLabel
                                        controlId="url"
                                        label="Enlace"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="social-media-input"
                                            onChange={e => handleSocialMediaChange(e, idx)}
                                            value={elm.url}
                                            id={`formSocialMedia-${idx}`}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={{ span: 1 }} xs={{ span: 1 }} className="p-0">
                                <Button
                                    variant="custom-primary-sm"
                                    onClick={() => deleteSocialMedia(idx)}
                                    disabled={socialMediaData.length <= 1}
                                    size="sm">
                                    <XLg color="#a8a8a8" />
                                </Button>
                            </Col>
                            <hr className="my-3" />
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