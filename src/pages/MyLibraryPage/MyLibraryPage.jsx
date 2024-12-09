import { Container } from "react-bootstrap"
import PlaylistServices from "../../services/playlist.services"
import { useEffect, useState, useContext } from "react"
import PlaylistList from "../../components/PlaylistList/PlaylistList"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"

const MyLibraryPage = () => {

    const [playlists, setPlaylists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { loggedUser } = useContext(AuthContext)

    const fetchPlaylists = () => {
        PlaylistServices
            .fetchPlaylists()
            .then(({ data }) => {
                const filteredPlaylists = data.filter(playlist => playlist.owner._id === loggedUser._id)
                setPlaylists(filteredPlaylists)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchPlaylists()
    }, [loggedUser])

    return (
        <div className="my-library-page">

            <Container className="page-container">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Container>
                            <h2>Mis Playlists</h2>
                        </Container>

                        <Container className="library-playlists">
                            <PlaylistList playlists={playlists} />
                        </Container>
                    </>
                )}
            </Container>
        </div>
    )
}

export default MyLibraryPage
