const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const { newCollections, popularInWomen,allProducts } = require('../Controllers/productController')

// Import and configure the cors middleware to allow cross-origin requests
router.use(cors({
    credentials: true, // Enable cookies and other credentials to be included in cross-origin requests
    origin: 'http://localhost:5173' // Specify the origin that is allowed to access the resources (in this case, a local development server)
}))

// Routes
router.get('/newcollections', newCollections) // Route for getting new collections
router.get('/popularinwomen', popularInWomen) // Route for getting popular in women collections
router.get('/allproducts', allProducts) // Route for getting all products

module.exports = router
