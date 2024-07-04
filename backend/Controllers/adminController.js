const Product = require('../models/product')

// Creating API for Adding Products
const addProduct = async(req, res) => {
    let products = await Product.find({})
    let id
    if(products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0] // Getting that only one product in last_product_array
        id = last_product.id + 1
    } else {
        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })
    console.log(product);
    await product.save()
    console.log("Saved");
    res.json({
        success: 1,
        name: req.body.name
    })
}

// Creating API for Deleting Products
const removeProduct = async(req, res) => {
    await Product.deleteOne({
        id: req.body.id
    })
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
}

// Creating API for getting all Products
const allProducts = async(req, res) => {
    let products = await Product.find({})
    console.log("All Products Fetched");
    res.send(products)
}

module.exports = {
    addProduct, 
    removeProduct, 
    allProducts
}