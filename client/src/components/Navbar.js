import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserProvider"
import "../css/Navbar.css"

export default function Navbar(){ 
  const { logout } = useContext(UserContext)

  return (
    <div className="navbar">
      <h1>
          <span className="text-primary">Rock</span> The <span className="text-primary">Vote</span>
      </h1>
      <ul>
        <Link to="/profile" className="links">Profile</Link>
        <Link to="/public" className="links">Public</Link>
        <Link onClick={logout} className="links">Logout</Link>        
      </ul>
    </div>
  )
}