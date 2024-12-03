import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"

const CreateAccountForm = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')

    const handleUsernameChange = e => {
        const { value } = e.target
        setUsername(value)
    }

    const handleEmailChange = e => {
        const { value } = e.target
        setEmail(value)
    }

    const handlePasswordChange = e => {
        const { value } = e.target
        setPassword(value)
    }

    const handleAgeChange = e => {
        const { value } = e.target
        setAge(value)
    }

    const handleGenderChange = e => {
        const { value } = e.target
        setGender(value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
    }

    return (
        <Form className="form" onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Nombre de usuario"
                    onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    onChange={handlePasswordChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="number"
                    placeholder="Edad"
                    onChange={handleAgeChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Select
                    onChange={handleGenderChange}
                    defaultValue=""
                    className="rounded-select">

                    <option value="" disabled>Género</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Non binary">Non binary</option>
                </Form.Select>
            </Form.Group>

            <Container className="submit-button-container">
                <Button className="primary-button" type="submit">
                    Registrarse
                </Button>
            </Container>
        </Form>
    )
}

export default CreateAccountForm
