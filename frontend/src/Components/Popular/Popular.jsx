import './Popular.css'
// import data_product from '../Assets/data' 
import Item from '../Item/Item'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    const fetchPopularProducts = async() => {
      try {
        const response = await axios.get('https://urbanvogue-backend.onrender.com/popularinwomen')
        setPopularProducts(response.data)
      } catch(error) {
        console.error("There was an error fetching the popular in women products !", error);
      }
    }

    fetchPopularProducts()
  }, [])

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <div className="popular-item">
        {popularProducts.map((item, index) => {
            return <Item key={index} 
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

export default Popular
