import { Container } from "react-bootstrap"
import CreatePlaylistForm from "../../components/CreatePlaylistForm/CreatePlaylistForm"

const NewPlaylistPage = () => {

    return(
        <div className="NewPlaylistPage">
            <Container className="page-container">

                <h2>Nueva playlist</h2>

                <CreatePlaylistForm />

            </Container>
        </div>
    )
} 

export default NewPlaylistPage