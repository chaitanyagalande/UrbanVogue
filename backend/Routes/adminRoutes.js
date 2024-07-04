const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const { addProduct, removeProduct, allProducts } = require('../Controllers/adminController')

// Import and configure the cors middleware to allow cross-origin requests
router.use(cors({
    credentials: true, // Enable cookies and other credentials to be included in cross-origin requests
    origin: 'http://localhost:5174' // Specify the origin that is allowed to access the resources (in this case, a local development server)
}))

// Routes
router.post('/addproduct', addProduct) // Route for adding product
router.post('/removeproduct', removeProduct) // Route for removing product
router.get('/allproducts', allProducts) // Route for getting all products

module.exports = router
