import React from 'react';
import './ContactFormSubmit.css'
import { Link } from 'react-router-dom'

class ContactFormSubmit extends React.PureComponent {
    render () {
        return (
            <div>
                <div className='ContactFormSubmit'>
                    <div className='row'>
                        <div className='col-md-12 col-xs-12 submittedFormDiv'>
                            <div className="contactSubmitHeader">
                                <h1>Thank you for submitting your message</h1>
                            </div>
                            <div className='contactSubmitParagraph'>
                                <h2>We will get back to you as soon as possible.</h2>
                            </div>
                            {/* <img className='contactSubmitLogo' src={logo} alt="Minnesota Valley Transport, New Ulm, MN"/> */}
                        </div>
                    </div>
                </div>
                <div className='row returnToFindAConsultantCallToAction'>
                    <div className='col-md-12 col-xs-12 returnToFindAConsultant'>
                        <h3>Return to Find A Consultant</h3>
                        <Link to="/">
                            <button type="button">
                                Find a Consultant
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        )
    }
}

export default ContactFormSubmit;