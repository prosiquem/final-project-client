import { Col, Container, Image, Row, Spinner } from "react-bootstrap"

const Loader = () => {

    return (

        <div className="loader">
            <Container className="page-container d-flex align-items-center justify-content-center vh-100">
                <Row>
                    <Col>
                        <Spinner animation="grow" />
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Loader