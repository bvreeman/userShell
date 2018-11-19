import React from 'react';
import './ContactFormSubmit.css'
// import logo from '../../images/mvtShadowedLogo.png'

class ContactFormSubmit extends React.PureComponent {
    render () {
        return (
            <div className='ContactFormSubmit'>
                <div className='row'>
                    <div className='col-md-6 col-xs-12 submittedFormDiv'>
                        <div className="contactSubmitHeader">
                            <h1>Thank you for submitting your message</h1>
                        </div>
                        <div className='contactSubmitParagraph'>
                            <p>We will get back to you as soon as possible.</p>
                        </div>
                        {/* <img className='contactSubmitLogo' src={logo} alt="Minnesota Valley Transport, New Ulm, MN"/> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactFormSubmit;