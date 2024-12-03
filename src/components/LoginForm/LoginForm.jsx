import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Container } from "react-bootstrap"
import './LoginForm.css'

const LoginForm = () => {

    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
    }

    return (
        <Form className="form" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Control
                    type="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Control
                    type="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    name="password" />
            </Form.Group>
            <Container className="submit-button-container">
                <Button className="primary-button" type="submit">
                    Iniciar sesión
                </Button>
            </Container>
        </Form>
    )
}

export default LoginForm