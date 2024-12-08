import { Col, Container, Row, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import ExploreList from "../../components/ExploreList/ExploreList"
import ExploreServices from "../../services/explore.services"

const ExplorePage = () => {
    const [explore, setExplore] = useState({
        artists: [],
        playlists: [],
        albums: []
    })
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState("all")

    const fetchExplore = () => {
        setIsLoading(true)
        ExploreServices
            .fetchExplore()
            .then(({ data }) => {
                setExplore({
                    artists: data.artists,
                    playlists: data.playlists,
                    albums: data.albums
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchExplore()
    }, [])

    const handleFilterChange = (filterType) => {
        setFilter(filterType)
    }

    const filterByType = {
        artists: filter === "all" || filter === "artists" ? explore.artists : [],
        playlists: filter === "all" || filter === "playlists" ? explore.playlists : [],
        albums: filter === "all" || filter === "albums" ? explore.albums : []
    }

    return (
        <div className="home-page">
            <Container className="page-container">
                {isLoading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <Container className="explore-items">
                        <Row className="mt-3 d-flex justify-content-between">
                            <Col xs="auto" className="mb-2">
                                <Button
                                    className="px-4"
                                    variant={filter === "all" ? "custom-primary" : "custom-secondary"}
                                    onClick={() => handleFilterChange("all")}
                                >
                                    Todos
                                </Button>
                            </Col>
                            <Col xs="auto" className="mb-2">
                                <Button
                                    className="px-4"
                                    variant={filter === "artists" ? "custom-primary" : "custom-secondary"}
                                    onClick={() => handleFilterChange("artists")}
                                >
                                    Artistas
                                </Button>
                            </Col>
                            <Col xs="auto" className="mb-2">
                                <Button
                                    className="px-4"
                                    variant={filter === "playlists" ? "custom-primary" : "custom-secondary"}
                                    onClick={() => handleFilterChange("playlists")}
                                >
                                    Playlists
                                </Button>
                            </Col>
                            <Col xs="auto" className="mb-2">
                                <Button
                                    className="px-4"
                                    variant={filter === "albums" ? "custom-primary" : "custom-secondary"}
                                    onClick={() => handleFilterChange("albums")}
                                >
                                    Álbumes
                                </Button>
                            </Col>
                        </Row>


                        <ExploreList
                            artists={filterByType.artists}
                            playlists={filterByType.playlists}
                            albums={filterByType.albums}
                        />
                    </Container>
                )}
            </Container>
        </div>
    )
}

export default ExplorePage
