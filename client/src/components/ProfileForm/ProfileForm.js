import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
import './ProfileForm.css'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    twitter: '',
    facebook: '',
    website: '',
    businessName: '',
    businessDescription: '',
    preferredArt: '',
    email: '',
    error: null,
  };

class ProfileForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = { ...INITIAL_STATE };
      }

      render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <p>Twitter Handle</p>
                            <input
                            className='profileFormInput'
                            value={this.state.twitter}
                            onChange={event => this.setState(byPropKey('twitter', event.target.value))}
                            type="text"
                            placeholder={this.state.twitter}
                            />
                        </div>
                        <div>
                            <p>Website</p>
                            <input
                            className='profileFormInput'
                            value={this.state.website}
                            onChange={event => this.setState(byPropKey('website', event.target.value))}
                            type="text"
                            placeholder={this.state.website}
                            />
                        </div>
                        <div>
                            <p>Facebook Page</p>
                            <input
                            className='profileFormInput'
                            value={this.state.facebook}
                            onChange={event => this.setState(byPropKey('facebook', event.target.value))}
                            type="text"
                            placeholder={this.state.facebook}
                            />
                        </div>
                        <div>
                            <p>Business Name</p>
                            <input
                            className='profileFormInput'
                            value={this.state.businessName}
                            onChange={event => this.setState(byPropKey('businessName', event.target.value))}
                            type="text"
                            placeholder={this.state.businessName}
                            />
                        </div>
                        <div>
                            <p>Description of your business</p>
                            <textarea
                            cols="50" rows="6" 
                            className='profileFormInput'
                            value={this.state.businessDescription}
                            onChange={event => this.setState(byPropKey('businessDescription', event.target.value))}
                            type="textarea"
                            placeholder={this.state.businessDescription}
                            />
                        </div>
                    </form>
                    <button type="submit" className='profileFormSubmit'>
                        Submit
                    </button>
                </div>
            </div>
        )
      }

}

export default ProfileForm;

