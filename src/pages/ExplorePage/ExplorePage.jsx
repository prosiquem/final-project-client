import { Col, Container, Row, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import ExploreList from "../../components/ExploreList/ExploreList"
import ExploreServices from "../../services/explore.services"
import SpecificSearcher from "../../components/SpecificSearcher/SpecificSearcher"
import { EXPLORE_FILTERS } from "../../consts/filter.conts"
import "./ExplorePage.css"

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
                        <Row className="mt-3 align-items-center">

                            <div className="col horizontal-scroll">
                                {EXPLORE_FILTERS.map(elm => {
                                    return (
                                        <Button
                                            className="px-4"
                                            variant={filter === elm.value ? "custom-primary" : "custom-secondary"}
                                            onClick={() => handleFilterChange(elm.value)}>
                                            {elm.label}
                                        </Button>
                                    )
                                })}
                            </div>

                            <Col xs="auto" className="mb-2">
                                <SpecificSearcher
                                    playlists={explore.playlists}
                                    artists={explore.artists}
                                    albums={explore.albums}
                                    setFilteredResults={setFilteredResults}
                                />
                            </Col>

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