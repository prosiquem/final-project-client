import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import tracksServices from "../../services/tracks.services"
import uploadServices from "../../services/upload.services"
import { AuthContext } from "../../contexts/auth.context"
import { TracksUploaderContext } from "../../contexts/tracksUploader.context"

import { Button, Form, Spinner } from "react-bootstrap"
import { Check, XLg } from "react-bootstrap-icons"

import './TracksUpload.css'

const TracksUpload = () => {

    const { loggedUser } = useContext(AuthContext)
    const { id: albumId } = useParams()

    const [loadingImage, setLoadingImage] = useState()
    const [audios, setAudios] = useState([])
    const [isExpanded, setIsExpanded] = useState(true)
    const [tracks, setTracks] = useState([])

    const { closeTrackUploader, showTrackUploader } = useContext(TracksUploaderContext)

    const navigate = useNavigate()

    const handleTracksUpload = (e) => {

        const formData = new FormData()

        Array.from(e.target.files).forEach((file) => {
            formData.append("tracksData", file)
        })

        setIsExpanded(false)
        setLoadingImage(true)

        uploadServices
            .uploadSongs(formData)
            .then(({ data }) => {

                const updatedAudios = [...audios]
                updatedAudios.push(...data)
                setAudios(updatedAudios)
                setLoadingImage(false)
                trackCreation(updatedAudios)

            })
            .catch(err => {
                setLoadingImage(false)
                console.log(err)
            })
    }

    const trackCreation = (audios) => {

        const tracksCopy = [...tracks]

        audios.forEach((elm, idx) => {
            tracksCopy.push({
                author: loggedUser._id,
                album: albumId,
                file: elm.path,
                title: elm.originalName,
                order: idx,
                type: "general",
                explicit: false,
                lyrics: "",
                colabArtists: []
            })
        })

        setTracks(tracksCopy)

        tracksServices
            .postTracks(tracksCopy)
    }

    return (showTrackUploader &&

        <div className="TracksUpload">

            {!isExpanded &&
                <Button
                    variant="custom-secondary"
                    onClick={() => {
                        navigate(`/album/${albumId}`)
                        setIsExpanded(true)
                        setLoadingImage()
                        closeTrackUploader()
                    }}
                    disabled={loadingImage}>
                    {loadingImage ?
                        <Spinner />
                        :
                        <><Check /><p>Ver tracks subidos</p></>
                    }
                </Button>}

            {isExpanded &&
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="py-2 d-flex justify-content-between align-items-center">
                            <label>Sube las canciones del album </label>
                            <Button variant="custom-transparent">
                                <XLg onClick={closeTrackUploader} />
                            </Button>
                        </Form.Label>
                        <Form.Control
                            type="file"
                            name="cover"
                            placeholder="Portada"
                            onChange={handleTracksUpload}
                            multiple
                            className="file-controler" />
                    </Form.Group>
                </Form>}

        </div>

    )

}

export default TracksUpload