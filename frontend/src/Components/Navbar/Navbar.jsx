import './Navbar.css'
import logo from '../Assets/UrbanVogue.jpeg'
import cart_icon from '../Assets/cart_icon.png'
import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'
import { UserContext } from '../../Context/UserContext'

const Navbar = () => {

    const [menu, setMenu] = useState("shop")
    const { getTotalCartItems } = useContext(ShopContext)
    const menuRef = useRef()

    const { user } = useContext(UserContext)

    // if(user) {
    //     console.log(user.name);
    // }
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }

    return (
        <div className='navbar'>
            <Link to='/' style={{textDecoration: "none"}}>
                <div onClick={() => {setMenu("shop")}}className="nav-logo">
                    <img src={logo} style={{width: "80px"}} alt="" />
                    <p>UrbanVogue</p>
                </div>    
            </Link>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens" ? <hr/> : <></>}</li>
                <li onClick={() => {setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids" ? <hr/> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ? <button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
                : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
            {user ? 
                <span>
                    <div>Hello, {user.name}!</div>
                    {/* <div>Email Id: {user.email}</div>  */}
                </span>
                : <></>
            }
        </div>
    )
}

export default Navbar
