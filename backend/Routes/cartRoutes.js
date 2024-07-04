const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const { addToCart, removeFromCart, getCart } = require('../Controllers/cartController')
const { fetchUser } = require('../Middlewares/fetchUser')

// Import and configure the cors middleware to allow cross-origin requests
router.use(cors({
    credentials: true, // Enable cookies and other credentials to be included in cross-origin requests
    origin: 'http://localhost:5173' // Specify the origin that is allowed to access the resources (in this case, a local development server)
}))

// Routes
router.post('/addtocart', fetchUser, addToCart) // Route for adding product to cart
router.post('/removefromcart', fetchUser, removeFromCart) // Route removing product from cart
router.post('/getcart', fetchUser, getCart) // Route for getting cart 

module.exports = router