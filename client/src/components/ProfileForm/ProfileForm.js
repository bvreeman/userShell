import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import './ProfileForm.css'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    twitter: '',
    facebook: '',
    website: '',
    description: '',
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
          {console.log(this.state)}

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <p>Twitter Handle</p>
                    <input
                    className='profileFormInput'
                    value={this.state.twitter}
                    onChange={event => this.setState(byPropKey('twitter', event.target.value))}
                    type="text"
                    placeholder={this.state.twitter}
                    />
                </form>
                <button type="submit" className='profileFormSubmit'>
                    Submit
                </button>
            </div>
        )
      }

}

export default ProfileForm;

