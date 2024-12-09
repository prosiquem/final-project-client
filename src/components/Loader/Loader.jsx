import { Col, Row, Spinner } from "react-bootstrap"

const Loader = () => {

    return (

        <div className="Loader">

            <Row className="h-100 align-items-center">
                <Col>
                    <Spinner animation="grow" />
                </Col>
            </Row>
        </div >
    )
}

export default Loader