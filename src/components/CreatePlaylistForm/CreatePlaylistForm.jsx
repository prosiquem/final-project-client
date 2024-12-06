import { useContext, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import playlistServices from "../../services/playlist.services"
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'

const CreatePlaylistForm = () => {

    const {loggedUser} = useContext(AuthContext)

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

    const handleFormSubmit = e => {

        e.preventDefault()

        playlistServices
            .postPlaylist(playlistData)
            .then(({data}) => {
                navigate(`/playlist/${data}`)})
            .catch((err) => console.log(err))
    }


return (
    <Form className="CreatePlaylistForm my-5" onSubmit={(e) => handleFormSubmit(e)}>

        <Form.Group className="mb-3">
            <FloatingLabel
                controlId="name"
                label="Nombre de la Playlist"
            >
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nombre de la Playlist"
                    value={playlistData.name}
                    onChange={handlePlaylistChange} />
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
            <FloatingLabel
                controlId="cover"
                label="Portada"
            >
                <Form.Control
                    type="text"
                    name="cover"
                    placeholder="Portada"
                    value={playlistData.cover}
                    onChange={handlePlaylistChange} />
            </FloatingLabel>
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
                type="checkbox"
                name="public"
                label="Es una lista pública"
                checked={playlistData.public}
                onChange={handlePlaylistChange} />
        </Form.Group>

        <Button
            variant="custom-primary"
            type="submit">
            Crear playlist
        </Button>

    </Form>
)

}

export default CreatePlaylistForm