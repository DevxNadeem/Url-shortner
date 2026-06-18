import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='Navbar-cntr'>
      <img src="/logo.png" alt="logo" />
      <div className='nav-links'>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div className='nav-auth'>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Navbar