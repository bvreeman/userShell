import React from 'react'
import { NavLink } from 'react-router-dom'
import './HeaderNav.css';

export const SignedOutLinksHamburger = (props) => {
    console.log(props)
    return (
        <div className="col-md-6 col-xs-12 navbarCenter signedOutLinks">
        <NavLink to='/signin' className="navbar-brand" onClick={props.passedClickHandler} >Sign In</NavLink>
        <NavLink to='/signup' className="navbar-brand" onClick={props.passedClickHandler} >Sign Up</NavLink>
    </div>
    )
}

export default SignedOutLinksHamburger