import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap"
import makeAnimated from "react-select/animated"
import Select from "react-select"

import { MUSIC_GENRES } from "../../consts/music.consts"
import { useContext, useEffect, useState } from "react"
import uploadServices from "../../services/upload.services"
import albumServices from "../../services/album.services"
import { AuthContext } from "../../contexts/auth.context"
import { UserMessageContext } from "../../contexts/userMessage.context"
import { useNavigate } from "react-router-dom"
import { CalendarFill } from "react-bootstrap-icons"


const CreateAlbumForm = () => {

    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)

    const [newAlbumData, setNewAlbumData] = useState({
        author: loggedUser._id,
        title: "",
        releaseDate: "",
        musicGenres: [""],
        cover: "",
        description: "",
        credits: {}
    })
    const [creditsData, setCreditsData] = useState({
        producers: "",
        colabArtists: [],
        recordLabel: ""
    })
    const [loadingImage, setLoadingImage] = useState(false)

    const animatedComponents = makeAnimated()
    const navigate = useNavigate()

    const handleInputChange = e => {

        const { name, value } = e.target
        setNewAlbumData({ ...newAlbumData, [name]: value })
    }

    const handleCreditsChange = e => {

        const { name, value } = e.target

        const copyCreditsData = { ...creditsData }
        copyCreditsData[name] = value

        setCreditsData({ ...creditsData, [name]: value })
        setNewAlbumData({ ...newAlbumData, credits: creditsData })

    }

    const handleMultiSelectChange = (name, selectedOption) => {
        const values = selectedOption
            ? selectedOption.map((option) => option.value)
            : []
        setNewAlbumData({ ...newAlbumData, [name]: values })
    }

    const handleSingleFileUpload = (e) => {

        const formData = new FormData()

        formData.append("imageData", e.target.files[0])

        setLoadingImage(true)

        uploadServices

            .uploadImage(formData)
            .then(({ data }) => {

                setNewAlbumData({ ...newAlbumData, cover: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                setLoadingImage(false)
                console.log(err)
            })
    }

    const handleFormSubmit = (e) => {

        e.preventDefault()

        setNewAlbumData({ ...newAlbumData, credits: creditsData })

        albumServices
            .postAlbum(newAlbumData)
            .then(({ data }) => {
                createAlert('Album creado', false)
                navigate(`/album/${data}`)
            })
            .catch((err) => console.log(err))

    }

    return (
        <Form className="CreateAlbumForm my-5" onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="title"
                    label="Nombre del album"
                >
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Nombre del album"
                        value={newAlbumData.title}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Col md={6}>
                <Form.Group as={Row} className="align-items-center" >
                    <Col className="d-md-none" xs={{ span: 2 }}> <CalendarFill /></Col>
                    <Col className="text-start md-form-floating">
                        <Form.Label className="d-md-none">Fecha de lanzamiento</Form.Label>
                        <Form.Control
                            type="date"
                            name="releaseDate"
                            placeholder="Fecha de lanzamiento"
                            className="h-100"
                            value={newAlbumData.releaseDate}
                            onChange={handleInputChange} />
                    </Col>
                </Form.Group>
            </Col>

            <Form.Group className="mb-3">
                <Select
                    className="select-form"
                    classNamePrefix="select"
                    components={animatedComponents}
                    placeholder="Género musical"
                    name="musicGenres"
                    options={MUSIC_GENRES}
                    value={MUSIC_GENRES.filter(option => newAlbumData.musicGenres.includes(option.value))}
                    onChange={(selectedOptions) => handleMultiSelectChange('musicGenres', selectedOptions)}
                    isMulti
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Portada</Form.Label>
                <Form.Control
                    type="file"
                    name="cover"
                    placeholder="Portada"
                    onChange={handleSingleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="description"
                    label="Descripción"
                >
                    <Form.Control
                        as="textarea"
                        rows={6}
                        type="text"
                        name="description"
                        className="text-area"
                        placeholder="Descripción"
                        value={newAlbumData.description}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <h3>Créditos</h3>
            <hr />

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="producers"
                    label="Productores"
                >
                    <Form.Control
                        type="text"
                        name="producers"
                        placeholder="Productores"
                        value={creditsData.producers}
                        onChange={handleCreditsChange} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="recordLabel"
                    label="Sello discográfico"
                >
                    <Form.Control
                        type="text"
                        name="recordLabel"
                        placeholder="Sello discográfico"
                        value={creditsData.recordLabel}
                        onChange={handleCreditsChange} />
                </FloatingLabel>
            </Form.Group>

            <Button
                onClick={handleFormSubmit}
                variant="custom-primary"
                disabled={loadingImage}>
                {loadingImage ? <Spinner animation="border" variant="primary" /> : "Crear album"}
            </Button>

        </Form>
    )
}

export default CreateAlbumForm