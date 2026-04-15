# User Authentication & Session Management Frontend

This is a React-based frontend for the User Authentication and Session Management application.

## Features

- **User Registration**: Create new user accounts with username, email, and password
- **User Login**: Authenticate users with credentials
- **Session Management**: Store user info in localStorage and sessionStorage
- **Home Page**: Welcome page for authenticated users
- **Profile Management**: View and update user profile information
- **Logout**: Clear session and redirect to login

## Technology Stack

- React 18
- React Router DOM 6
- Vite (Build tool)
- Modern CSS

## Project Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Backend API

The application communicates with a Spring Boot backend API running on `http://localhost:8080`

### API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/user/{id}` - Get user profile
- `PUT /api/auth/user/{id}` - Update user profile

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Register.jsx      # Registration component
│   │   ├── Login.jsx         # Login component
│   │   ├── Home.jsx          # Home page component
│   │   └── Profile.jsx       # User profile component
│   ├── App.jsx               # Main app component with routing
│   ├── App.css               # Styling
│   ├── index.css             # Global styles
│   └── main.jsx              # React entry point
├── index.html                # HTML template
├── package.json              # Project dependencies
├── vite.config.js            # Vite configuration
└── eslint.config.js          # ESLint configuration
```

## Notes

- Make sure the backend server is running on port 8080
- Sessions are stored using both localStorage and sessionStorage
- The app includes CORS support for the backend API
