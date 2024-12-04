import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import Launchpage from '../pages/Launchpage/Launchpage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import Homepage from '../pages/Homepage/Homepage'


const AppRoutes = () => {

    return (

        <div className="AppRoutes">

            <Routes>
                <Route path={'/'} element={<Launchpage />} />

                <Route path={'/login'} element={<LoginPage />} />

                <Route path={'/signup'} element={<SignUpPage />} />

                <Route path={'/home'} element={<Homepage />} />

            </Routes>

        </div>
    )
}

export default AppRoutes