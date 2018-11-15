import React from "react";
import './HeaderNav.css';
import {Link} from 'react-router-dom';
import FirebaseAuthUserContext from '../Firebase/FirebaseAuthUserContext';
import FirebaseSignOut from '../Firebase/FirebaseSignOut'
import * as routes from '../../constants/routes';


const HeaderNav = () => 
    <FirebaseAuthUserContext.Consumer>
        {authUser => authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </FirebaseAuthUserContext.Consumer>

const NavigationAuth = () =>
    <div className="sticky headerContainer">
        <nav className="navbar">
            <div className="row navbar-header">
                <div className='col-md-3 col-xs-12 navbarLeft'>
                    <Link to="/" className='navbarTitle'>Find A Consultant Now</Link>
                </div>
                <div className="col-md-9 col-xs-12 navbarCenter">
                    <Link to="/" className="navbar-brand">Home</Link>
                    {/* <Link to="/Community" className="navbar-brand">Community</Link> */}
                    <Link to="/About" className="navbar-brand">About</Link>
                    <Link to="/Gallery" className="navbar-brand">Gallery</Link>
                    <Link to="/DriversApplication" className="navbar-brand">Become a Driver</Link>
                    <Link to='/ContactUsPage' className="navbar-brand">Contact Us</Link>
                    <a className="navbarRight socialItems fb-ic ml-0" rel="noopener noreferrer" href="https://www.facebook.com/mnvalleytransport/" target="_blank" style={{color: '#ffffff'}}><i className="fa fa-facebook white-text mr-lg-4"></i></a>
                </div>
                <div className="rightside-Nav">
                    {/* <li><Link to={routes.HOME}>Home</Link></li> */}
                    <Link to={routes.ACCOUNT} className="navbar-brand">Account</Link>
                    <FirebaseSignOut />
                </div>
            </div>
        </nav>
    </div>

const NavigationNonAuth = () =>
    <div className="container-fluid sticky headerContainer">
        <nav className="navbar">
            <div className="row navbar-header">
                <div className='col-md-12 col-xs-12'>
                    <Link to="/" className='navbarTitle'>Find A Consultant Now</Link>
                </div>
                <div className="navbarCenter">
                    <Link to="/" className="navbar-brand">Home</Link>
                    {/* <Link to="/Community" className="navbar-brand">Community</Link> */}
                    <Link to="/About" className="navbar-brand">About</Link>
                    <Link to="/Gallery" className="navbar-brand">Gallery</Link>
                    <Link to="/DriversApplication" className="navbar-brand">Become a Driver</Link>
                    <Link to='/ContactUsPage' className="navbar-brand">Contact Us</Link>
                </div>
                <div className="rightside-Nav">
                    <Link to={routes.SIGN_IN}>Sign In</Link>
                </div>
            </div>
        </nav>
    </div>

export default HeaderNav;