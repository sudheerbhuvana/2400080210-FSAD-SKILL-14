function Home({ username }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Home Page</h1>
        <p>Hello, {username}!</p>
        <p>You have successfully logged in to the User Authentication and Session Management application.</p>
        <div className="home-info">
          <h3>Application Features:</h3>
          <ul>
            <li>User Registration</li>
            <li>User Authentication</li>
            <li>Session Management using localStorage and sessionStorage</li>
            <li>User Profile Management</li>
            <li>Secure Logout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
