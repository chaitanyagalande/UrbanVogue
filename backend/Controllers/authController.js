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

// // Creating API for Getting User Profile
const getProfile = async (req, res) => {
    // Get token from request headers
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            success: false,
            errors: 'No token provided'
        });
    }

    try {
        // Verify the JWT token and await the result
        const decoded = await jwt.verify(token, 'secret_ecom');
        const userId = decoded.user.id;

        // Fetch the user from the database
        const user = await User.findById(userId).select('-password');

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                errors: 'User not found'
            });
        }

        // Respond with user data
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                // Add other necessary fields
            }
        });

    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({
            success: false,
            errors: 'Server error'
        });
    }
};


module.exports = {
    signupUser,
    loginUser,
    getProfile
}