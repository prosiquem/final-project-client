import { Col, Container, Dropdown, Row } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect, useState } from "react"
import userServices from "../../services/user.services"
import Loader from "../../components/Loader/Loader"

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
                        <Row className="ProfileHeader profile-info w-100 gap-4">
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

                        <Row>
                            <Col>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </div>
    )
}

export default ProfilePage