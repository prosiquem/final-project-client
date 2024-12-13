import { Card } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import './AddButton.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'


const AddButton = () => {
    const navigate = useNavigate()
    const { loggedUser } = useContext(AuthContext)

    return (
        <article
            className="add-card mb-3"
            onClick={() =>
                loggedUser && loggedUser.role === "ARTIST"
                    ? navigate("/album/new")
                    : navigate("/playlist/new")
            }
        >
            <div className="add-card-container d-flex">
                <Card className="add-card">
                    <Plus className="custom-add-card-plus" />
                </Card>
            </div>
        </article>
    )
}

export default AddButton
