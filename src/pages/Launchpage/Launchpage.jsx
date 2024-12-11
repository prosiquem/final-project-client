import React, { useContext } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap"
import './LaunchPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Launchpage = () => {

    const { loggedUser } = useContext(AuthContext)

    const navigate = useNavigate()

    return (loggedUser ? navigate('/home') :
        <div className="launch-page">
            <Container className="page-container">
                {/* TODO */}
                <video className="launchpage-video" src="src/assets/2.mp4" autoPlay loop muted></video>
                <Row className="h-100 align-items-center">
                    <Col>
                        <h1 className="launchpage-text">
                            Escucha a tus artistas preferidos y crea las mejores playlists de la comunidad.
                        </h1>

                        <Row className="launchpage-buttons-container">
                            <Col lg={{ span: "2" }} md={{ span: "4" }} sm={{ span: "12" }}>
                                <Button as={Link} to="/signup" variant="custom-primary" className='w-100'>Regístrate</Button>
                            </Col>
                            <Col lg={{ span: "2" }} md={{ span: "4" }} sm={{ span: "12" }}>
                                <Button as={Link} to="/login" variant="custom-primary" className='w-100'>Inicia sesión</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Launchpage
