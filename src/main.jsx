import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context.jsx'
import { UserMessageProviderWrapper } from './contexts/userMessage.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserMessageProviderWrapper>
      <AuthProviderWrapper>
        <Router>
          <App />
        </Router>
      </AuthProviderWrapper>
    </UserMessageProviderWrapper>
  </StrictMode>
)
