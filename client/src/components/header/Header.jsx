import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { UserData } from '../../context/UserContext'

const Header = ({isAuth}) => {
  return (
    <header>
        <div className='logo'>
            E-Learning
            <div className='link'>
                <Link to={'/'}>Home</Link>
                <Link to={'/courses'}>Courses</Link>
                <Link to={'/about'}>About</Link>
                {isAuth? (
                  <Link to={'/account'}>Account</Link>
                ):(
                  <Link to={'/login'}>Login</Link>
                )}

            </div>
        </div>
    </header>
  )
}

export default Header