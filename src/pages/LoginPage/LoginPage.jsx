import './Loginpage.css'
import LoginForm from "../../components/LoginForm/LoginForm"
import { Col, Container, Row } from 'react-bootstrap'

const LoginPage = () => {

    return (
        <div className="login-page">
            <Container className="page-container">

                <Row>
                    <Col>
                        <LoginForm />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default LoginPage