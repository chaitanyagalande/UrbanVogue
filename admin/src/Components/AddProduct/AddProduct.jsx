import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg' 
import axios from 'axios'

const AddProduct = () => {

    const [image, setImage] = useState(false)

    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })  

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        try {
            const uploadResponse = await axios.post('http://localhost:4000/upload', formData, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            responseData = uploadResponse.data;

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);
                const addProductResponse = await axios.post('http://localhost:4000/admin/addproduct', product, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                const addProductData = addProductResponse.data;
                if (addProductData.success) {
                    alert("Product Added Successfully");
                } else {
                    alert("Failed to Add Product");
                }
            }
        } catch (error) {
            console.error("There was an error adding the product!", error);
            alert("Failed to Add Product");
        }
    }

    return (
    <div className='add-product'>
        <div className="add-product-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here'/>
        </div>
        <div className="add-product-price">
            <div className="add-product-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here'/>
            </div>
            <div className="add-product-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here'/>
            </div>
        </div>
        <div className="add-product-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="add-product-itemfield">
            <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image) : upload_area} className="add-product-thumbnail-img" alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={() => {Add_Product()}} className='add-product-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
