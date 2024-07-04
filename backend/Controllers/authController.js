const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Creating API for Adding/Registering Users
const signupUser = async(req, res) => {
    let check = await User.findOne({email: req.body.email})
    if(check) {
        return res.status(400).json({
            success: false,
            errors: `User with email: ${req.body.email} already exists`
        })
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0        
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({
        success: true,
        token
    })
}

// Creating API for User Login
const loginUser = async(req, res) => {
    let user = await User.findOne({
        email: req.body.email
    })
    if(user) {
        const passCompare = req.body.password === user.password
        if(passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({
                success: true,
                token
            })
        } else {
            res.json({
                success: false,
                errors: "Wrong Username or Password"
            })
        }
    } else {
        res.json({
            success: false,
            errors: `User with email: ${req.body.email} doesn't exists`
        })
    }
}

module.exports = {
    signupUser,
    loginUser
}