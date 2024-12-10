import { Button, Card, Col, Container, Dropdown, Form, Row } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect, useState } from "react"
import userServices from "../../services/user.services"
import Loader from "../../components/Loader/Loader"
import { formatDateInput } from "../../utils/date.utils"
import { ThreeDotsVertical } from "react-bootstrap-icons"

const ProfilePage = () => {

    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchUser = () => {
            userServices.fetchUser(loggedUser._id)
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


    return (
        <div className="profile-page">
            <Container className="page-container">

                {isLoading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <Row className="ProfileHeader profile-info w-100 gap-4 mb-5">
                            <Col md="2" className="p-0">
                                <img src={user.avatar} className="profile-image" alt="Avatar" />
                            </Col>
                            <Col className="p-0 column-between">
                                <Row className="details-info-header">
                                    <Col md="10">
                                        <h2>Mi perfil</h2>
                                    </Col>
                                </Row>

                                <Row className="details-info-description align-items-end">
                                    <Col>
                                        <h1>{user.username}</h1>
                                        <h5>{user.playlists.length === 1 ? "Lista creada" : `${user.playlists.length} listas creadas`}</h5>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="profile-body mt-5">

                            <Col>

                                <Form as={Row} className="edit-info-container">

                                    <Col>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                Email:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={user.email} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                Username:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={user.username} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                Fecha de nacimiento:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={formatDateInput(user.birth)} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                Género:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={user.gender} />
                                            </Col>
                                        </Form.Group>

                                    </Col>

                                    <Col>
                                        <Dropdown
                                            align="end">

                                            <Dropdown.Toggle variant="custom-transparent">
                                                <ThreeDotsVertical />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>Editar datos</Dropdown.Item>
                                            </Dropdown.Menu>

                                        </Dropdown>
                                    </Col>
                                </Form>

                            </Col>

                            <Col>
                                <Button className="w-100"></Button>
                                <Button className="w-100"></Button>
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