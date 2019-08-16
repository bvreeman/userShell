import React from "react";
import './HeaderNav.css';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import HamburgerMenu from 'react-hamburger-menu'

class HeaderNav extends React.PureComponent {
    state = {
        open: false,
    }

    handleClick() {
        this.setState({
            open: !this.state.open
        });
    }

    passedClickHandler = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { auth, businessProfile } = this.props;
        const links = auth.uid ? <SignedInLinks businessProfile={businessProfile} passedClickHandler={this.passedClickHandler}/> : <SignedOutLinks passedClickHandler={this.passedClickHandler} />        
        return (
            <nav className="sticky navbar">
                <div className="row navbar-header">
                    <div className='col-md-3 col-xs-12 navbarLeft'>
                        <NavLink to="/" className='navbarTitle'>Find A Consultant Now</NavLink>
                    </div>
                    <div className='col-md-7 col-xs-0 navbarCenter'>
                        <div className='row allMenuItems'>
                            <NavLink to="/About" className="navbar-brand">About</NavLink>
                            <NavLink to='/ContactUsPage' className="navbar-brand">Contact Us</NavLink>
                            { links }
                        </div>
                    </div>
                    <div className='col-md-1 col-xs-12 navbarRight'>
                        <a className="socialItems" rel="noopener noreferrer" href="https://www.facebook.com/vreemanconsultingllc/" target="_blank"><i className="fa fa-facebook white-text mr-lg-4"></i></a>
                        <div className='hamburgerMenuDiv'>
                            <HamburgerMenu
                                className="hamburgerMenu"
                                isOpen={this.state.open}
                                menuClicked={this.handleClick.bind(this)}
                                width={18}
                                height={18}
                                strokeWidth={3}
                                rotate={0}
                                color='white'
                                animationDuration={0.5}
                            />
                        </div>
                    </div>
                    {this.state.open ?
                            <div className="row navbar-header mobileMenu">
                                <div className='col-md-12 col-xs-12 mobileNavbarCenter'>
                                    <div className='row mobileAllMenuItems'>
                                        <NavLink to="/About" className="mobile-navbar-brand" onClick={this.handleClick.bind(this)}>About</NavLink>
                                        <NavLink to='/ContactUsPage' className="mobile-navbar-brand" onClick={this.handleClick.bind(this)}>Contact Us</NavLink>
                                        { links }
                                    </div>
                                    <div className='col-md-1 col-xs-12 NavbarRight'>
                                        <a className="mobileSocialItems" rel="noopener noreferrer" href="https://www.facebook.com/vreemanconsultingllc/" target="_blank" onClick={this.handleClick.bind(this)}><i className="fa fa-facebook white-text mr-lg-4"></i></a>
                                    </div>
                                </div>
                            </div>
                            :
                            <div></div>
                    }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        businessProfile: state.firebase.businessProfile
    }
}

export default connect(mapStateToProps)(HeaderNav)

