import { Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import ExploreList from "../../components/ExploreList/ExploreList"
import ExploreServices from "../../services/explore.services"


const ExplorePage = () => {

    const [explore, setExplore] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const fetchExplore = () => {
        setIsLoading(true)
        ExploreServices
            .fetchExplore()
            .then(({ data }) => {
                setExplore(data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchExplore()
    }, [])


    return (
        <div className="home-page">
            <Container className="page-container">
                {isLoading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <Container className="explore-items">
                            <ExploreList />
                        </Container>
                    </>
                )}
            </Container>
        </div >
    )
}

export default ExplorePage