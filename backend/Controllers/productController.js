const Product = require('../models/product')

// Creating API for New Collection Data
const newCollections = async(req, res) => {
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log("New Collection Fetched");
    res.send(newcollection)
}

// Creating API for Popular In Women Section
const popularInWomen = async(req ,res) => {
    let products = await Product.find({category: "women"})
    let popular_in_women = products.slice(0,4)
    console.log("Popular In Women Fetched");
    res.send(popular_in_women)
}

// Creating API for getting all Products
const allProducts = async(req, res) => {
    let products = await Product.find({})
    console.log("All Products Fetched");
    res.send(products)
}

module.exports = {
    newCollections, 
    popularInWomen,
    allProducts
}