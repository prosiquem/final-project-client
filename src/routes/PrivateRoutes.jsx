import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"
import Loader from "../components/Loader/Loader"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {

    const { loggedUser, isFetchingUser } = useContext(AuthContext)

    if (isFetchingUser) {
        return <Loader />
    }

    if (!loggedUser) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}
export default PrivateRoutes