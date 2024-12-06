import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { AuthContext } from "../../contexts/auth.context"
import playlistServices from "../../services/playlist.services"

import { Col, Container, Row, Button, Image, Table, Dropdown, Modal } from "react-bootstrap"
import { Clock, PlayFill, PlusCircle, PlusCircleFill, PlusLg, ThreeDotsVertical } from "react-bootstrap-icons"
import Loader from "../../components/Loader/Loader"
import TrackElement from "../../components/TrackElement/TrackElement"

import '../../general-css/DetailPage.css'
import TrackSearchBar from "../../components/TrackSearchBar/TrackSearchBar"
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader"
import DetailsControler from "../../components/DetailsControler/DetailsControler"
import { UserMessageContext } from "../../contexts/userMessage.context"

const PaylistDetailPage = () => {

    const { id: playlistId } = useParams()

    const [playlist, setPlaylist] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [addTrack, setAddTrack] = useState(false)
    const [searchResults, setSearchResults] = useState()

    const { loggedUser } = useContext(AuthContext)
    const { createAlert } = useContext(UserMessageContext)


    const navigate = useNavigate()

    useEffect(() => {
        fetchPlaylist()
    }, [])

    const fetchPlaylist = () => {
        playlistServices
            .fetchOnePlaylist(playlistId)
            .then(({ data }) => {
                setPlaylist(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const deletePlaylist = () => {

        playlistServices
            .deletePlaylist(playlistId)
            .then(() => {
                navigate('/home')
            })

    }

    const addToPlaylist = (trackId) => {

        const newTracksArr = [...playlist.tracks]
        newTracksArr.push(trackId)

        const updatedPlaylist = { ...playlist, tracks: newTracksArr }

        setPlaylist(updatedPlaylist)

        editPlaylist(updatedPlaylist)

    }

    const deleteFromPlaylist = (idx) => {

        const newTracksArr = [...playlist.tracks]
        newTracksArr.splice(idx, 1)

        const updatedPlaylist = { ...playlist, tracks: newTracksArr }

        setPlaylist(updatedPlaylist)

        editPlaylist(updatedPlaylist)


    }

    const editPlaylist = (data) => {

        playlistServices
            .editPlaylist(playlistId, data)
            .then(() => {
                createAlert(`${playlist.name} playlist editada`, false)
                fetchPlaylist()
            })
            .catch(err => console.log(err))

    }

    return (isLoading ? <Loader /> :
        <div className="PaylistDetailPage">
            <Container className="page-container gap-4">

                <DetailsHeader data={playlist} loggedUser={loggedUser} deleteElm={deletePlaylist} />

                <DetailsControler data={playlist} loggedUser={loggedUser} setAddTrack={setAddTrack} />

                <Row className="content h-100 w-100 p-3 align-items-center">
                    {playlist.tracks.length === 0 ?
                        <Col md={{ span: 4, offset: 4 }} className="text-center">

                            {playlist.owner._id === loggedUser._id ?
                                <p>Aun no tienes añadido ninguna canción. ¿Empezamos?</p> :
                                <p>{playlist.owner.username} aun no ha añadido ninguna canción</p>}

                            {playlist.owner._id === loggedUser._id &&
                                <Button variant="custom-primary" onClick={() => setAddTrack(true)}>Añadir canción</Button>}

                        </Col>
                        :

                        <Col md="12" className="p-0 h-100">
                            {playlist.description && playlist.description.length > 1 && <p>{playlist.description}</p>}
                            <Table >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de canción</th>
                                        <th>Artista</th>
                                        <th>Album</th>
                                        {/* <th><Clock /></th> */}
                                        {playlist.owner._id === loggedUser._id && <th>Eliminar</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {playlist.tracks.length > 0 &&
                                        playlist.tracks.map((elm, idx) => {
                                            return (
                                                <TrackElement
                                                    key={elm._id}
                                                    {...elm}
                                                    idx={idx}
                                                    isCreateElm={false}
                                                    addToPlaylist={addToPlaylist}
                                                    deleteFromPlaylist={deleteFromPlaylist}
                                                    user={loggedUser}
                                                    playlistOwner={playlist.owner}
                                                />
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                        </Col>
                    }

                </Row>

            </Container>

            <Modal
                show={addTrack}
                onHide={() => setAddTrack(false)}
                size="lg"
                centered
                className="h-60"
            >

                <Modal.Header closeButton />
                <Modal.Body>
                    <TrackSearchBar setSearchResults={setSearchResults} />
                    {searchResults &&
                        <Table>

                            <tbody>
                                {searchResults.map((elm, idx) => {

                                    return (
                                        <TrackElement
                                            key={elm._id}
                                            isCreateElm={true}
                                            idx={idx}
                                            {...elm}
                                            addToPlaylist={addToPlaylist}
                                            deleteFromPlaylist={deleteFromPlaylist}
                                        />
                                    )

                                })}
                            </tbody>

                        </Table>
                    }
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default PaylistDetailPage