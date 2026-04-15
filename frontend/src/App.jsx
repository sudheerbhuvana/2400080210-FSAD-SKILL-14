import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId') || localStorage.getItem('userId')
    const storedUsername = sessionStorage.getItem('username') || localStorage.getItem('username')

    if (storedUserId && storedUsername) {
      setIsLoggedIn(true)
      setUserId(storedUserId)
      setUsername(storedUsername)
    }
  }, [])

  const handleRegister = (user) => {
    setIsLoggedIn(true)
    setUserId(user.id)
    setUsername(user.username)
    sessionStorage.setItem('userId', user.id)
    sessionStorage.setItem('username', user.username)
  }

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setUserId(user.id)
    setUsername(user.username)
    localStorage.setItem('userId', user.id)
    localStorage.setItem('username', user.username)
    sessionStorage.setItem('userId', user.id)
    sessionStorage.setItem('username', user.username)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserId(null)
    setUsername('')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('username')
  }

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="nav-title">User Auth App</h1>
          {isLoggedIn && (
            <div className="nav-links">
              <span className="user-info">Welcome, {username}</span>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register onRegister={handleRegister} />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Home username={username} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile userId={userId} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
