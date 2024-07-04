import './RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'
import { useState, useEffect } from 'react'
import axios from 'axios'

const RelatedProducts = (props) => {

  const [relatedproducts, setRelated_Products] = useState([])
  const { product } = props;

  useEffect(() => {
    if (!product) return;
    const fetchRelatedProducts = async () => {
      try {
        const category = product.category
        const response = await axios.get('http://localhost:4000/allproducts')
        const filteredProducts = response.data.filter(product => product.category === category)
        setRelated_Products(filteredProducts.slice(0,4))
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    }

    fetchRelatedProducts()
  }, [product])
 
  if (!product) {
    return null
  }

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedproducts.map((item, index) => {
            return <Item  key={index} 
                          id={item.id} 
                          name={item.name} 
                          image={item.image} 
                          new_price={item.new_price} 
                          old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
