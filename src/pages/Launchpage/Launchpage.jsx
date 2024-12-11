import React, { useContext } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import './LaunchPage.css'

const Launchpage = () => {

    const { loggedUser } = useContext(AuthContext)

    const navigate = useNavigate()

    return (loggedUser ? navigate('/home') :
        <div className="launch-page">
            <Container className="page-container h-100 d-flex flex-column justify-content-center align-items-center">
                {/* TODO */}
                <video className="launchpage-video" src="src/assets/2.mp4" autoPlay loop muted></video>

                <Row className="text-center">
                    <Col>
                        <h1 className="launchpage-text">
                            Escucha a tus artistas preferidos y crea las mejores playlists de la comunidad.
                        </h1>

                        <Container className="launchpage-buttons-container mt-4">
                            <Link to="/signup">
                                <Button className="custom-primary-button me-4">Regístrate</Button>
                            </Link>
                            <Link to="/login">
                                <Button className="custom-primary-button">Inicia sesión</Button>
                            </Link>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Launchpage
