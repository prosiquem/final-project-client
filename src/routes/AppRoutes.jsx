import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import Launchpage from '../pages/Launchpage/Launchpage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import PaylistDetailPage from '../pages/PlaylistDetailPage/PlaylistDetailPage'
import PrivateRoutes from './PrivateRoutes'
import NewPlaylistPage from '../pages/NewPlaylistPage/NewPlaylistPage'
import Homepage from '../pages/HomePage/Homepage'
import ExplorePage from '../pages/ExplorePage/ExplorePage'
import EditPlaylistPage from '../pages/EditPlaylistPage/EditPlaylistPage'


const AppRoutes = () => {

    return (

        <div className="AppRoutes">

            <Routes>

                <Route path={'/'} element={<Launchpage />} />
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/signup'} element={<SignUpPage />} />

                <Route element={<PrivateRoutes />}>

                    <Route path={'/home'} element={<Homepage />} />
                    <Route path={'/profile/:id'} element={<h1>--------------------Seré un perfil</h1>} />

                    <Route path={'/explore'} element={<ExplorePage />} />

                    <Route path={'/mylibrary'} element={<h1>--------------------My library</h1>} />
                    <Route path={'/playlist/:id'} element={<PaylistDetailPage />} />

                    <Route path={'/album/:id'} element={<h1>--------------------Album details</h1>} />

                    <Route path={'/artists'} element={<h1>--------------------Artists page</h1>} />
                    <Route path={'/artists/:id'} element={<h1>--------------------Artist detail page</h1>} />

                    <Route path={'/playlist/new'} element={<NewPlaylistPage />} />
                    <Route path={'/playlist/edit/:id'} element={<EditPlaylistPage />} />
                    <Route path={'/album/new'} element={<h1>--------------------Form album</h1>} />
                    <Route path={'/album/edit'} element={<h1>--------------------Edit album</h1>} />
                    <Route path={'/track/new'} element={<h1>--------------------Form track</h1>} />
                    <Route path={'/track/edit'} element={<h1>--------------------Edit track</h1>} />

                </Route>

            </Routes>

        </div>
    )
}

export default AppRoutes