import { Card, Container } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import './AddPlaylistButton.css'

const AddPlaylistButton = () => {

    return (
        <article className="add-card mb-3">

            <div className="add-card-container">
                <Card className="add-card">

                    <Plus className="custom-add-card-plus" />

                </Card>
            </div>

        </article >
    )
}

export default AddPlaylistButton