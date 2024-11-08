import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/UrbanVogue.jpeg'
import nav_profile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={nav_logo} alt="" style={{width: "80px"}} className="nav-logo"/>
      <p>UrbanVogue - Admin Panel</p>
      <img src={nav_profile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar
