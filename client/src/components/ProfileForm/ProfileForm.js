import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
import {createProfile} from '../../store/actions/businessProfileActions'
import './ProfileForm.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class ProfileForm extends Component {

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        // this.props.createProject(this.state)
        // this.props.history.push('/')
    }

      render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="input-field">
                            <label htmlFor="twitter">Twitter</label>
                            <input 
                                type="text" 
                                id='twitter' 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="website">Website</label>
                            <input 
                                type="text" 
                                id='website' 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="facebook">Facebook</label>
                            <input 
                                type="text" 
                                id='facebook' 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="businessName">Business Name</label>
                            <input 
                                type="text" 
                                id='businessName' 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="businessDescription">Business Description</label>
                            <textarea 
                                type="text" 
                                id='businessDescription' 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <button className='profileFormSubmit'>
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        )
      }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (profile) => dispatch(createProfile(profile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

