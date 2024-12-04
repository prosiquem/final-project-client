import { Col, Container, Row } from "react-bootstrap"
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import './SignUpPage.css'

const CreateAccountPage = () => {
    return (
        <div className="signup-page">
            <Container className="page-container">
                {/* <video className="signup-video" src="src/assets/login.mp4" autoPlay loop muted></video> */}
                <Row className="w-100 h-100">
                    <Col>
                    </Col>
                    <Col>
                        <SignUpForm />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default CreateAccountPage