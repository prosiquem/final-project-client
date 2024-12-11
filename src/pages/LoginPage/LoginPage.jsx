import LoginForm from "../../components/LoginForm/LoginForm"
import { Col, Container, Row } from 'react-bootstrap'
import './Loginpage.css'

const LoginPage = () => {

    return (
        <div className="login-page">
            <Container className="page-container">

                {/* <video className="login-video" src="src/assets/login.mp4" autoPlay loop muted></video> */}

                <Row className="h-100 w-100 align-items-center">
                    <Col md={{ span: "6", offset: "3" }}>
                        <LoginForm />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default LoginPage