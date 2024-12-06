import { useContext } from "react"
import { Button, Toast } from "react-bootstrap"
import { UserMessageContext } from "../../contexts/userMessage.context"
import { Link } from "react-router-dom"

const UserMessage = () => {

    const { showMessage, setShowMessage, message, url } = useContext(UserMessageContext)

    return (
        <Toast
            show={showMessage}
            onClose={() => setShowMessage(false)}
            autohide
            delay={'3000'}
            className="d-flex flex-row-reverse w-auto"
        >

            <Toast.Header className="m-0" />

            <Toast.Body className="w-100">
                {message}
                {url && (
                    <Button
                        as={Link}
                        to={url}
                        variant="custom-transparent">
                        Ver detalles
                    </Button>
                )}
            </Toast.Body>

        </Toast>
    )

}

export default UserMessage