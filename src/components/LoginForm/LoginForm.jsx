import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Container } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import authServices from "../../services/auth.services"
import './LoginForm.css'

const LoginForm = () => {

    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)

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

        authServices
            .loginUser(loginData)
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                authenticateUser()
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    return (
        <Form className="form" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Control
                    type="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Control
                    type="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    name="password"
                    placeholder="Password" />
            </Form.Group>
            <Container className="submit-button-container">
                <Button className="custom-primary-button" type="submit">
                    Iniciar sesión
                </Button>
            </Container>
        </Form>
    )
}

export default LoginForm