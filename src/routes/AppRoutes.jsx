import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import PaylistDetailPage from '../pages/PlaylistDetailPage/PlaylistDetailPage'
import PrivateRoutes from './PrivateRoutes'
import NewPlaylistPage from '../pages/NewPlaylistPage/NewPlaylistPage'
import Homepage from '../pages/Homepage/Homepage'
import ExplorePage from '../pages/ExplorePage/ExplorePage'
import EditPlaylistPage from '../pages/EditPlaylistPage/EditPlaylistPage'
import AlbumDetailPage from '../pages/AlbumDetailPage/AlbumDetailPage'
import NewAlbumPage from '../pages/NewAlbumPage/NewAlbumPage'
import EditAlbumPage from '../pages/EditAlbumPage/EditAlbumPage'
import MyLibraryPage from '../pages/MyLibraryPage/MyLibraryPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import ArtistDetailsPage from '../pages/ArtistDetailsPage/ArtistDetailsPage'
import LaunchPage from '../pages/LaunchPage/LaunchPage'

const AppRoutes = () => {

    return (

        <div className="AppRoutes">

            <Routes>

                <Route path={'/'} element={<LaunchPage />} />
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/signup'} element={<SignUpPage />} />

                <Route element={<PrivateRoutes />}>

                    <Route path={'/home'} element={<Homepage />} />
                    <Route path={'/profile/:id'} element={<ProfilePage />} />

                    <Route path={'/explore'} element={<ExplorePage />} />

                    <Route path={'/mylibrary'} element={<MyLibraryPage />} />
                    <Route path={'/playlist/:id'} element={<PaylistDetailPage />} />

                    <Route path={'/album/:id'} element={<AlbumDetailPage />} />

                    <Route path={'/artists/:id'} element={<ArtistDetailsPage />} />

                    <Route path={'/playlist/new'} element={<NewPlaylistPage />} />
                    <Route path={'/playlist/edit/:id'} element={<EditPlaylistPage />} />
                    <Route path={'/album/new'} element={<NewAlbumPage />} />
                    <Route path={'/album/edit/:id'} element={<EditAlbumPage />} />
                </Route>

            </Routes>

        </div>
    )
}

export default AppRoutes