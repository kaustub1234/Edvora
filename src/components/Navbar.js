import React from 'react'
import './Navbar.css'

const Navbar = (props) => {
  const image = props.imageurl;
  return (
    <div className="navbar">
      <div className="navbar_logo">
        Edvora
      </div>
      <div>
        <div className="navbar_userDetail">
          <div className="userDetail_userName">{props.name}</div>
          <img className="userDetail_userImage" src={image} alt="UserImage"/>
        </div>
      </div>
    </div>
  )
}

export default Navbar