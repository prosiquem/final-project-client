import React, { useContext } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import './LaunchPage.css'

const Launchpage = () => {

    const { loggedUser } = useContext(AuthContext)

    const navigate = useNavigate()

    return (loggedUser ? navigate('/home') :
        <div className="Launchpage">
            <Container className="page-container">
                {/* TODO */}
                <video className="launchpage-video" src="src/assets/2.mp4" autoPlay loop muted></video>

                <Row className="h-100 p-md-4 align-items-center">
                    <Col className='text-center p-0'>
                        <h1 className="launchpage-text mb-5">
                            Escucha a tus artistas preferidos y crea las mejores playlists de la comunidad.
                        </h1>

                        <Row className='gap-3 justify-content-center'>
                            <Col lg={{ span: "2" }} md={{ span: "4" }} xs={{ span: "10" }} >
                                <Button as={Link} to="/signup" variant="custom-primary" className='w-100'>Regístrate</Button>
                            </Col>
                            <Col lg={{ span: "2" }} md={{ span: "6" }} xs={{ span: "10" }}>
                                <Button as={Link} to="/login" variant="custom-secondary" className='w-100'>Inicia sesión</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Launchpage
