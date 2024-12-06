import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Plus } from 'react-bootstrap-icons'
import './AddPlaylistCard.css'

const AddPlaylistCard = () => {

    return (
        <Container className="add-card mb-3">
            <Link className="link">
                <div className="add-card-container">
                    <Card className="add-card">

                        <Plus className="custom-add-card-plus" />

                    </Card>
                </div>
            </Link>
        </Container>
    )
}

export default AddPlaylistCard