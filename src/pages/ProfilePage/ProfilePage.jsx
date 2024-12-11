import { Button, Col, Container, Dropdown, Form, Row, Table } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect, useState } from "react"
import UserServices from "../../services/user.services"
import Loader from "../../components/Loader/Loader"
import { formatDateInput } from "../../utils/date.utils"
import { CheckLg, ThreeDotsVertical, XLg } from "react-bootstrap-icons"
import { DEFAULT_IMAGES } from "../../consts/path.consts"

const ProfilePage = () => {

    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editForm, setEditForm] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [username, setUsername] = useState(user.username)
    const [birth, setBirth] = useState(user.birth)
    const [gender, setGender] = useState(user.gender)

    const { loggedUser } = useContext(AuthContext)

    const image = user.cover || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]

    useEffect(() => {
        const fetchUser = () => {
            UserServices.fetchUser(loggedUser._id)
                .then(({ data }) => {
                    console.log(data)
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        if (loggedUser) {
            fetchUser()
        }
    }, [loggedUser])

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const handleSaveChanges = () => {

        UserServices.editUser(loggedUser._id, editUser)
            .then(() => {

                setEditForm(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className="profile-page">
            <Container className="page-container">

                {isLoading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="cover-container">
                            <img className="cover-image" src={user.avatar} alt="Cover image" />
                        </div>

                        <Row className="ProfileHeader profile-info w-100 gap-4 mt-4">
                            <Col md="2">
                                <img src={user.avatar} className="profile-image" alt="Avatar" />
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

                            <Col lg="7" md="9" sm="12">

                                <Form as={Row} className="edit-info-container p-3">

                                    <Col>
                                        <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Email:
                                            </Form.Label>
                                            <Col >
                                                {!editForm ? <p>{user.email}</p> :
                                                    <Form.Control
                                                        type="text"
                                                        defaultValue={user.email}
                                                        onChange={(e) => handleChange(e, setEmail)}
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
                                                        onChange={(e) => handleChange(e, setUsername)} />
                                                }
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Nacimiento:
                                            </Form.Label>
                                            <Col >
                                                {!editForm ? <p>{formatDateInput(user.birth)}</p> :
                                                    <Form.Control
                                                        type="date"
                                                        defaultValue={formatDateInput(user.birth)}
                                                        onChange={(e) => handleChange(e, setBirth)} />
                                                }
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Género:
                                            </Form.Label>
                                            <Col >
                                                {!editForm ? <p>{user.gender}</p> :
                                                    <Form.Control
                                                        className="select-form"
                                                        defaultValue={user.gender}
                                                        onChange={(e) => handleChange(e, setGender)} />
                                                }
                                            </Col>
                                        </Form.Group>

                                    </Col>

                                    <Col lg="1" md="1" sm="1">
                                        <Dropdown align="end">
                                            <Dropdown.Toggle variant="custom-transparent">
                                                {editForm ? (
                                                    <>
                                                        <div className="d-flex flex-column align-items-center">
                                                            <XLg variant="custom-transparent" onClick={() => setEditForm(false)} />
                                                            <CheckLg className="mt-4" onClick={handleSaveChanges} />
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


                                </Form>

                            </Col>

                            <Col className="d-flex flex-column gap-3">
                                <Button variant="custom-secondary" className="w-100 h-50">Cambiar de rol</Button>
                                <Button variant="custom-secondary" className="w-100 h-50">Eliminar cuenta</Button>
                            </Col>

                        </Row>

                        <Row className="edit-info-container mt-3 p-3">
                            <Col className="mt-4 mb-4 h-100">
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