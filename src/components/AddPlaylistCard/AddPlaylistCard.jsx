import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './AddPlaylistCard.css'
import { Plus } from 'react-bootstrap-icons'

const AddPlaylistCard = () => {

    return (
        <article className="add-card mb-3">
            <Link className="link">
                <div className="add-card-container">
                    <Card className="add-card">

                        <Plus className="custom-add-card-plus" />

                    </Card>
                </div>
            </Link>
        </article>
    )
}

export default AddPlaylistCard