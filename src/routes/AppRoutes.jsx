import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import Launchpage from '../pages/Launchpage/Launchpage'
import CreateAccountPage from '../pages/CreateAccountPage/CreateAccountPage'


const AppRoutes = () => {

    return (

        <div className="AppRoutes">

            <Routes>
                <Route path={'/'} element={<Launchpage />} />

                <Route path={'/login'} element={<LoginPage />} />

                <Route path={'/create-account'} element={<CreateAccountPage />} />

                <Route path={'/homepage'} element={<h1>homepage</h1>} />

            </Routes>

        </div>
    )
}

export default AppRoutes