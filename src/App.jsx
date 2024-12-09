
import './App.css'
import './components/Navigation/Navigation.css'
import Navigation from './components/Navigation'
import AppRoutes from './routes/AppRoutes.jsx'
import MusicPlayer from './components/MusicPlayer/MusicPlayer.jsx'
import UserMessage from './components/UserMessage/UserMessage.jsx'
import TracksUpload from './components/TracksUpload/TracksUpload.jsx'
import { useContext } from 'react'
import { AuthContext } from './contexts/auth.context.jsx'

const App = () => {

  const { loggedUser } = useContext(AuthContext)

  return (
    <div className="App">
      <Navigation />
      <MusicPlayer />
      <AppRoutes />
      <UserMessage />
      {loggedUser && <TracksUpload />}
    </div>
  )
}

export default App