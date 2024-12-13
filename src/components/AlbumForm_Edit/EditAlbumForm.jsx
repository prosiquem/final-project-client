import Select from "react-select"
import makeAnimated from "react-select/animated"

import { MUSIC_GENRES } from "../../consts/music.consts"

import { Badge, Button, Col, Row, FloatingLabel, Form, Image, Spinner } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import albumServices from "../../services/album.services"
import Loader from "../Loader/Loader"
import uploadServices from "../../services/upload.services"
import { formatDateInput } from "../../utils/date.utils"
import { UserMessageContext } from "../../contexts/userMessage.context"
import { CalendarFill } from "react-bootstrap-icons"

const EditAlbumForm = ({ albumId, setEditAlbumModal, fetchAlbumPage }) => {

    const animatedComponents = makeAnimated()

    const { createAlert } = useContext(UserMessageContext)

    const [loadingImage, setLoadingImage] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [albumData, setAlbumData] = useState()
    const [creditsData, setCreditsData] = useState()
    const [isValidated, setIsValidated] = useState(false)

    useEffect(() => {
        fetchAlbum()
    }, [])

    const fetchAlbum = () => {
        albumServices
            .fetchOneAlbum(albumId)
            .then(({ data }) => {
                setAlbumData(data)
                setCreditsData(data.credits)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {

        const { value, name } = e.target
        setAlbumData({ ...albumData, [name]: value })

    }

    const handleCreditsChange = (e) => {

        const { value, name } = e.target

        const copyCreditsData = { ...creditsData }
        copyCreditsData[name] = value

        setCreditsData({ ...creditsData, [name]: value })
        setAlbumData({ ...albumData, credits: copyCreditsData })


    }

    const handleMultiSelectChange = (name, selectedOption) => {
        const values = selectedOption
            ? selectedOption.map((option) => option.value)
            : []
        setAlbumData({ ...albumData, [name]: values })
    }

    const handleSingleFileUpload = (e) => {

        const formData = new FormData()

        formData.append("imageData", e.target.files[0])

        setLoadingImage(true)

        uploadServices

            .uploadImage(formData)
            .then(({ data }) => {

                setAlbumData({ ...albumData, cover: data.cloudinary_url })
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

        if (form.checkValidity() === false) {
            e.stopPropagation()
            setIsValidated(true)
            createAlert(`Rellena todos los campos`, false)
            return
        }

        albumServices
            .editAlbum(albumId, albumData)
            .then(() => {
                createAlert(`${albumData.title} editado`, false)
                setIsValidated(false)
                setEditAlbumModal(false)
                fetchAlbumPage(albumId)
            })

    }

    return (isLoading ? <Loader /> :
        <Form
            className="CreateAlbumForm my-2"
            onSubmit={handleFormSubmit}
            noValidate
            validated={isValidated}>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="title"
                    label="Nombre del album"
                >
                    <Form.Control
                        required
                        type="text"
                        name="title"
                        placeholder="Nombre del album"
                        value={albumData.title}
                        onChange={handleInputChange} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio.
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>

            <Col>
                <Form.Group as={Row} className="align-items-center mb-3" >
                    <Col className="d-md-none" xs={{ span: 2 }}> <CalendarFill /></Col>
                    <Col className="text-start md-form-floating">
                        <Form.Label className="d-md-none">Fecha de lanzamiento</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            name="releaseDate"
                            placeholder="Fecha de lanzamiento"
                            className="h-100"
                            value={formatDateInput(albumData.releaseDate)}
                            onChange={handleInputChange} />
                    </Col>
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio.
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>

            <Form.Group className="mb-3">
                <Select
                    required
                    className="select-form"
                    classNamePrefix="select"
                    components={animatedComponents}
                    placeholder="Género musical"
                    name="musicGenres"
                    options={MUSIC_GENRES}
                    value={MUSIC_GENRES.filter(option => albumData.musicGenres.includes(option.value))}
                    onChange={(selectedOptions) => handleMultiSelectChange('musicGenres', selectedOptions)}
                    isMulti
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {albumData.cover && <Image src={albumData.cover} height={'100px'} rounded className="mb-3" />}
                <br />
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
                        value={albumData.description}
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
                variant="custom-primary"
                disabled={loadingImage}
                type="submit"
            >
                {loadingImage ? <Spinner animation="border" variant="primary" /> : "Guardar cambios"}
            </Button>

        </Form>
    )

}

export default EditAlbumForm