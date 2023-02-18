import React from 'react'
import styles from "./index.module.css"
import { Link , useNavigate } from 'react-router-dom'
import SignUp from '../SignUp'
const Navbar = () => {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    console.warn("apple");
    localStorage.clear();
    navigate('/');
}
  return (
    <div className={styles.nav_container}>
       <nav className='header'>
        <Link to='/'>Home</Link>
 
        { auth ? <Link to="/logout" onClick={logout}> Logout</Link> :
        <><Link to="/signup">Sign Up</Link>  <Link to='/login'>Login</Link></>} 
       
      </nav>
    </div>
  )
}

export default Navbar