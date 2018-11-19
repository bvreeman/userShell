import React from 'react';
import './ContactUsPage.css'
import ContactUsForm from '../../components/ContactUsForm'

class ContactUsPage extends React.PureComponent {
    render () {
        return (
            <div className='contactUsPage'>
                <ContactUsForm />
            </div>
        )
    }
}

export default ContactUsPage;