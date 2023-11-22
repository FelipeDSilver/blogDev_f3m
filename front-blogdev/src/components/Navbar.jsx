import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { userLogin } from '../hooks/userAuthentication'

const Navbar = ({ user }) => {
  const { userLogout } = userLogin()
  const handleLogout = async () => {
    console.log('logout')
    userLogout()
  }
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
          Blog <span>dev</span>{user && <span> - {user.displayName}</span>}
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to='/home'
              className={({ isActive }) => (isActive ? styles.active : null)}>Home</NavLink>
          </li>
          <li>
            <NavLink to='/login'
              className={({ isActive }) => (isActive ? styles.active : null)}>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register'
              className={({ isActive }) => (isActive ? styles.active : null)}>Register</NavLink>
          </li>
          <li>
            <NavLink to='/about'
              className={({ isActive }) => (isActive ? styles.active : null)}>About</NavLink>
          </li>
          {user && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar