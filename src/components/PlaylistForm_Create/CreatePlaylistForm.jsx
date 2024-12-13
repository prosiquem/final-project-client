import { useContext, useState } from "react"
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap"
import playlistServices from "../../services/playlist.services"
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'
import { UserMessageContext } from "../../contexts/userMessage.context"
import uploadServices from "../../services/upload.services"

const CreatePlaylistForm = () => {

    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)

    const [loadingImage, setLoadingImage] = useState(false)
    const [isValidated, setIsValidated] = useState(false)

    const navigate = useNavigate()

    const [playlistData, setPlaylistData] = useState({
        owner: loggedUser._id,
        name: "",
        public: true,
        tracks: [],
        cover: "",
        description: ""
    })

    const handlePlaylistChange = e => {

        const { value, name, checked, type } = e.target
        const result = type === "checkbox" ? checked : value
        setPlaylistData({ ...playlistData, [name]: result })

    }

    const handleFileUpload = (e) => {

        setLoadingImage(true)

        const formData = new FormData()

        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadImage(formData)
            .then(res => {
                setLoadingImage(false)
                setPlaylistData({ ...playlistData, cover: res.data.cloudinary_url })
            })
            .catch(err => {
                setLoadingImage(false)
                console.log(err)
            })

    }

    const handleFormSubmit = e => {

        e.preventDefault()
        const form = e.target

        if (form.checkValidity() === false) {
            e.stopPropagation()
            setIsValidated(true)
            createAlert(`Rellena todos los campos`, false)
            return
        }

        playlistServices
            .postPlaylist(playlistData)
            .then(({ data }) => {
                createAlert('Playlist creada', false)
                navigate(`/playlist/${data}`)
                setIsValidated(false)
            })
            .catch((err) => console.log(err))
    }


    return (
        <Form
            className="CreatePlaylistForm my-5"
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
            </Form.Group>

            <Button
                variant="custom-primary"
                type="submit">
                {loadingImage ? <Spinner animation="border" variant="primary" /> : "Crear playlist"}
            </Button>

        </Form>
    )

}

export default CreatePlaylistForm