import { Container } from "react-bootstrap"

import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect, useState } from "react"
import userServices from "../../services/user.services"
import Loader from "../../components/Loader/Loader"

const ProfilePage = () => {

    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchUser = () => {
            userServices.fetchUser(loggedUser._id)
                .then(({ data }) => {
                    console.log(data)
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        if (loggedUser) {
            fetchUser()
        }
    }, [loggedUser])


    return (
        <div className="profile-page">
            <Container className="page-container">

                {isLoading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : (
                    <>

                        <Container className="profile-header">
                            <h2>Mi perfil</h2>
                            <h2>{user.username}</h2>
                            <h2>{user.playlists.length === 1 ? `${user.playlists.length} playlist` : `${user?.playlists?.length} playlists`}</h2>
                        </Container>

                    </>
                )}

            </Container>
        </div>
    )
}

export default ProfilePage