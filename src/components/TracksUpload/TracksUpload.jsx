import { useContext, useEffect, useState } from "react"
import uploadServices from "../../services/upload.services"
import { Button, Form, Spinner } from "react-bootstrap"
import { Check } from "react-bootstrap-icons"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate, useParams } from "react-router-dom"
import tracksServices from "../../services/tracks.services"

const TracksUpload = () => {

    const { loggedUser } = useContext(AuthContext)
    const { _id: albumId } = useParams()

    const [loadingImage, setLoadingImage] = useState()
    const [audios, setAudios] = useState([])
    const [isExpanded, setIsExpanded] = useState(true)
    const [tracks, setTracks] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        trackCreation(audios)
    }, [audios])

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
                album: "675626eb7e9aa60f875c342c",
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

    return (

        <div className="TracksUpload">

            {!isExpanded &&
                <Button
                    variant="custom-secondary"
                    onClick={() => !loadingImage && navigate(`/album/675626eb7e9aa60f875c342c`)}
                    disabled={loadingImage}>
                    {loadingImage ?
                        <Spinner />
                        :
                        <><Check /><p>Terminar subida</p></>
                    }
                </Button>}

            {isExpanded &&
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tracks</Form.Label>
                        <Form.Control
                            type="file"
                            name="cover"
                            placeholder="Portada"
                            onChange={handleTracksUpload}
                            multiple />
                    </Form.Group>
                </Form>}



        </div>


    )

}

export default TracksUpload