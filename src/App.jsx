
import './App.css'
import './components/Navigation/Navigation.css'
import Navigation from './components/Navigation'
import AppRoutes from './routes/AppRoutes.jsx'

const App = () => {

  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
    </div>
  )
}

export default App