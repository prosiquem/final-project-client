import { Form, Row, Col, FloatingLabel } from "react-bootstrap"

import { GENRES } from "../../consts/user.consts"

const UserSignUp = ({ signupData, handleInputChange, handleSingleSelectChange }) => {

    return (
        <div className="UserSignUp my-4">
            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="email"
                    label="Email"
                >
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="password"
                    label="Password"
                >
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={signupData.password}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="username"
                    label="Nombre de usuario"
                >
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={signupData.username}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>

            <Row className="g-3">
                <Col md={6}>
                    <Form.Group className="mb-3">
                            <Form.Control
                                type="date"
                                name="birth"
                                placeholder="Año de nacimiento"
                                value={signupData.birth}
                                onChange={handleInputChange} />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Select className="mb-3" onChange={(e) => handleSingleSelectChange('gender', e)}>
                        <option>Selecciona un género</option>
                        {GENRES.map((elm, idx) => {
                            return (
                                <option key={idx} value={elm.value}>{elm.label}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="avatar"
                    label="Imagen de perfil"
                >
                    <Form.Control
                        type="text"
                        name="avatar"
                        placeholder="Imagen de perfil"
                        value={signupData.avatar}
                        onChange={handleInputChange} />
                </FloatingLabel>
            </Form.Group>
        </div>
    )

}

export default UserSignUp