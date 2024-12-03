import { Col, Container, Row } from "react-bootstrap"
import CreateAccountForm from "../../components/CreateAccountForm/CreateAccountForm"

const CreateAccountPage = () => {
    return (
        <Container className="page-container">

            <video className="launchpage-video" src="src/assets/2.mp4" autoPlay loop muted></video>

            <Row>
                <Col>
                    <CreateAccountForm />
                </Col>
            </Row>

        </Container>
    )
}

export default CreateAccountPage