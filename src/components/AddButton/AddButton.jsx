import { Card, Container } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import './AddButton.css'
import { useNavigate } from 'react-router-dom'

const AddButton = ({ redirect }) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/${redirect}/new`)
    }

    return (
        <article className="add-card mb-3" onClick={handleNavigate}>

            <div className="add-card-container d-flex">
                <Card className="add-card">

                    <Plus className="custom-add-card-plus" />

                </Card>
            </div>

        </article >
    )
}

export default AddButton