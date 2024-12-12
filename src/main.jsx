import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './queries.css'

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context.jsx'
import { UserMessageProviderWrapper } from './contexts/userMessage.context.jsx'
import { MusicPlayerProvider } from './contexts/musicplayer.context.jsx'
import { TracksUploaderWrapper } from './contexts/tracksUploader.context.jsx'

createRoot(document.getElementById('root')).render(
  <UserMessageProviderWrapper>
    <AuthProviderWrapper>
      <TracksUploaderWrapper>
        <MusicPlayerProvider>
          <Router>
            <App />
          </Router>
        </MusicPlayerProvider>
      </TracksUploaderWrapper>
    </AuthProviderWrapper>
  </UserMessageProviderWrapper>
)
