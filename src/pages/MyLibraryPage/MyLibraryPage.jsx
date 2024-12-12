import { Container, Form } from "react-bootstrap"
import PlaylistServices from "../../services/playlist.services"
import { useEffect, useState, useContext, useRef } from "react"
import PlaylistList from "../../components/PlaylistList/PlaylistList"
import AlbumServices from "../../services/album.services"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"
import SpecificSearcher from "../../components/SpecificSearcher/SpecificSearcher"
import AlbumList from "../../components/AlbumList/AlbumList"


const MyLibraryPage = () => {

    const [artistAlbum, setArtistAlbum] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        if (loggedUser) {
            fetchLibraryData()
        }
    }, [loggedUser])

    const fetchLibraryData = () => {
        const libraryData = [
            AlbumServices.fetchArtistAlbum(loggedUser._id),
            PlaylistServices.fetchUserPlaylists(loggedUser._id)
        ]

        setIsLoading(true)

        Promise.all(libraryData)
            .then(([artistAlbumResponse, playlistsResponse]) => {
                setArtistAlbum(artistAlbumResponse.data)
                setPlaylists(playlistsResponse.data.playlists)
                setFilteredPlaylists(playlistsResponse.data.playlists)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div className="my-library-page">
            <Container className="page-container">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Container className="searcher-container d-flex justify-content-end">
                            <SpecificSearcher
                                playlists={playlists}
                                setFilteredResults={(results) => setFilteredPlaylists(results.playlists)}
                                filterBy={["playlists"]}
                            />
                        </Container>

                        {loggedUser.role === "ARTIST" && (
                            <Container className="library-albums">
                                <h2>Mi discografía</h2>
                                <AlbumList albums={artistAlbum} />
                            </Container>
                        )}

                        <Container className="library-playlists">
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