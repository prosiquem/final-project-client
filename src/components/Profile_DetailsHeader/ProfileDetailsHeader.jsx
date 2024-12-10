import { Col, Row } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useState } from "react"

const ProfileDetailsHeader = () => {

    const [user, setUser] = useState([])

    const { loggedUser } = useContext(AuthContext)

    return (
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
    )

}

export default ProfileDetailsHeader