import React from "react";
import './HeaderNav.css';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'


const HeaderNav = (props) => {
    const { auth, businessProfile } = props;
    const links = auth.uid ? <SignedInLinks businessProfile={businessProfile} /> : <SignedOutLinks />
    return (
        <div className="sticky headerContainer">
            <nav className="navbar">
                <div className="row navbar-header">
                    <div className='col-md-3 col-xs-12 navbarLeft'>
                        <NavLink to="/" className='navbarTitle'>CarSit</NavLink>
                    </div>
                    <NavLink to="/About" className="navbar-brand">About</NavLink>
                    <NavLink to='/ContactUsPage' className="navbar-brand">Contact Us</NavLink>
                    <a className="navbarRight socialItems fb-ic ml-0" rel="noopener noreferrer" href="https://www.facebook.com/mnvalleytransport/" target="_blank" style={{color: '#ffffff'}}><i className="fa fa-facebook white-text mr-lg-4"></i></a>
                    {console.log('logged in?', auth.uid)}
                    { links }
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        businessProfile: state.firebase.businessProfile
    }
}

export default connect(mapStateToProps)(HeaderNav)

