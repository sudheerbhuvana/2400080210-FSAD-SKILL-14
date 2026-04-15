import { useState, useEffect } from 'react'

function Profile({ userId }) {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (userId) {
      fetchUserProfile()
    }
  }, [userId])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/user/${userId}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to fetch profile')
        return
      }

      setError('')
      setUser(data)
      setFormData({
        username: data.username,
        email: data.email
      })
    } catch (err) {
      setError('Error fetching profile. Please try again.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const response = await fetch(`http://localhost:8080/api/auth/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to update profile')
        return
      }

      setUser(data)
      setIsEditing(false)
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setError('Error updating profile. Please try again.')
    }
  }

  if (!userId) {
    return <div className="profile-container"><p>User session not found. Please login again.</p></div>
  }

  if (!user) {
    return <div className="profile-container"><p>Loading profile...</p></div>
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>User Profile</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        {!isEditing ? (
          <div className="profile-info">
            <div className="info-row">
              <label>User ID:</label>
              <span>{user.id}</span>
            </div>
            <div className="info-row">
              <label>Username:</label>
              <span>{user.username}</span>
            </div>
            <div className="info-row">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <button onClick={() => setIsEditing(true)} className="edit-btn">Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="profile-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="submit-btn">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profile
