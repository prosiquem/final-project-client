
import './App.css'
import './components/Navigation/Navigation.css'
import Navigation from './components/Navigation'
import AppRoutes from './routes/AppRoutes.jsx'
import MusicPlayer from './components/MusicPlayer/MusicPlayer.jsx'

const App = () => {

  return (
    <div className="App">
      <Navigation />
      <MusicPlayer />
      <AppRoutes />
    </div>
  )
}

export default App