
import './App.css'
import './components/Navigation/Navigation.css'
import Navigation from './components/Navigation'
import AppRoutes from './routes/AppRoutes.jsx'
import MusicPlayer from './components/MusicPlayer/MusicPlayer.jsx'
import UserMessage from './components/UserMessage/UserMessage.jsx'

const App = () => {

  return (
    <div className="App">
      <Navigation />
      <MusicPlayer />
      <AppRoutes />
      <UserMessage />
    </div>
  )
}

export default App