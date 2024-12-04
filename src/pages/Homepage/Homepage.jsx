import React from 'react'
import { Button, Col, Container, Row } from "react-bootstrap"
import './Homepage.css'
import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
        <div className="home-page">
            <Container className="page-container">

                <Row>
                    <Col>
                        <Container className="launchpage-buttons-container">
                            <h1>hola</h1>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Homepage