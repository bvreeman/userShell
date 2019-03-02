import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
import {updateProfile, updatePhoto} from '../../store/actions/businessProfileActions'
import './ProfileForm.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import firebase from "firebase/app";
import 'firebase/storage';

import FileUploader from "react-firebase-file-uploader";

class ProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: props.profile.firstName,
            lastName: props.profile.lastName,
            twitter: props.profile.twitter,
            facebook: props.profile.facebook,
            businessName: props.profile.businessName,
            businessDescription: props.profile.businessDescription,
            website: props.profile.website,
            generatedName: '',
            isUploading: false,
            progress: 0,
            imageURL: props.profile.imagURL,
        }
    };

    handleUploadStart = () => {
        console.log('started upload')
        this.setState({ isUploading: true, progress: 0 })
    }
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        console.log('success')
        this.setState({ generatedName: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("users")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({ 
                    imageURL: url,
                    generatedName: filename,
                })
                console.log(this.state, 'state inside of upload')
                this.props.updatePhoto(this.state)
                document.getElementById("pictureForm").reset();
            })

            
    };  

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        console.log(this.props, 'props onSubmit')
        console.log(this.state, 'state onSubmit')
        e.preventDefault();
        this.props.updateProfile(this.state)
        document.getElementById("profileForm").reset();
        // this.props.history.push('/ProfileForm')
    }

    onPhotoSubmit = (e) => {
        e.preventDefault();
        console.log(this.state, 'state in photo submit')
        console.log(this.props, 'props in photo submit')

        // this.props.history.push('/ProfileForm')
    }

      render() {
        const { profile, auth } = this.props;
        // const { auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className='row'>
                <div className='col-md-6 col-xs-12'>
                    <img className='profileFormImage' src={profile.imageURL} alt={profile.businessName} />
                    <form id='pictureForm' >
                        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                        <FileUploader
                            accept="users/*"
                            name="generatedName"
                            randomizeFilename
                            // onSubmit={this.validateForm()}
                            storageRef={firebase.storage().ref("users")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            // onPushtoDatabase={this.handlePushToDatabase}
                        />
                    </form>
                </div>
                <div className='col-md-6 col-xs-12'>
                    <form id='profileForm' onSubmit={this.onSubmit}>
                        <div className="input-field">
                            <label htmlFor="firstName">First Name </label>
                            <input 
                                type="text" 
                                id='firstName' 
                                value={this.state.firstName}
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name </label>
                            <input 
                                type="text" 
                                id='lastName'
                                value={this.state.lastName}
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="businessName">Business Name </label>
                            <input 
                                type="text" 
                                id='businessName'
                                value={this.state.businessName}
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="businessDescription">Business Description </label>
                            <textarea 
                                type="text" 
                                id='businessDescription'
                                value={this.state.businessDescription} 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="website">Website </label>
                            <input 
                                type="text" 
                                id='website' 
                                value={this.state.website}
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="facebook">Facebook </label>
                            <input 
                                type="text" 
                                id='facebook'
                                value={this.state.facebook}
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="twitter">Twitter </label>
                            <input 
                                type="text" 
                                id='twitter' 
                                value={this.state.twitter}
                                onChange={this.handleChange} 
                            />
                        </div>
                        {/* <FileUploader
                            accept="image/*"
                            name="generatedName"
                            randomizeFilename
                            // onSubmit={this.validateForm()}
                            // storageRef={firebase.storage().ref("images")}
                            // onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            // onPushtoDatabase={this.handlePushToDatabase}
                        /> */}
                        <div className="input-field">
                            <button className='profileFormSubmit'>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
      }

}

const mapStateToProps = (state, ownProps) => {
    // console.log(state, 'state')
    // const id = ownProps.match.params.id
    const profile = state.firebase.profile
    // console.log(profile)
    // const profile = businessProfiles ? businessProfiles[id] : null
    // .console.log(profile, 'profile in mapstatetoprops')
    return{
        profile: profile,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (users) => dispatch(updateProfile(users)),
        updatePhoto: (users) => dispatch(updatePhoto(users))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'users'}]))(
ProfileForm)
