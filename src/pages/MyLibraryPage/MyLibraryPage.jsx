import { Container } from "react-bootstrap"
import PlaylistServices from "../../services/playlist.services"
import { useEffect, useState, useContext } from "react"
import PlaylistList from "../../components/PlaylistList/PlaylistList"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"

const MyLibraryPage = () => {

    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("")

    const { loggedUser } = useContext(AuthContext)

    const fetchPlaylists = () => {
        PlaylistServices
            .fetchPlaylists()
            .then(({ data }) => {
                const userPlaylists = data.filter(playlist => playlist.owner._id === loggedUser._id)
                setPlaylists(userPlaylists)
                setFilteredPlaylists(userPlaylists)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearch(value)
        const filtered = playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(value)
        )
        setFilteredPlaylists(filtered)
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

                            <input
                                type="text"
                                placeholder="Buscar en mi biblioteca..."
                                value={search}
                                onChange={handleSearch}
                                className="form-control my-3"
                            />
                        </Container>

                        <Container className="library-playlists mt-5">
                            <h2>Mi biblioteca</h2>
                            <PlaylistList playlists={filteredPlaylists} />
                        </Container>
                    </>
                )}
            </Container>
        </div>
    )
}

export default MyLibraryPage