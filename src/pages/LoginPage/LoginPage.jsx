import LoginForm from "../../components/LoginForm/LoginForm"
import { Col, Container, Image, Row } from 'react-bootstrap'
import { ISOLOGO } from "../../consts/path.consts"

const LoginPage = () => {

    return (
        <div className="login-page">
            <Container className="page-container text-center align-content-center">

                <Image src={ISOLOGO} width={"50px"} className="d-sm-none py-4" />

                <Row className="mb-3">
                    <Col>
                        <h1 className="center">¡Bienvenido!</h1>
                        <p>Disfruta de la música sin límites, crea las mejores playlist y sube tu propia música</p>
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col md={{ span: "6", offset: "3" }}>
                        <LoginForm />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default LoginPage