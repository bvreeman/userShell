import React from 'react'
import { NavLink } from 'react-router-dom'
import './HeaderNav.css';


const SignedOutLinks = () => {
    return (
        <div className="col-md-6 col-xs-12 navbarCenter">
            <NavLink to='/signin' className="navbar-brand">Sign In</NavLink>
            <NavLink to='/signup' className="navbar-brand">Sign Up</NavLink>
        </div>
    )
}

export default SignedOutLinks