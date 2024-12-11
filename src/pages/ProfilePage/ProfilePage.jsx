import { Button, Col, Container, Dropdown, Form, Image, Row, Table } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import { formatDateInput } from "../../utils/date.utils"
import { CalendarFill, CheckLg, ThreeDotsVertical, XLg } from "react-bootstrap-icons"
import { DEFAULT_IMAGES } from "../../consts/path.consts"
import userServices from "../../services/user.services"
import { MUSIC_GENRES } from "../../consts/music.consts"
import { GENRES } from "../../consts/user.consts"

const ProfilePage = () => {

    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editForm, setEditForm] = useState(false)

    const { loggedUser } = useContext(AuthContext)

    const image = user.cover || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]

    useEffect(() => {

        fetchUser()

    }, [])

    const userGenre = GENRES.find(elm => elm.value === user.gender)

    const fetchUser = () => {
        userServices
            .fetchUser(loggedUser._id)
            .then(({ data }) => {
                setUser(data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {

        const { value, name } = e.target
        setUser({ ...user, [name]: value })

    }

    const handleSingleSelectChange = (name, e) => {
        const { value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSaveChanges = () => {

        userServices
            .editUser(loggedUser._id, user)
            .then(() => {

                setEditForm(false)
                fetchUser()

            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className="profile-page">
            <Container className="page-container p-4">

                {isLoading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="cover-container">
                            <img className="cover-image" src={user.avatar} alt="Cover image" />
                        </div>

                        <Row className="ProfileHeader profile-info w-100 gap-md-4 mt-4">
                            <Col md="2" xs="4">
                                <Image src={user.avatar} className="profile-image" alt="Avatar" />
                            </Col>
                            <Col className="p-0 column-between">
                                <Row className="details-info-header">
                                    <Col md="10">
                                        <label>Mi perfil</label>
                                    </Col>
                                </Row>

                                <Row className="details-info-description align-items-end">
                                    <Col>
                                        <h1>{user.username}</h1>
                                        <h5>{user.playlists.length === 1 ? "playlist creada" : `${user.playlists.length} playlists creadas`}</h5>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="profile-body pt-4 mt-5">

                            <Col lg="7" md="9" sm="12" >

                                <Form as={Row} className="edit-info-container p-3">

                                    <Col xs="10">
                                        <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Email:
                                            </Form.Label>
                                            <Col >
                                                {!editForm ? <p>{user.email}</p> :
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={user.email}
                                                        onChange={handleChange}
                                                    />
                                                }
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Username:
                                            </Form.Label>
                                            <Col>
                                                {!editForm ? <p>{user.username}</p> :
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={user.username}
                                                        onChange={handleChange} />
                                                }
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Nacimiento:
                                            </Form.Label>
                                            <Col >
                                                {!editForm ? <p>{formatDateInput(user.birth)}</p> :
                                                    <Form.Group as={Row} className="align-items-center" >
                                                        <Col className="d-md-none" xs={{ span: 2 }}> <CalendarFill /></Col>
                                                        <Col className="text-start md-form-floating">
                                                            <Form.Label className="d-md-none">Año de nacimiento</Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="birth"
                                                                placeholder="Año de nacimiento"
                                                                className="h-100"
                                                                defaultValue={formatDateInput(user.birth)}
                                                                onChange={handleChange} />
                                                        </Col>
                                                    </Form.Group>
                                                }
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Género:
                                            </Form.Label>
                                            <Col >
                                                {!editForm ? <p>{userGenre.label}</p> :

                                                    <Form.Select className="mb-3" onChange={(e) => handleSingleSelectChange('gender', e)}>
                                                        <option>Selecciona un género</option>
                                                        {GENRES.map((elm, idx) => {
                                                            return (
                                                                <option key={idx} value={elm.value}>{elm.label}</option>
                                                            )
                                                        })}
                                                    </Form.Select>

                                                }
                                            </Col>
                                        </Form.Group>

                                    </Col>

                                    <Col lg="1" md="1" xs="1">
                                        <Dropdown align="end">
                                            <Dropdown.Toggle variant="custom-transparent">
                                                {editForm ? (
                                                    <>
                                                        <div className="d-flex flex-column align-items-center">
                                                            <XLg variant="custom-transparent" onClick={() => setEditForm(false)} />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <ThreeDotsVertical />
                                                )}
                                            </Dropdown.Toggle>

                                            {!editForm && (
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setEditForm(true)}>Editar datos</Dropdown.Item>
                                                </Dropdown.Menu>
                                            )}
                                        </Dropdown>
                                    </Col>

                                    {editForm &&
                                        <Row>
                                            <Col className="text-center">
                                                <Button variant="custom-primary" onClick={handleSaveChanges}>
                                                    Guardar cambios
                                                </Button>
                                            </Col>
                                        </Row>
                                    }


                                </Form>

                            </Col>

                            <Col className="d-flex flex-column gap-3 my-4 my-sm-0">
                                <Button variant="custom-secondary" className="w-100 h-50">Cambiar de rol</Button>
                                <Button variant="custom-secondary" className="w-100 h-50">Eliminar cuenta</Button>
                            </Col>

                        </Row>

                        <Row className="edit-info-container mt-3 p-3">
                            <Col className="h-100">
                                <h2>Mis playlists activas</h2>

                                <Table variant="custom-dark" className="mt-5">
                                    <thead>
                                        <tr>
                                            <th >Cover</th>
                                            <th >Nombre</th>
                                            <th >Nº de pistas</th>
                                            <th >Pública</th>
                                            <th >Creación</th>
                                            <th>Última modificación</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {user.playlists.length > 0 ? (
                                            user.playlists.map((playlist) => (
                                                <tr key={playlist._id}>
                                                    <td >
                                                        <img
                                                            src={playlist.cover ? playlist.cover : image}
                                                            alt={playlist.name}
                                                            style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                                                        />
                                                    </td>
                                                    <td>{playlist.name}</td>
                                                    <td>{playlist.tracks.length}</td>
                                                    <td>{playlist.public ? "Sí" : "No"}</td>
                                                    <td>{formatDateInput(playlist.createdAt)}</td>
                                                    <td>{formatDateInput(playlist.updatedAt)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center">No tienes playlists activas</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </Table>
                            </Col>
                        </Row>

                    </>
                )
                }
            </Container >
        </div >
    )
}

export default ProfilePage