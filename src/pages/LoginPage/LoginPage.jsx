import './Loginpage.css'
import LoginForm from "../../components/LoginForm/LoginForm"
import { Col, Container, Row } from 'react-bootstrap'

const LoginPage = () => {

    return (
        <Container className="page-container">

            <video className="launchpage-video" src="src/assets/2.mp4" autoPlay loop muted></video>

            <Row>
                <Col>
                    <LoginForm />
                </Col>
            </Row>

        </Container>

    )
}

export default LoginPage