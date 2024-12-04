import React, { useContext } from 'react'
import { Button, Col, Container, Row } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import './Homepage.css'

const Homepage = () => {

    const { loggedUser } = useContext(AuthContext)

    return (
        <div className="home-page">

            <Container className="page-container">
                <Row>
                    <Col>
                        <Container className="homepage-greeting-container">
                            <h1>Hola, <span className="username">{loggedUser ? loggedUser.username : ''}</span></h1>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Homepage