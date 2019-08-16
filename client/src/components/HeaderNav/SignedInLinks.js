import React from "react";
import './HeaderNav.css';
import {NavLink} from 'react-router-dom';
// import FirebaseAuthUserContext from '../Firebase/FirebaseAuthUserContext';
import { signOut } from '../../store/actions/authActions'
// import * as routes from '../../constants/routes';
import { connect } from 'react-redux'

const SignedInLinks = (props) => {
    console.log(props, 'props in signedInLinks')
    return (
        <div className="row signInLinks">
            <NavLink to='/ProfileForm' className="navbar-brand" onClick={props.passedClickHandler}>My Account</NavLink>
            <a href='/' onClick={props.signOut} className='navbar-brand'>Log Out</a> 
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)