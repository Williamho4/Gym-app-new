import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './context/UserContext'
import { ExercisesProvider } from './context/ExercisesContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserProvider>
    <ExercisesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ExercisesProvider>
  </UserProvider>
)
