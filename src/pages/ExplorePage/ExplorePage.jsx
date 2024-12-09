import { Col, Container, Row, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import ExploreList from "../../components/ExploreList/ExploreList"
import ExploreServices from "../../services/explore.services"
import SpecificSearcher from "../../components/SpecificSearcher/SpecificSearcher"

const ExplorePage = () => {
    const [explore, setExplore] = useState({
        artists: [],
        playlists: [],
        albums: []
    })
    const [filteredResults, setFilteredResults] = useState({
        artists: [],
        playlists: [],
        albums: []
    })
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState("all")

    const fetchExplore = () => {
        setIsLoading(true)
        ExploreServices.fetchExplore()
            .then(({ data }) => {
                console.log(data)
                setExplore({
                    artists: data.artists,
                    playlists: data.playlists,
                    albums: data.albums
                })
                setFilteredResults({
                    artists: data.artists,
                    playlists: data.playlists,
                    albums: data.albums
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchExplore()
    }, [])

    const handleFilterChange = (filterType) => {
        setFilter(filterType)
    }

    const filteredData = {
        artists: filter === "all" || filter === "artists" ? filteredResults.artists : [],
        playlists: filter === "all" || filter === "playlists" ? filteredResults.playlists : [],
        albums: filter === "all" || filter === "albums" ? filteredResults.albums : []
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
                        <Row className="mt-3">
                            <Container className="explore-buttons d-flex justify-content-between">
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

                                <Container className="explore-searcher">
                                    <Col xs="auto" className="mb-2">
                                        <SpecificSearcher
                                            playlists={explore.playlists}
                                            artists={explore.artists}
                                            albums={explore.albums}
                                            setFilteredResults={setFilteredResults}
                                        />
                                    </Col>
                                </Container>
                            </Container>
                        </Row>

                        <ExploreList
                            artists={filteredData.artists}
                            playlists={filteredData.playlists}
                            albums={filteredData.albums}
                        />
                    </Container>
                )}
            </Container>
        </div>
    )
}

export default ExplorePage