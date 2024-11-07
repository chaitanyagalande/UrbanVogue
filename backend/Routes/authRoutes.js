const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const { signupUser, loginUser, getProfile } = require('../Controllers/authController')

// Import and configure the cors middleware to allow cross-origin requests
router.use(cors({
    credentials: true, // Enable cookies and other credentials to be included in cross-origin requests
    origin: 'https://urbanvogue-frontend.onrender.com' // Specify the origin that is allowed to access the resources (in this case, a local development server)
}))

// Routes
router.post('/signup', signupUser) // Route for user registration
router.post('/login', loginUser) // Route for user login
router.get('/getProfile', getProfile)

module.exports = router