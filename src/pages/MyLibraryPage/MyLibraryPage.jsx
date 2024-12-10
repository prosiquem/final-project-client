import { Container, Form } from "react-bootstrap"
import PlaylistServices from "../../services/playlist.services"
import { useEffect, useState, useContext, useRef } from "react"
import PlaylistList from "../../components/PlaylistList/PlaylistList"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"
import SpecificSearcher from "../../components/SpecificSearcher/SpecificSearcher"

const MyLibraryPage = () => {
    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const { loggedUser } = useContext(AuthContext)


    useEffect(() => {
        const fetchPlaylists = () => {
            PlaylistServices.fetchPlaylists()
                .then(({ data }) => {
                    const userPlaylists = data.filter(playlist => playlist.owner._id === loggedUser._id)
                    setPlaylists(userPlaylists)
                    setFilteredPlaylists(userPlaylists)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        fetchPlaylists()
    }, [loggedUser])



    return (
        <div className="my-library-page">
            <Container className="page-container">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Container fluid className="library-header d-flex justify-content-between">
                            <h2>Mi biblioteca</h2>
                            <SpecificSearcher playlists={playlists} setFilteredPlaylists={setFilteredPlaylists} />
                        </Container>

                        <Container className="library-playlists mt-5">
                            <PlaylistList playlists={filteredPlaylists} />
                        </Container>
                    </>
                )}
            </Container>
        </div>
    )
}

export default MyLibraryPage