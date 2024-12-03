import React from 'react'
import { Button, Col, Container, Row } from "react-bootstrap"
import './Launchpage.css'
import { Link } from 'react-router-dom'

const Launchpage = () => {
    return (
        <Container className="page-container">
            <video className="launchpage-video" src="src/assets/2.mp4" autoPlay loop muted></video>
            <Row>
                <Col>
                    <h1 className="launchpage-text">Regístrate o inicia sesión para comenzar la experiencia.</h1>

                    <Container className="launchpage-buttons-container">
                        <Link to="/create-account"><Button className="primary-button">Regístrate</Button></Link>
                        <Link to="/login">
                            <Button className="primary-button">Inicia sesión</Button>
                        </Link>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Launchpage
