import { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product'
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    // for (let index = 0; index < all_product.length + 1; index++) {
    //     cart[index] = 0;            
    // }
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;            
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([])

    const [cartItems, setCartItems] = useState(getDefaultCart())

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allproducts');
                setAll_Product(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };

        const fetchCartItems = async () => {
            if (localStorage.getItem('auth-token')) {
                try {
                    const response = await axios.post('http://localhost:4000/getcart', 
                    {}, // Send an empty object for the body
                    {
                        headers: {
                            'Accept': 'application/json',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    setCartItems(response.data);
                } catch (error) {
                    console.error("There was an error fetching the cart items!", error);
                }
            }
        };

        fetchAllProducts();
        fetchCartItems();
    }, []);


    const addToCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        if(localStorage.getItem('auth-token')) {
            try {
                const response = await axios.post('http://localhost:4000/addtocart', 
                { itemId },
                {
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error("There was an error adding to cart!", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        if(localStorage.getItem('auth-token')) {
            try {
                const response = await axios.post('http://localhost:4000/removefromcart', 
                { itemId },
                {
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error("There was an error removing from cart!", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount
    }

    const getTotalCartItems = () => {
        let totalItem = 0
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                totalItem += cartItems[item]
            }
        }
        return totalItem
    }

    const contextValue = {
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        getTotalCartAmount, 
        getTotalCartItems
    }

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider; 