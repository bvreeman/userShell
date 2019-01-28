import React from "react";
import './HeaderNav.css';
import {NavLink} from 'react-router-dom';
// import FirebaseAuthUserContext from '../Firebase/FirebaseAuthUserContext';
import { signOut } from '../../store/actions/authActions'
// import * as routes from '../../constants/routes';
import { connect } from 'react-redux'

const SignedInLinks = (props) => {
    return (
        <div className="col-md-9 col-xs-12 navbarCenter">
            <NavLink to='/ProfileForm' className="navbar-brand">My Account</NavLink>
            <li><a href='/' onClick={props.signOut} className='navbar-brand'>Log Out</a></li> 
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)