import { useContext, useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import tracksServices from "../../services/tracks.services"
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { TRACK_TYPE } from "../../consts/music.consts"
import { UserMessageContext } from "../../contexts/userMessage.context"

const EditTrackForm = ({ trackId, setEditTrackModal, fetchAlbum, albumId }) => {

    const [trackData, setTrackData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const { createAlert } = useContext(UserMessageContext)

    useEffect(() => {
        fetchTrack(trackId)
    }, [])

    const fetchTrack = (trackId) => {

        tracksServices
            .getTrack(trackId)
            .then(({ data }) => {
                setTrackData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }


    const handleSingleSelectChange = (name, e) => {
        const { value } = e.target
        setTrackData({ ...trackData, [name]: value })
    }

    const handleInputChange = (e) => {

        const { value, name, checked, type } = e.target
        const result = type === "checkbox" ? checked : value
        setTrackData({ ...trackData, [name]: result })

    }

    const handleFormSubmit = (e) => {

        e.preventDefault()

        tracksServices
            .editTrack(trackId, trackData)
            .then(() => {
                createAlert(`${trackData.title} editada`, false)
                setEditTrackModal(false)
                fetchAlbum(albumId)
            })

    }

    return (isLoading ? <Loader /> :

        <Form className="EditTrackForm" onSubmit={handleFormSubmit}>

            <audio src={trackData.file} />

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="name"
                    label="Título de la canción"
                >
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Título de la canción"
                        value={trackData.title}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="order"
                    label="Número de canción"
                >
                    <Form.Control
                        type="number"
                        name="order"
                        placeholder="Número de canción"
                        value={trackData.order}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Form.Select className="mb-3" onChange={(e) => handleSingleSelectChange('type', e)}>
                <option>Selecciona un tipo de canción</option>
                {TRACK_TYPE.map((elm, idx) => {
                    return (
                        <option key={idx} value={elm.value}>{elm.label}</option>
                    )
                })}
            </Form.Select>

            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    name="explicit"
                    label="Canción explícita"
                    checked={trackData.explicit}
                    onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="lyrics"
                    label="Letra"
                >
                    <Form.Control
                        as="textarea"
                        name="lyrics"
                        placeholder="Letra"
                        className="text-area"
                        rows={6}
                        value={trackData.lyrics}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Row>
                <Col md="7">
                    <Button
                        variant="custom-primary"
                        onClick={handleFormSubmit}>
                        Guardar cambios
                    </Button>
                </Col>
                <Col>
                    <Button
                        onClick={() => {
                            setEditTrackModal(false)
                        }}
                        variant="custom-secondary">
                        Cancelar
                    </Button>
                </Col>
            </Row>

        </Form>
    )

}

export default EditTrackForm