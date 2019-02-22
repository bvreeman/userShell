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
        <nav className="sticky navbar">
            <div className="row navbar-header">
                <div className='col-md-2 col-xs-12 navbarLeft'>
                    <NavLink to="/" className='navbarTitle'>CarSit</NavLink>
                </div>
                <div className='col-md-8 col-xs-12 navbarCenter'>
                    <div className='row allMenuItems'>
                        <NavLink to="/About" className="navbar-brand">About</NavLink>
                        <NavLink to='/ContactUsPage' className="navbar-brand">Contact Us</NavLink>
                        { links }
                        {console.log('logged in?', auth.uid)}
                    </div>
                </div>
                <div className='col-md-1 col-xs-12 navbarRight'>
                    <a className="socialItems" rel="noopener noreferrer" href="https://www.facebook.com/mnvalleytransport/" target="_blank"><i className="fa fa-facebook white-text mr-lg-4"></i></a>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        businessProfile: state.firebase.businessProfile
    }
}

export default connect(mapStateToProps)(HeaderNav)

