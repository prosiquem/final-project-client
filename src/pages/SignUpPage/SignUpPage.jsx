import { Col, Container, Image, Row } from "react-bootstrap"
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import { ISOLOGO } from "../../consts/path.consts"

const SignUpPage = () => {
    return (
        <div className="SignUpPage">
            <Container className="page-container text-center align-content-center">

                <Image src={ISOLOGO} width={"150px"} className="d-sm-none" />

                <Row className="h-100 justify-content-center">
                    <Col md={{ span: 8 }} lg={{ span: 6 }} >
                        <SignUpForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignUpPage