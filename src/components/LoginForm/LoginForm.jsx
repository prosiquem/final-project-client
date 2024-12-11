import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Form, Container, FloatingLabel } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import authServices from "../../services/auth.services"

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
            })
            .then(() => {
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    return (

        <Container className="login-form text-center">
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <FloatingLabel
                        controlId="email"
                        label="Email">
                        <Form.Control
                            type="email"
                            value={loginData.email}
                            onChange={handleInputChange}
                            name="email"
                            placeholder="Email" />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <FloatingLabel
                        controlId="password"
                        label="Contraseña">
                        <Form.Control
                            type="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                            name="password"
                            placeholder="Password" />
                    </FloatingLabel>
                </Form.Group>

                <Button className="custom-primary-button" type="submit">
                    Iniciar sesión
                </Button>


                <Container className="my-4 d-flex justify-content-center signup-message">
                    <p>¿No tienes cuenta? <Link to="/signup" className="text-link">Regístrate</Link></p>
                </Container>
            </Form>
        </Container>
    )
}

export default LoginForm