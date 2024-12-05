import { useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap"

const CreatePlaylistForm = () => {

    const [playlistData, setPlaylistData] = useState ({
        owner: "",
        name: "",
        public: true,
        tracks: [],
        cover: "",
        description: ""
    })



    return (
        <Form className="CreatePlaylistForm">

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="name"
                    label="Nombre de la Playlist"
                >
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Nombre de la Playlist"
                        value={"s"}
                        onChange={"s"} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        name="public"
                        label="Es una lista pública"
                        value={"s"}
                        onChange={"s"} />
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
                        value={"s"}
                        onChange={"s"} />
                </FloatingLabel>
            </Form.Group>


            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="description"
                    label="Descripción"
                >
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={"s"}
                        onChange={"s"} />
                </FloatingLabel>
            </Form.Group>

        </Form>
    )

}

export default CreatePlaylistForm