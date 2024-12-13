import { useContext, useEffect, useState } from "react"

import playlistServices from "../../services/playlist.services"
import { UserMessageContext } from "../../contexts/userMessage.context"

import Loader from "../../components/Loader/Loader"
import { Button, FloatingLabel, Form, Image, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import uploadServices from "../../services/upload.services"

const EditPlaylistForm = ({ playlistId, setEditPlaylistModal, fetchPlaylistPage }) => {

    const { createAlert } = useContext(UserMessageContext)

    const [playlistData, setPlaylistData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [loadingImage, setLoadingImage] = useState(false)
    const [isValidated, setIsValidated] = useState(false)


    useEffect(() => {

        fetchPlaylist()

    }, [])

    const fetchPlaylist = () => {

        playlistServices
            .fetchOnePlaylist(playlistId)
            .then(({ data }) => {
                setPlaylistData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }

    const handlePlaylistChange = (e) => {

        const { value, name, checked, type } = e.target
        const result = type === "checkbox" ? checked : value
        setPlaylistData({ ...playlistData, [name]: result })

    }

    const handleFileUpload = (e) => {

        setLoadingImage(true)

        const fomrData = new FormData()

        fomrData.append('imageData', e.target.files[0])

        uploadServices
            .uploadImage(fomrData)
            .then(res => {
                setLoadingImage(false)
                setPlaylistData({ ...playlistData, cover: res.data.cloudinary_url })
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

        playlistServices
            .editPlaylist(playlistId, playlistData)
            .then(() => {
                createAlert(`${playlistData.name} playlist editada`, false)
                setEditPlaylistModal(false)
                setIsValidated(false)
                setEditPlaylistModal(false)
                fetchPlaylistPage()
            })

    }

    return (isLoading ? <Loader /> :

        <div className="EditPlaylistForm my-4">

            <Form
                onSubmit={(e) => handleFormSubmit(e)}
                noValidate
                validated={isValidated}>

                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="name"
                        label="Nombre de la Playlist"
                    >
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            placeholder="Nombre de la Playlist"
                            value={playlistData.name}
                            onChange={handlePlaylistChange} />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    {playlistData.cover && <Image src={playlistData.cover} height={'100px'} rounded className="mb-3" />}
                    <Form.Control
                        type="file"
                        name="cover"
                        onChange={handleFileUpload} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="description"
                        label="Descripción"
                    >
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Descripción"
                            className="text-area"
                            rows={6}
                            value={playlistData.description}
                            onChange={handlePlaylistChange} />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        type="checkbox"
                        name="public"
                        label="Es una lista pública"
                        checked={playlistData.public}
                        onChange={handlePlaylistChange} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button
                    variant="custom-primary"
                    type="submit">
                    {loadingImage ? <Spinner animation="border" variant="primary" /> : "Guardar cambios"}
                </Button>

            </Form>

        </div>
    )

}

export default EditPlaylistForm