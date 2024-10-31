import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/UI/Header'
import HomePage from './components/Pages/HomePage'
import InputPage from './components/Pages/InputPage'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workoutPlanner" element={<InputPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
