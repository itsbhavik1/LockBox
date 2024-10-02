import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-3atkm2m0ekok6nje.us.auth0.com"
    clientId="6TQtBF79pObfhc5ZZpRqqS6hpNF0CjDO"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
)
