// import { useContext } from 'react'
// import './CSS/ShopCategory.css'
// import { ShopContext } from '../Context/ShopContext'
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'
// import Item from '../Components/Item/Item'

// const ShopCategory = (props) => {
//   const { all_product } = useContext(ShopContext)

//   return (
//     <div className="shop-category">
//       <img className="shop-category-banner" src={props.banner} alt="" />
//       <div className="shop-category-indexSort">
//         <p>
//           <span>Showing 1-12</span> out of 36 products
//         </p>
//         <div className="shop-category-sort">
//           Sort by <img src={dropdown_icon} alt='' />
//         </div>
//       </div>
//       <div className="shop-category-products">
//         {all_product.map((item, index) => {
//           if(props.category === item.category) {
//             return <Item  key={index} 
//                           id={item.id} 
//                           name={item.name} 
//                           image={item.image} 
//                           new_price={item.new_price} 
//                           old_price={item.old_price}/>
//           } else {
//             return null;
//           }
//         })}
//       </div>
//       <div className="shop-category-loadmore">
//         Explore More
//       </div>
//     </div>
//   )
// }

// export default ShopCategory


import { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortProducts = (products) => {
    if (sortOption === 'low-to-high') {
      return [...products].sort((a, b) => a.new_price - b.new_price);
    } else if (sortOption === 'high-to-low') {
      return [...products].sort((a, b) => b.new_price - a.new_price);
    } else {
      return products;
    }
  };

  const filteredAndSortedProducts = sortProducts(
    all_product.filter(item => item.category === props.category)
  );

  return (
    <div className="shop-category">
      {/* <img className="shop-category-banner" src={props.banner} alt="" /> */}
      <div className="shop-category-indexSort">
        <p>
          <span>Showing</span> out of {filteredAndSortedProducts.length} products
        </p>
        <div className="shop-category-sort">
          <label>Sort by: </label>
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Select</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="shop-category-products">
        {filteredAndSortedProducts.slice(0, 12).map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className="shop-category-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
