import React, { useContext, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './Launchpage.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'


const Launchpage = () => {
    const { loggedUser, isFetchingUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isFetchingUser && loggedUser) {
            navigate('/home')
        }
    }, [loggedUser, isFetchingUser, navigate])

    return (
        <div className="launch-page">
            <Container className="page-container">
                {/* TODO */}
                <video className="launchpage-video" src="src/assets/2.mp4" autoPlay loop muted></video>
                <Row className="h-100 align-items-center">
                    <Col>
                        <h1 className="launchpage-text">
                            Escucha a tus artistas preferidos y crea las mejores playlists de la comunidad.
                        </h1>

                        <Container className="launchpage-buttons-container">
                            <Link to="/signup">
                                <Button className="custom-primary-button">Regístrate</Button>
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
