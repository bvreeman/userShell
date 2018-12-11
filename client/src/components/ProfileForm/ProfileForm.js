import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
import './ProfileForm.css'

import firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/database'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    twitter: '',
    facebook: '',
    website: '',
    businessName: '',
    businessDescription: '',
    email: '',
    error: null,
  };

class ProfileForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = { ...INITIAL_STATE };
      }

      databasePush = (props) => {
          console.log(this.props.artistFirebaseIDfromParent, 'is it here')
        //Adding a piece tied to their login to the folder will allow for them to have
        // a unique folder for just them.
        // console.log('props', this.props)
        let itemsRef = firebase.database().ref(`users/${this.props.artistFirebaseIDfromParent}/UserInfo`)
        // console.log(this.state.imageURL)
        
        let updates = {
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            website: this.state.website,
            businessName: this.state.businessName,
            businessDescription: this.state.businessDescription,
        }
        itemsRef.set(updates);
    }

    onSubmit = () => {
        this.databasePush()
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
                    <button type="submit" onClick={this.databasePush} className='profileFormSubmit'>
                        Submit
                    </button>
                </div>
            </div>
        )
      }

}

export default ProfileForm;

