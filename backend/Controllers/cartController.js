const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Creating API for adding products in Cart Data
const addToCart = async(req, res) => {
    // console.log(req.body, req.user);
    console.log("Added", req.body.itemId);
    let userData = await User.findOne({_id: req.user.id})
    userData.cartData[req.body.itemId] += 1
    await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send("Added To Cart")
}

// Creating API for removing products from Cart Data
const removeFromCart = async(req ,res) => {
    console.log("Removed", req.body.itemId);
    let userData = await User.findOne({_id: req.user.id})
    if(userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1
        await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
        res.send("Removed From Cart")
    } 
}

// Creating API for getting Cart Data on Logging in
const getCart = async(req, res) => {
    console.log("Get Cart");
    let userData = await User.findOne({_id: req.user.id})
    res.json(userData.cartData)
}

module.exports = {
    addToCart,
    removeFromCart,
    getCart
}