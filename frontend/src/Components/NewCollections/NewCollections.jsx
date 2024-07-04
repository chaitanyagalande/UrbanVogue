import './NewCollections.css'
// import new_collection from '../Assets/new_collections'
import Item from '../Item/Item' 
import { useEffect, useState } from 'react'
import axios from 'axios'

const NewCollections = () => {

  const [new_collection, setNew_Collection] = useState([])

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await axios.get('http://localhost:4000/newcollections')
        setNew_Collection(response.data)
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    }

    fetchNewCollections()
  }, [])

  return (
    <div className="new-collections" id='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <div className="collections">
        {new_collection.map((item, index) => {
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

export default NewCollections
