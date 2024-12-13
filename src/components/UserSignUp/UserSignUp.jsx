import { Form, Row, Col, FloatingLabel } from "react-bootstrap"

import { GENRES } from "../../consts/user.consts"
import { Calendar, CalendarFill } from "react-bootstrap-icons"

const UserSignUp = ({ signupData, handleInputChange, handleSingleSelectChange, handleSingleFileUpload }) => {


    return (
        <div className="UserSignUp my-4">
            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="email"
                    label="Email"
                >
                    <Form.Control
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={handleInputChange} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio.
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="password"
                    label="Password"
                >
                    <Form.Control
                        required
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={signupData.password}
                        onChange={handleInputChange} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio.
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="username"
                    label="Nombre de usuario"
                >
                    <Form.Control
                        required
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={signupData.username}
                        onChange={handleInputChange} />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio.
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>

            <Row className="g-3">
                <Col md={6}>
                    <Form.Group as={Row} className="align-items-center" >
                        <Col className="d-md-none" xs={{ span: 2 }}> <CalendarFill /></Col>
                        <Col className="text-start md-form-floating">
                            <Form.Label className="d-md-none">Año de nacimiento</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                name="birth"
                                placeholder="Año de nacimiento"
                                className="h-100"
                                value={signupData.birth}
                                onChange={handleInputChange} />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                </Col>

                <Col md={6} className="form-floating">
                    <Form.Select required className="mb-3" onChange={(e) => handleSingleSelectChange('gender', e)}>
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

                <Form.Control
                    type="file"
                    name="avatar"
                    placeholder="Imagen de perfil"
                    onChange={handleSingleFileUpload} />

            </Form.Group>
        </div>
    )

}

export default UserSignUp