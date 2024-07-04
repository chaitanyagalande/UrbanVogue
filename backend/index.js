const express = require('express')
const app = express()
const port = 4000

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Database connection with MongoDB Atlas
mongoose.connect("mongodb+srv://chaitanya051203:chaionATLAS2003@cluster0.q53stnp.mongodb.net/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(`Error connecting to MongoDB ${error}`);
})

app.get('/', (req, res) => {
    res.send("Express App is Running")
})

// Configuring the Image(Disk) Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const authRoutes = require('./Routes/authRoutes')
const cartRoutes = require('./Routes/cartRoutes')
const productRoutes = require('./Routes/productRoutes')
const adminRoutes = require('./Routes/adminRoutes')

// Using Defined Routes
app.use('/', authRoutes)
app.use('/', cartRoutes)
app.use('/', productRoutes)
app.use('/admin', adminRoutes)

// API Creation 
app.listen(port, () => {
    console.log(`Server is listening on: http://localhost:${port}`);
})

